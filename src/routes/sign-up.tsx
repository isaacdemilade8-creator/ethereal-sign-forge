import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Field, PrimaryButton, SocialButton, Divider } from "@/components/auth/AuthForm";
import { GoogleIcon, GitHubIcon, AppleIcon } from "@/components/auth/icons";

export const Route = createFileRoute("/sign-up")({
  head: () => ({
    meta: [
      { title: "Register — The Ledger" },
      { name: "description", content: "Open a new account. Editorial, magazine-style auth template." },
      { property: "og:title", content: "Register — The Ledger" },
      { property: "og:description", content: "Open an account to The Ledger." },
    ],
  }),
  component: SignUpPage,
});

function SignUpPage() {
  const [loading, setLoading] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  }

  return (
    <AuthLayout
      title="Open your account."
      subtitle="A signature, an address, and a passphrase. Three lines and you are on the masthead."
      kicker="Subscriptions Office"
      footer={
        <>
          Already on the masthead?{" "}
          <Link to="/" className="font-semibold text-ink ink-underline ink-underline-hover">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-7">
        <Field
          label="Full name"
          index="01"
          autoComplete="name"
          placeholder="Ada Lovelace"
          required
        />
        <Field
          label="Email address"
          index="02"
          type="email"
          autoComplete="email"
          placeholder="reader@theledger.co"
          required
        />
        <Field
          label="Passphrase"
          index="03"
          type="password"
          autoComplete="new-password"
          placeholder="At least eight characters"
          minLength={8}
          required
        />

        <label className="flex items-start gap-2.5 text-xs text-ink-soft select-none leading-relaxed">
          <input type="checkbox" className="mt-0.5 size-3.5 rounded-none border border-ink accent-ink" required />
          <span>
            I agree to the{" "}
            <a className="font-semibold text-ink ink-underline ink-underline-hover" href="#">Terms</a> and{" "}
            <a className="font-semibold text-ink ink-underline ink-underline-hover" href="#">Privacy Notice</a>,
            printed in this edition.
          </span>
        </label>

        <PrimaryButton type="submit" loading={loading}>
          File my registration
        </PrimaryButton>
      </form>

      <Divider>or via syndicate</Divider>

      <div className="flex gap-2">
        <SocialButton provider="Google" icon={<GoogleIcon />} />
        <SocialButton provider="GitHub" icon={<GitHubIcon />} />
        <SocialButton provider="Apple" icon={<AppleIcon />} />
      </div>
    </AuthLayout>
  );
}
