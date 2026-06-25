import { useState, type FormEvent, type ComponentType, type AnchorHTMLAttributes } from "react";
import { AuthLayout } from "../components/AuthLayout";
import { Field, PrimaryButton, SocialButton, Divider } from "../components/AuthForm";
import { GoogleIcon, GitHubIcon, AppleIcon } from "../components/icons";

type AnyLink = ComponentType<AnchorHTMLAttributes<HTMLAnchorElement> & { to?: string; href?: string }>;

export interface SignUpPageProps {
  pathname: string;
  LinkComponent: AnyLink;
  onSubmit?: (values: { name: string; email: string; password: string }) => Promise<void> | void;
}

export function SignUpPage({ pathname, LinkComponent: Link, onSubmit }: SignUpPageProps) {
  const [loading, setLoading] = useState(false);

  async function handle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await onSubmit?.({
        name: String(fd.get("name") ?? ""),
        email: String(fd.get("email") ?? ""),
        password: String(fd.get("password") ?? ""),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      pathname={pathname}
      LinkComponent={Link}
      title="Open your account."
      subtitle="A signature, an address, and a passphrase. Three lines and you are on the masthead."
      kicker="Subscriptions Office"
      footer={
        <>
          Already on the masthead?{" "}
          <Link to="/" href="/" className="font-semibold text-ink ink-underline ink-underline-hover">Sign in</Link>
        </>
      }
    >
      <form onSubmit={handle} className="space-y-7">
        <Field label="Full name" index="01" name="name" autoComplete="name" required />
        <Field label="Email address" index="02" name="email" type="email" autoComplete="email" required />
        <Field label="Passphrase" index="03" name="password" type="password" autoComplete="new-password" minLength={8} required />

        <label className="flex items-start gap-2.5 text-xs text-ink-soft select-none leading-relaxed">
          <input type="checkbox" required className="mt-0.5 size-3.5 rounded-none border border-ink accent-ink" />
          <span>
            I agree to the{" "}
            <a className="font-semibold text-ink ink-underline ink-underline-hover" href="#">Terms</a> and{" "}
            <a className="font-semibold text-ink ink-underline ink-underline-hover" href="#">Privacy Notice</a>.
          </span>
        </label>

        <PrimaryButton type="submit" loading={loading}>File my registration</PrimaryButton>
      </form>

      <Divider>or via syndicate</Divider>

      <div className="flex gap-2">
        <SocialButton provider="Google" icon={<GoogleIcon />} />
        <SocialButton provider="GitHub" icon={<GitHubIcon />} />
        <SocialButton provider="Apple"  icon={<AppleIcon />} />
      </div>
    </AuthLayout>
  );
}
