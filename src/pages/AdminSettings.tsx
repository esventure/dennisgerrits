import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Save, Eye, EyeOff } from "lucide-react";
import { CONTENT_SCHEMA } from "@/lib/siteContentSchema";
import { refreshSiteContent } from "@/hooks/useSiteContent";

const PREVIEW_ROUTES = [
  { path: "/#about", label: "About" },
  { path: "/#how-it-works", label: "How It Works" },
  { path: "/#booking", label: "Booking" },
  { path: "/", label: "Full homepage" },
];

const AdminSettings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState<Record<string, string>>({});
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewPath, setPreviewPath] = useState(PREVIEW_ROUTES[0].path);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: rows } = await supabase.from("site_content").select("key,value");
      const map: Record<string, string> = {};
      (rows || []).forEach((r) => (map[r.key] = r.value));
      CONTENT_SCHEMA.forEach((s) =>
        s.fields.forEach((f) => {
          if (map[f.key] === undefined) map[f.key] = f.fallback;
        }),
      );
      if (mounted) {
        setValues(map);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Push draft values into the preview iframe whenever they change.
  const pushToPreview = (next: Record<string, string>) => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.postMessage({ type: "site-content-preview", values: next }, "*");
  };

  useEffect(() => {
    if (!previewOpen) return;
    pushToPreview(values);
  }, [values, previewOpen]);

  // When the iframe finishes loading (or signals ready), send current values.
  useEffect(() => {
    if (!previewOpen) return;
    const handler = (event: MessageEvent) => {
      if (event.data?.type === "site-content-preview-ready") {
        pushToPreview(values);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [values, previewOpen]);

  const saveSection = async (sectionId: string) => {
    setSavingSection(sectionId);
    const section = CONTENT_SCHEMA.find((s) => s.id === sectionId);
    if (!section) return;
    const rows = section.fields.map((f) => ({
      key: f.key,
      section: section.id,
      value: values[f.key] ?? "",
    }));
    const { error } = await supabase
      .from("site_content")
      .upsert(rows, { onConflict: "key" });
    setSavingSection(null);
    if (error) {
      toast.error(error.message);
      return;
    }
    await refreshSiteContent();
    toast.success(`${section.title} saved`);
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
              Edit text shown on the public homepage. Toggle preview to see unsaved changes live.
            </p>
          </div>
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
        </header>

        <div
          className={
            previewOpen
              ? "grid grid-cols-1 lg:grid-cols-2 gap-6 items-start"
              : ""
          }
        >
          <div className="space-y-8">
            {CONTENT_SCHEMA.map((section) => (
              <section
                key={section.id}
                className="bg-card border rounded-lg p-6 shadow-sm space-y-4"
              >
                <div>
                  <h2 className="font-heading text-2xl text-primary">{section.title}</h2>
                  <p className="font-body text-sm text-muted-foreground">{section.description}</p>
                </div>

                {section.fields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <Label htmlFor={field.key}>{field.label}</Label>
                    {field.type === "long" ? (
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

                <div className="flex justify-end pt-2">
                  <Button
                    onClick={() => saveSection(section.id)}
                    disabled={savingSection === section.id}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {savingSection === section.id ? "Saving..." : `Save ${section.title}`}
                  </Button>
                </div>
              </section>
            ))}
          </div>

          {previewOpen && (
            <aside className="lg:sticky lg:top-4">
              <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
                <div className="flex flex-wrap items-center gap-2 p-3 border-b bg-muted/40">
                  <span className="text-xs font-body text-muted-foreground mr-1">
                    Jump to:
                  </span>
                  {PREVIEW_ROUTES.map((r) => (
                    <Button
                      key={r.path}
                      size="sm"
                      variant={previewPath === r.path ? "default" : "outline"}
                      onClick={() => setPreviewPath(r.path)}
                    >
                      {r.label}
                    </Button>
                  ))}
                  <span className="ml-auto text-xs font-body text-muted-foreground">
                    Unsaved changes shown live
                  </span>
                </div>
                <iframe
                  key={previewPath}
                  ref={iframeRef}
                  src={previewPath}
                  title="Live preview"
                  className="w-full h-[80vh] bg-background"
                  onLoad={() => pushToPreview(values)}
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
