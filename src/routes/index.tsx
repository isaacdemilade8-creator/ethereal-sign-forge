import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, Lock } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Field, PrimaryButton, SocialButton, Divider } from "@/components/auth/AuthForm";
import { GoogleIcon, GitHubIcon, AppleIcon } from "@/components/auth/icons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign in — Nebula Auth" },
      { name: "description", content: "Reusable, animated 3D authentication template for modern web apps." },
      { property: "og:title", content: "Sign in — Nebula Auth" },
      { property: "og:description", content: "A drop-in authentication template with 3D motion design." },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const [loading, setLoading] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: wire to your auth provider
    setTimeout(() => setLoading(false), 1200);
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your dashboard."
      footer={
        <>
          New here?{" "}
          <Link to="/sign-up" className="font-medium text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Field
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@studio.com"
          icon={<Mail className="size-4" />}
          required
        />
        <Field
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          icon={<Lock className="size-4" />}
          required
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground select-none cursor-pointer">
            <input type="checkbox" className="size-4 rounded border-border bg-input accent-primary" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        <PrimaryButton type="submit" loading={loading}>
          Sign in
        </PrimaryButton>
      </form>

      <Divider>or continue with</Divider>

      <div className="flex gap-2">
        <SocialButton provider="Google" icon={<GoogleIcon />} />
        <SocialButton provider="GitHub" icon={<GitHubIcon />} />
        <SocialButton provider="Apple" icon={<AppleIcon />} />
      </div>
    </AuthLayout>
  );
}
