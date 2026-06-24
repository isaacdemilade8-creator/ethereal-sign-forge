import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Field, PrimaryButton } from "@/components/auth/AuthForm";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — Nebula Auth" },
      { name: "description", content: "Securely reset your password with a magic link." },
      { property: "og:title", content: "Reset your password — Nebula Auth" },
      { property: "og:description", content: "Reset your password — beautiful animated auth template." },
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
      title="Reset your password"
      subtitle="Enter the email tied to your account and we'll send a secure reset link."
      footer={
        <Link to="/" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
          <ArrowLeft className="size-3.5" />
          Back to sign in
        </Link>
      }
    >
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center py-4"
          >
            <div className="relative mb-4">
              <div className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/40 blur-xl" />
              <CheckCircle2 className="relative size-14 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold">Check your inbox</h3>
            <p className="mt-1.5 text-sm text-muted-foreground max-w-xs">
              We've sent a password reset link. Click it to choose a new password.
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-5 text-sm text-primary hover:underline"
            >
              Resend link
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            className="space-y-4"
          >
            <Field
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="you@studio.com"
              icon={<Mail className="size-4" />}
              required
            />
            <PrimaryButton type="submit" loading={loading}>
              Send reset link
            </PrimaryButton>
          </motion.form>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
