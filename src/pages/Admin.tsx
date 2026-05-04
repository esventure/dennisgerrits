import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, KeyRound, LogOut, Save, Upload } from "lucide-react";

type Story = {
  id: string;
  slug: string;
  title: string;
  intro: string;
  body: string;
  image_path: string | null;
  sort_order: number;
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;

function publicUrl(path: string | null) {
  if (!path) return null;
  return `${SUPABASE_URL}/storage/v1/object/public/story-images/${path}`;
}

const Admin = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [stories, setStories] = useState<Story[]>([]);
  const [savingId, setSavingId] = useState<string | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});
  const [pwOpen, setPwOpen] = useState(false);
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwSaving, setPwSaving] = useState(false);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/admin/login", { replace: true });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.session.user.id)
        .eq("role", "admin");
      if (!roles || roles.length === 0) {
        toast.error("Your account does not have admin access.");
        await supabase.auth.signOut();
        navigate("/admin/login", { replace: true });
        return;
      }
      const { data: rows, error } = await supabase
        .from("stories")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) {
        toast.error(error.message);
      } else if (mounted) {
        setStories(rows as Story[]);
      }
      if (mounted) setChecking(false);
    };

    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/admin/login", { replace: true });
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  const update = (id: string, patch: Partial<Story>) =>
    setStories((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const save = async (story: Story) => {
    setSavingId(story.id);
    const { error } = await supabase
      .from("stories")
      .update({
        title: story.title,
        intro: story.intro,
        body: story.body,
        image_path: story.image_path,
        sort_order: story.sort_order,
      })
      .eq("id", story.id);
    setSavingId(null);
    if (error) toast.error(error.message);
    else toast.success("Saved");
  };

  const move = async (id: string, dir: -1 | 1) => {
    const idx = stories.findIndex((s) => s.id === id);
    const swapWith = idx + dir;
    if (swapWith < 0 || swapWith >= stories.length) return;
    const a = stories[idx];
    const b = stories[swapWith];
    const next = [...stories];
    next[idx] = { ...b, sort_order: a.sort_order };
    next[swapWith] = { ...a, sort_order: b.sort_order };
    setStories(next.sort((x, y) => x.sort_order - y.sort_order));
    await Promise.all([
      supabase.from("stories").update({ sort_order: b.sort_order }).eq("id", a.id),
      supabase.from("stories").update({ sort_order: a.sort_order }).eq("id", b.id),
    ]);
  };

  const uploadImage = async (story: Story, file: File) => {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${story.slug}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("story-images")
      .upload(path, file, { cacheControl: "3600", upsert: false });
    if (error) {
      toast.error(error.message);
      return;
    }
    const { error: updErr } = await supabase
      .from("stories")
      .update({ image_path: path })
      .eq("id", story.id);
    if (updErr) {
      toast.error(updErr.message);
      return;
    }
    update(story.id, { image_path: path });
    toast.success("Image updated");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  const changePassword = async () => {
    if (newPw.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (newPw !== confirmPw) {
      toast.error("Passwords do not match");
      return;
    }
    setPwSaving(true);
    const { error } = await supabase.auth.updateUser({ password: newPw });
    setPwSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated");
    setNewPw("");
    setConfirmPw("");
    setPwOpen(false);
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
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-heading text-4xl text-primary">Stories</h1>
            <p className="font-body text-sm text-muted-foreground">
              Edit text, swap images, reorder. Changes appear live on Get Inspired.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setPwOpen((v) => !v)}>
              <KeyRound className="w-4 h-4 mr-2" /> Change password
            </Button>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" /> Sign out
            </Button>
          </div>
        </header>

        {pwOpen && (
          <div className="bg-card border rounded-lg p-6 shadow-sm space-y-4 mb-8">
            <div>
              <h2 className="font-heading text-2xl text-primary">Change password</h2>
              <p className="font-body text-sm text-muted-foreground">
                Choose a new password for your admin account. Minimum 8 characters.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-pw">New password</Label>
              <Input
                id="new-pw"
                type="password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-pw">Confirm new password</Label>
              <Input
                id="confirm-pw"
                type="password"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setPwOpen(false);
                  setNewPw("");
                  setConfirmPw("");
                }}
              >
                Cancel
              </Button>
              <Button onClick={changePassword} disabled={pwSaving}>
                {pwSaving ? "Saving..." : "Update password"}
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {stories.map((story, i) => (
            <article
              key={story.id}
              className="bg-card border rounded-lg p-6 shadow-sm space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="flex flex-col gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => move(story.id, -1)}
                    disabled={i === 0}
                    aria-label="Move up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => move(story.id, 1)}
                    disabled={i === stories.length - 1}
                    aria-label="Move down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <Label htmlFor={`title-${story.id}`}>Title</Label>
                    <Input
                      id={`title-${story.id}`}
                      value={story.title}
                      onChange={(e) => update(story.id, { title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`intro-${story.id}`}>Intro</Label>
                    <Textarea
                      id={`intro-${story.id}`}
                      rows={2}
                      value={story.intro}
                      onChange={(e) => update(story.id, { intro: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`body-${story.id}`}>Body</Label>
                    <Textarea
                      id={`body-${story.id}`}
                      rows={6}
                      value={story.body}
                      onChange={(e) => update(story.id, { body: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    {story.image_path ? (
                      <img
                        src={publicUrl(story.image_path)!}
                        alt=""
                        className="w-24 h-24 object-cover rounded-md border"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-md border border-dashed flex items-center justify-center text-xs text-muted-foreground">
                        No image
                      </div>
                    )}
                    <input
                      ref={(el) => (fileInputs.current[story.id] = el)}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) uploadImage(story, f);
                        e.target.value = "";
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputs.current[story.id]?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" /> Replace image
                    </Button>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      type="button"
                      onClick={() => save(story)}
                      disabled={savingId === story.id}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {savingId === story.id ? "Saving..." : "Save changes"}
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Admin;
