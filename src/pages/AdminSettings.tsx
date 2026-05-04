import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";
import { CONTENT_SCHEMA } from "@/lib/siteContentSchema";
import { refreshSiteContent } from "@/hooks/useSiteContent";

const AdminSettings = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [values, setValues] = useState<Record<string, string>>({});
  const [savingSection, setSavingSection] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate("/admin/login", { replace: true });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", sess.session.user.id)
        .eq("role", "admin");
      if (!roles || roles.length === 0) {
        toast.error("Your account does not have admin access.");
        await supabase.auth.signOut();
        navigate("/admin/login", { replace: true });
        return;
      }
      const { data: rows } = await supabase.from("site_content").select("key,value");
      const map: Record<string, string> = {};
      (rows || []).forEach((r) => (map[r.key] = r.value));
      // Pre-fill with fallbacks for keys that don't exist yet
      CONTENT_SCHEMA.forEach((s) =>
        s.fields.forEach((f) => {
          if (map[f.key] === undefined) map[f.key] = f.fallback;
        }),
      );
      if (mounted) {
        setValues(map);
        setChecking(false);
      }
    };
    init();
    return () => {
      mounted = false;
    };
  }, [navigate]);

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

  if (checking) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="font-body text-muted-foreground">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10">
          <Link
            to="/admin"
            className="inline-flex items-center text-sm font-body text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Stories
          </Link>
          <h1 className="font-heading text-4xl text-primary">Site content</h1>
          <p className="font-body text-sm text-muted-foreground">
            Edit text shown on the public homepage. Changes appear live after saving.
          </p>
        </header>

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
      </div>
    </main>
  );
};

export default AdminSettings;
