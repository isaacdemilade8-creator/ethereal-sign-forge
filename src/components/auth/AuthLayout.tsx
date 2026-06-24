import { motion } from "motion/react";
import { Link, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AuthScene } from "./AuthScene";
import { Sparkles } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

const tabs = [
  { label: "Sign in", to: "/" },
  { label: "Sign up", to: "/sign-up" },
];

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  const { pathname } = useLocation();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Ambient gradient background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-radial)" }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* Left: 3D scene */}
        <div className="relative hidden lg:flex flex-col justify-between p-10">
          <Link to="/" className="flex items-center gap-2 text-foreground">
            <div className="relative">
              <Sparkles className="size-6 text-primary" />
              <div className="absolute inset-0 blur-md bg-primary/40 -z-10" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">Nebula Auth</span>
          </Link>

          <div className="absolute inset-0 -z-0">
            <AuthScene />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-10 max-w-sm"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Built for builders
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight">
              A login experience that <span className="gradient-text animate-gradient">feels alive</span>.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Drop into any project. Wire your provider. Ship a beautiful auth flow in minutes.
            </p>
          </motion.div>
        </div>

        {/* Right: form */}
        <div className="relative flex items-center justify-center p-6 sm:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card w-full max-w-md rounded-2xl p-8 sm:p-10"
          >
            <div className="lg:hidden mb-6 flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              <span className="font-display font-semibold">Nebula Auth</span>
            </div>

            {pathname !== "/forgot-password" && (
              <div className="mb-7 flex rounded-full border border-border bg-input/30 p-1">
                {tabs.map((t) => {
                  const active = pathname === t.to;
                  return (
                    <Link
                      key={t.to}
                      to={t.to}
                      className="relative flex-1 rounded-full px-4 py-2 text-center text-sm font-medium transition-colors"
                    >
                      {active && (
                        <motion.span
                          layoutId="auth-tab-pill"
                          className="absolute inset-0 rounded-full bg-primary glow-ring"
                          transition={{ type: "spring", bounce: 0.18, duration: 0.55 }}
                        />
                      )}
                      <span
                        className={`relative z-10 ${
                          active ? "text-primary-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {t.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}

            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h1 className="font-display text-3xl font-semibold tracking-tight">{title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>

              <div className="mt-8">{children}</div>

              {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
