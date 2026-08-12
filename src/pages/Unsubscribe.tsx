import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import FadeIn from "@/components/FadeIn";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type Status = "validating" | "valid" | "confirming" | "confirmed" | "invalid";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [status, setStatus] = useState<Status>("validating");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } }
        );
        if (!cancelled) setStatus(res.ok ? "valid" : "invalid");
      } catch {
        if (!cancelled) setStatus("invalid");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const confirm = async () => {
    setStatus("confirming");
    const { error } = await supabase.functions.invoke("handle-email-unsubscribe", {
      body: { token },
    });
    setStatus(error ? "invalid" : "confirmed");
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-20">
      <FadeIn className="w-full max-w-lg text-center">
        {status === "validating" || status === "confirming" ? (
          <p className="font-body text-muted-foreground">One moment…</p>
        ) : null}

        {status === "valid" ? (
          <>
            <p
              className="font-body text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "hsl(var(--heritage-orange))" }}
            >
              Email preferences
            </p>
            <h1 className="font-heading text-4xl md:text-5xl text-primary mb-4">
              Unsubscribe
            </h1>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Confirm that you no longer want to receive emails from Dennis Gerrits. You
              will not receive any further messages.
            </p>
            <button
              onClick={confirm}
              className="font-body text-sm tracking-widest uppercase px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            >
              Confirm unsubscribe
            </button>
          </>
        ) : null}

        {status === "confirmed" ? (
          <>
            <p
              className="font-body text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "hsl(var(--heritage-orange))" }}
            >
              All done
            </p>
            <h1 className="font-heading text-4xl md:text-5xl text-primary mb-4">
              You're unsubscribed
            </h1>
            <p className="font-body text-muted-foreground leading-relaxed">
              You will not receive any more emails from Dennis Gerrits. If you change your
              mind, just reach out again through the website.
            </p>
          </>
        ) : null}

        {status === "invalid" ? (
          <>
            <p
              className="font-body text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "hsl(var(--heritage-orange))" }}
            >
              Something's off
            </p>
            <h1 className="font-heading text-4xl md:text-5xl text-primary mb-4">
              Link invalid
            </h1>
            <p className="font-body text-muted-foreground leading-relaxed">
              This unsubscribe link is invalid, already used, or expired. If you keep
              receiving emails you did not want, reply to one and I will sort it out.
            </p>
          </>
        ) : null}
      </FadeIn>
    </section>
  );
};

export default Unsubscribe;
