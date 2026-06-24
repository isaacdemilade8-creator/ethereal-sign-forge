import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, Lock, User } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Field, PrimaryButton, SocialButton, Divider } from "@/components/auth/AuthForm";
import { GoogleIcon, GitHubIcon, AppleIcon } from "@/components/auth/icons";

export const Route = createFileRoute("/sign-up")({
  head: () => ({
    meta: [
      { title: "Create your account — Nebula Auth" },
      { name: "description", content: "Sign up for a new account with a beautifully animated auth template." },
      { property: "og:title", content: "Create your account — Nebula Auth" },
      { property: "og:description", content: "Reusable 3D-animated sign up template." },
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
      title="Create your account"
      subtitle="Start building in under a minute — no credit card required."
      footer={
        <>
          Already a member?{" "}
          <Link to="/" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Field
          label="Full name"
          autoComplete="name"
          placeholder="Ada Lovelace"
          icon={<User className="size-4" />}
          required
        />
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
          autoComplete="new-password"
          placeholder="At least 8 characters"
          icon={<Lock className="size-4" />}
          minLength={8}
          required
        />

        <label className="flex items-start gap-2 text-xs text-muted-foreground select-none">
          <input type="checkbox" className="mt-0.5 size-4 rounded border-border bg-input accent-primary" required />
          <span>
            I agree to the{" "}
            <a className="text-primary hover:underline" href="#">Terms of Service</a> and{" "}
            <a className="text-primary hover:underline" href="#">Privacy Policy</a>.
          </span>
        </label>

        <PrimaryButton type="submit" loading={loading}>
          Create account
        </PrimaryButton>
      </form>

      <Divider>or sign up with</Divider>

      <div className="flex gap-2">
        <SocialButton provider="Google" icon={<GoogleIcon />} />
        <SocialButton provider="GitHub" icon={<GitHubIcon />} />
        <SocialButton provider="Apple" icon={<AppleIcon />} />
      </div>
    </AuthLayout>
  );
}
