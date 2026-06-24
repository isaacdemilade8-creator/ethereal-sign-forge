import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Field, PrimaryButton, SocialButton, Divider } from "@/components/auth/AuthForm";
import { GoogleIcon, GitHubIcon, AppleIcon } from "@/components/auth/icons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign in — The Ledger" },
      { name: "description", content: "An editorial, magazine-style authentication template. Reusable, animated, broadsheet aesthetic." },
      { property: "og:title", content: "Sign in — The Ledger" },
      { property: "og:description", content: "A drop-in authentication template set like a broadsheet." },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const [loading, setLoading] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  }

  return (
    <AuthLayout
      title="Welcome back to the desk."
      subtitle="Sign in to read tonight's edition, manage your subscription, and pick up where you left off."
      kicker="The Members' Desk"
      footer={
        <>
          New to the paper?{" "}
          <Link to="/sign-up" className="font-semibold text-ink ink-underline ink-underline-hover">
            Open an account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-7">
        <Field
          label="Email address"
          index="01"
          type="email"
          autoComplete="email"
          placeholder="reader@theledger.co"
          required
        />
        <Field
          label="Passphrase"
          index="02"
          type="password"
          autoComplete="current-password"
          placeholder="At least eight characters"
          required
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-ink-soft select-none cursor-pointer">
            <input type="checkbox" className="size-3.5 rounded-none border border-ink accent-ink" />
            <span className="uppercase tracking-wider">Stay signed in</span>
          </label>
          <Link to="/forgot-password" className="font-semibold uppercase tracking-wider text-ink ink-underline ink-underline-hover">
            Lost passphrase?
          </Link>
        </div>

        <PrimaryButton type="submit" loading={loading}>
          Enter the archive
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
