import { useState, type FormEvent, type ComponentType, type AnchorHTMLAttributes } from "react";
import { AuthLayout } from "../components/AuthLayout";
import { Field, PrimaryButton, SocialButton, Divider } from "../components/AuthForm";
import { GoogleIcon, GitHubIcon, AppleIcon } from "../components/icons";

type AnyLink = ComponentType<AnchorHTMLAttributes<HTMLAnchorElement> & { to?: string; href?: string }>;

export interface SignInPageProps {
  pathname: string;
  LinkComponent: AnyLink;
  onSubmit?: (values: { email: string; password: string; remember: boolean }) => Promise<void> | void;
  onSocial?: (provider: "google" | "github" | "apple") => void;
}

export function SignInPage({ pathname, LinkComponent: Link, onSubmit, onSocial }: SignInPageProps) {
  const [loading, setLoading] = useState(false);

  async function handle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await onSubmit?.({
        email: String(fd.get("email") ?? ""),
        password: String(fd.get("password") ?? ""),
        remember: fd.get("remember") === "on",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      pathname={pathname}
      LinkComponent={Link}
      title="Welcome back to the desk."
      subtitle="Sign in to read tonight's edition, manage your subscription, and pick up where you left off."
      kicker="The Members' Desk"
      footer={
        <>
          New to the paper?{" "}
          <Link to="/sign-up" href="/sign-up" className="font-semibold text-ink ink-underline ink-underline-hover">
            Open an account
          </Link>
        </>
      }
    >
      <form onSubmit={handle} className="space-y-7">
        <Field label="Email address" index="01" name="email" type="email" autoComplete="email" required />
        <Field label="Passphrase" index="02" name="password" type="password" autoComplete="current-password" required />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-ink-soft select-none cursor-pointer">
            <input name="remember" type="checkbox" className="size-3.5 rounded-none border border-ink accent-ink" />
            <span className="uppercase tracking-wider">Stay signed in</span>
          </label>
          <Link to="/forgot-password" href="/forgot-password" className="font-semibold uppercase tracking-wider text-ink ink-underline ink-underline-hover">
            Lost passphrase?
          </Link>
        </div>

        <PrimaryButton type="submit" loading={loading}>Enter the archive</PrimaryButton>
      </form>

      <Divider>or via syndicate</Divider>

      <div className="flex gap-2">
        <SocialButton provider="Google" icon={<GoogleIcon />} />
        <SocialButton provider="GitHub" icon={<GitHubIcon />} />
        <SocialButton provider="Apple"  icon={<AppleIcon />} />
      </div>
      {/* Wire onSocial to the buttons above as needed in your app */}
      {onSocial /* noop reference to keep prop in API */ ? null : null}
    </AuthLayout>
  );
}
