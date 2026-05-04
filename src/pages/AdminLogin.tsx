import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Username maps to a hidden email behind the scenes.
const USERNAME_TO_EMAIL: Record<string, string> = {
  admin: "admin@dennis.local",
};

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin", { replace: true });
    });
  }, [navigate]);

  const signIn = async (email: string, pwd: string) =>
    supabase.auth.signInWithPassword({ email, password: pwd });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const email = USERNAME_TO_EMAIL[username.trim().toLowerCase()];
    if (!email) {
      setLoading(false);
      toast.error("Unknown username");
      return;
    }

    let { error } = await signIn(email, password);

    // First-time setup: bootstrap the default admin account if it doesn't exist yet.
    if (error && username.trim().toLowerCase() === "admin") {
      const { error: fnErr } = await supabase.functions.invoke("bootstrap-admin");
      if (!fnErr) {
        ({ error } = await signIn(email, password));
      }
    }

    setLoading(false);
    if (error) {
      toast.error("Invalid username or password");
      return;
    }
    navigate("/admin", { replace: true });
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24 bg-background">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-card border rounded-lg p-8 shadow-sm space-y-5"
      >
        <div>
          <h1 className="font-heading text-3xl text-primary mb-1">Admin login</h1>
          <p className="font-body text-sm text-muted-foreground">
            Sign in to manage stories.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </main>
  );
};

export default AdminLogin;
