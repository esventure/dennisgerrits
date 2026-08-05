import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type State = "checking" | "allowed" | "denied";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<State>("checking");
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    const check = async (userId: string | undefined) => {
      if (!userId) {
        if (mounted) setState("denied");
        return;
      }
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      if (!mounted) return;
      if (error || !data) {
        toast.error("Your account does not have admin access.");
        await supabase.auth.signOut();
        setState("denied");
        return;
      }
      setState("allowed");
    };

    supabase.auth.getSession().then(({ data }) => check(data.session?.user.id));

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      check(session?.user.id);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (state === "checking") {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Head>
          <title>Admin – Dennis Gerrits</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <p className="font-body text-muted-foreground">Loading...</p>
      </main>
    );
  }

  if (state === "denied") {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <>
      <Head>
        <title>Admin – Dennis Gerrits</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      {children}
    </>
  );
};

export default AdminRoute;
