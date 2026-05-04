import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Send,
  Trash2,
  CheckCircle2,
  CircleDashed,
} from "lucide-react";
import { CONTENT_SCHEMA } from "@/lib/siteContentSchema";
import { refreshSiteContent } from "@/hooks/useSiteContent";
import RichTextEditor from "@/components/RichTextEditor";

const PREVIEW_ROUTES = [
  { path: "/#about", label: "About" },
  { path: "/#how-it-works", label: "How It Works" },
  { path: "/#booking", label: "Booking" },
  { path: "/", label: "Full homepage" },
];

type Row = {
  key: string;
  value: string;
  draft_value: string | null;
  has_draft: boolean;
  draft_updated_at: string | null;
  published_at: string | null;
};

const AdminSettings = () => {
  const [loading, setLoading] = useState(true);
  // Working values shown in the editor (= draft if any, else published)
  const [values, setValues] = useState<Record<string, string>>({});
  // Last-known published values (for diffing / discard)
  const [published, setPublished] = useState<Record<string, string>>({});
  // Per-key has_draft state from DB
  const [draftFlags, setDraftFlags] = useState<Record<string, boolean>>({});
  const [busySection, setBusySection] = useState<string | null>(null);
  const [busyAction, setBusyAction] = useState<"save" | "publish" | "discard" | "publish-all" | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<"draft" | "published">("draft");
  const [previewPath, setPreviewPath] = useState(PREVIEW_ROUTES[0].path);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const fetchAll = async () => {
    const { data: rows } = await supabase
      .from("site_content")
      .select("key,value,draft_value,has_draft,draft_updated_at,published_at");

    const pub: Record<string, string> = {};
    const editing: Record<string, string> = {};
    const flags: Record<string, boolean> = {};
    (rows as Row[] | null || []).forEach((r) => {
      pub[r.key] = r.value ?? "";
      flags[r.key] = !!r.has_draft;
      editing[r.key] = r.has_draft ? (r.draft_value ?? "") : (r.value ?? "");
    });
    CONTENT_SCHEMA.forEach((s) =>
      s.fields.forEach((f) => {
        if (editing[f.key] === undefined) editing[f.key] = f.fallback;
        if (pub[f.key] === undefined) pub[f.key] = "";
        if (flags[f.key] === undefined) flags[f.key] = false;
      }),
    );
    setPublished(pub);
    setValues(editing);
    setDraftFlags(flags);
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      await fetchAll();
      if (mounted) setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // ── Live preview wiring ──────────────────────────────────────────
  const pushToPreview = (next: Record<string, string>) => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.postMessage({ type: "site-content-preview", values: next }, "*");
  };

  const previewValues = previewMode === "draft" ? values : published;

  useEffect(() => {
    if (!previewOpen) return;
    pushToPreview(previewValues);
  }, [values, published, previewMode, previewOpen]);

  useEffect(() => {
    if (!previewOpen) return;
    const handler = (event: MessageEvent) => {
      if (event.data?.type === "site-content-preview-ready") {
        pushToPreview(previewValues);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [previewValues, previewOpen]);

  // ── Section status helpers ───────────────────────────────────────
  const sectionHasUnsavedChanges = (sectionId: string) => {
    const section = CONTENT_SCHEMA.find((s) => s.id === sectionId);
    if (!section) return false;
    return section.fields.some((f) => {
      const current = values[f.key] ?? "";
      // Compare against whatever is persisted (draft if exists, else published)
      const persisted = draftFlags[f.key] ? (values[f.key] ?? "") : (published[f.key] ?? "");
      // We need actual persisted draft value, not the working buffer. Re-fetch via published vs flags.
      // Trick: store original on load. Simpler approach: derive "persisted" by re-loading; instead
      // we treat dirtiness as "current !== published" when no draft, else always potentially dirty
      // until next save.
      if (draftFlags[f.key]) return false; // pending draft already exists; explicit save still allowed
      return current !== (published[f.key] ?? "");
    });
  };

  const sectionHasPendingDraft = (sectionId: string) => {
    const section = CONTENT_SCHEMA.find((s) => s.id === sectionId);
    if (!section) return false;
    return section.fields.some((f) => draftFlags[f.key]);
  };

  const totalPendingDrafts = Object.values(draftFlags).filter(Boolean).length;

  // ── Mutations ────────────────────────────────────────────────────
  const saveDraft = async (sectionId: string) => {
    setBusySection(sectionId);
    setBusyAction("save");
    const section = CONTENT_SCHEMA.find((s) => s.id === sectionId);
    if (!section) return;
    const now = new Date().toISOString();
    const rows = section.fields.map((f) => ({
      key: f.key,
      section: section.id,
      // Keep value (published) untouched; only update draft fields.
      value: published[f.key] ?? "",
      draft_value: values[f.key] ?? "",
      has_draft: true,
      draft_updated_at: now,
    }));
    const { error } = await supabase
      .from("site_content")
      .upsert(rows, { onConflict: "key" });
    setBusySection(null);
    setBusyAction(null);
    if (error) {
      toast.error(error.message);
      return;
    }
    await fetchAll();
    toast.success(`${section.title} saved as draft`);
  };

  const publishSection = async (sectionId: string) => {
    setBusySection(sectionId);
    setBusyAction("publish");
    const section = CONTENT_SCHEMA.find((s) => s.id === sectionId);
    if (!section) return;
    const now = new Date().toISOString();
    // Promote the working values to published, clear drafts.
    const rows = section.fields.map((f) => ({
      key: f.key,
      section: section.id,
      value: values[f.key] ?? "",
      draft_value: null,
      has_draft: false,
      draft_updated_at: null,
      published_at: now,
    }));
    const { error } = await supabase
      .from("site_content")
      .upsert(rows, { onConflict: "key" });
    setBusySection(null);
    setBusyAction(null);
    if (error) {
      toast.error(error.message);
      return;
    }
    await refreshSiteContent();
    await fetchAll();
    toast.success(`${section.title} published`);
  };

  const discardDraft = async (sectionId: string) => {
    if (!confirm("Discard the draft for this section? This cannot be undone.")) return;
    setBusySection(sectionId);
    setBusyAction("discard");
    const section = CONTENT_SCHEMA.find((s) => s.id === sectionId);
    if (!section) return;
    const rows = section.fields.map((f) => ({
      key: f.key,
      section: section.id,
      value: published[f.key] ?? "",
      draft_value: null,
      has_draft: false,
      draft_updated_at: null,
    }));
    const { error } = await supabase
      .from("site_content")
      .upsert(rows, { onConflict: "key" });
    setBusySection(null);
    setBusyAction(null);
    if (error) {
      toast.error(error.message);
      return;
    }
    await fetchAll();
    toast.success(`${section.title} draft discarded`);
  };

  const publishAll = async () => {
    if (totalPendingDrafts === 0) return;
    if (!confirm(`Publish all ${totalPendingDrafts} pending draft change(s)?`)) return;
    setBusyAction("publish-all");
    const now = new Date().toISOString();
    const rows = Object.entries(draftFlags)
      .filter(([, has]) => has)
      .map(([key]) => {
        const section = CONTENT_SCHEMA.find((s) => s.fields.some((f) => f.key === key));
        return {
          key,
          section: section?.id ?? "general",
          value: values[key] ?? "",
          draft_value: null,
          has_draft: false,
          draft_updated_at: null,
          published_at: now,
        };
      });
    const { error } = await supabase
      .from("site_content")
      .upsert(rows, { onConflict: "key" });
    setBusyAction(null);
    if (error) {
      toast.error(error.message);
      return;
    }
    await refreshSiteContent();
    await fetchAll();
    toast.success("All drafts published");
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="font-body text-muted-foreground">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30 py-8 px-4 md:px-6">
      <div className={previewOpen ? "max-w-[1600px] mx-auto" : "max-w-3xl mx-auto"}>
        <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link
              to="/admin"
              className="inline-flex items-center text-sm font-body text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Stories
            </Link>
            <h1 className="font-heading text-4xl text-primary">Site content</h1>
            <p className="font-body text-sm text-muted-foreground">
              Save edits as drafts, preview them, and publish when ready.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {totalPendingDrafts > 0 && (
              <Button
                variant="default"
                onClick={publishAll}
                disabled={busyAction === "publish-all"}
              >
                <Send className="w-4 h-4 mr-2" />
                {busyAction === "publish-all"
                  ? "Publishing..."
                  : `Publish all (${totalPendingDrafts})`}
              </Button>
            )}
            <Button
              variant={previewOpen ? "default" : "outline"}
              onClick={() => setPreviewOpen((v) => !v)}
            >
              {previewOpen ? (
                <>
                  <EyeOff className="w-4 h-4 mr-2" /> Hide preview
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" /> Show live preview
                </>
              )}
            </Button>
          </div>
        </header>

        <div
          className={
            previewOpen
              ? "grid grid-cols-1 lg:grid-cols-2 gap-6 items-start"
              : ""
          }
        >
          <div className="space-y-8">
            {CONTENT_SCHEMA.map((section) => {
              const hasDraft = sectionHasPendingDraft(section.id);
              const dirty = sectionHasUnsavedChanges(section.id);
              const busy = busySection === section.id;
              return (
                <section
                  key={section.id}
                  className="bg-card border rounded-lg p-6 shadow-sm space-y-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h2 className="font-heading text-2xl text-primary">{section.title}</h2>
                      <p className="font-body text-sm text-muted-foreground">{section.description}</p>
                    </div>
                    {hasDraft ? (
                      <Badge variant="secondary" className="gap-1">
                        <CircleDashed className="w-3 h-3" /> Draft pending
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="gap-1 text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3" /> Published
                      </Badge>
                    )}
                  </div>

                  {section.fields.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <Label htmlFor={field.key}>{field.label}</Label>
                      {field.type === "rich" ? (
                        <RichTextEditor
                          value={values[field.key] ?? ""}
                          onChange={(html) =>
                            setValues((v) => ({ ...v, [field.key]: html }))
                          }
                        />
                      ) : field.type === "long" ? (
                        <Textarea
                          id={field.key}
                          rows={3}
                          value={values[field.key] ?? ""}
                          onChange={(e) =>
                            setValues((v) => ({ ...v, [field.key]: e.target.value }))
                          }
                        />
                      ) : (
                        <Input
                          id={field.key}
                          value={values[field.key] ?? ""}
                          onChange={(e) =>
                            setValues((v) => ({ ...v, [field.key]: e.target.value }))
                          }
                        />
                      )}
                      {field.hint && (
                        <p className="text-xs text-muted-foreground">{field.hint}</p>
                      )}
                    </div>
                  ))}

                  <div className="flex flex-wrap justify-end gap-2 pt-2 border-t">
                    {hasDraft && (
                      <Button
                        variant="ghost"
                        onClick={() => discardDraft(section.id)}
                        disabled={busy}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Discard draft
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => saveDraft(section.id)}
                      disabled={busy || (!dirty && !hasDraft)}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {busy && busyAction === "save" ? "Saving..." : "Save draft"}
                    </Button>
                    <Button
                      onClick={() => publishSection(section.id)}
                      disabled={busy}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {busy && busyAction === "publish" ? "Publishing..." : "Publish"}
                    </Button>
                  </div>
                </section>
              );
            })}
          </div>

          {previewOpen && (
            <aside className="lg:sticky lg:top-4">
              <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
                <div className="flex flex-wrap items-center gap-2 p-3 border-b bg-muted/40">
                  <div className="flex items-center gap-1 mr-2">
                    <Button
                      size="sm"
                      variant={previewMode === "draft" ? "default" : "outline"}
                      onClick={() => setPreviewMode("draft")}
                    >
                      Draft
                    </Button>
                    <Button
                      size="sm"
                      variant={previewMode === "published" ? "default" : "outline"}
                      onClick={() => setPreviewMode("published")}
                    >
                      Published
                    </Button>
                  </div>
                  <span className="w-px h-5 bg-border" />
                  <span className="text-xs font-body text-muted-foreground">
                    Jump to:
                  </span>
                  {PREVIEW_ROUTES.map((r) => (
                    <Button
                      key={r.path}
                      size="sm"
                      variant={previewPath === r.path ? "secondary" : "ghost"}
                      onClick={() => setPreviewPath(r.path)}
                    >
                      {r.label}
                    </Button>
                  ))}
                </div>
                <iframe
                  key={previewPath}
                  ref={iframeRef}
                  src={previewPath}
                  title="Live preview"
                  className="w-full h-[80vh] bg-background"
                  onLoad={() => pushToPreview(previewValues)}
                />
              </div>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminSettings;
