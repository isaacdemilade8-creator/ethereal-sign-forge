import { useState, type FormEvent, type ComponentType, type AnchorHTMLAttributes } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AuthLayout } from "../components/AuthLayout";
import { Field, PrimaryButton } from "../components/AuthForm";

type AnyLink = ComponentType<AnchorHTMLAttributes<HTMLAnchorElement> & { to?: string; href?: string }>;

export interface ForgotPasswordPageProps {
  pathname: string;
  LinkComponent: AnyLink;
  onSubmit?: (values: { email: string }) => Promise<void> | void;
}

export function ForgotPasswordPage({ pathname, LinkComponent: Link, onSubmit }: ForgotPasswordPageProps) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await onSubmit?.({ email: String(fd.get("email") ?? "") });
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      pathname={pathname}
      LinkComponent={Link}
      title="Misplaced your passphrase?"
      subtitle="Enter your address and we will dispatch a single-use link by post — er, by email."
      kicker="Lost & Found"
      footer={
        <Link to="/" href="/" className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider text-ink ink-underline ink-underline-hover">
          <ArrowLeft className="size-3.5" />
          Back to sign in
        </Link>
      }
    >
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div key="sent" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="border border-ink/20 bg-paper-deep/60 p-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="size-8 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-display text-[10px] uppercase tracking-[0.3em] text-ink/60">Dispatched</p>
                <h3 className="mt-1 font-display text-2xl uppercase">Check your inbox.</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                  A reset link is on its way. Click it within 30 minutes to set a new passphrase.
                </p>
                <button onClick={() => setSent(false)} className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink ink-underline ink-underline-hover">
                  Resend link
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handle} className="space-y-7">
            <Field label="Email address" index="01" name="email" type="email" autoComplete="email" required />
            <PrimaryButton type="submit" loading={loading}>Dispatch reset link</PrimaryButton>
          </motion.form>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
