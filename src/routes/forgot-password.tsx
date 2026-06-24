import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Field, PrimaryButton } from "@/components/auth/AuthForm";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Recover passphrase — The Ledger" },
      { name: "description", content: "Recover access to your account with a secure link." },
      { property: "og:title", content: "Recover passphrase — The Ledger" },
      { property: "og:description", content: "Reset your passphrase to The Ledger." },
    ],
  }),
  component: ForgotPage,
});

function ForgotPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1100);
  }

  return (
    <AuthLayout
      title="Misplaced your passphrase?"
      subtitle="Enter your address and we will dispatch a single-use link by post — er, by email."
      kicker="Lost & Found"
      footer={
        <Link to="/" className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider text-ink ink-underline ink-underline-hover">
          <ArrowLeft className="size-3.5" />
          Back to sign in
        </Link>
      }
    >
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="border border-ink/20 bg-paper-deep/60 p-6"
          >
            <div className="flex items-start gap-4">
              <CheckCircle2 className="size-8 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-display text-[10px] uppercase tracking-[0.3em] text-ink/60">Dispatched</p>
                <h3 className="mt-1 font-display text-2xl uppercase">Check your inbox.</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                  A reset link is on its way. Click it within 30 minutes to set a new passphrase.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink ink-underline ink-underline-hover"
                >
                  Resend link
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            className="space-y-7"
          >
            <Field
              label="Email address"
              index="01"
              type="email"
              autoComplete="email"
              placeholder="reader@theledger.co"
              required
            />
            <PrimaryButton type="submit" loading={loading}>
              Dispatch reset link
            </PrimaryButton>
          </motion.form>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
