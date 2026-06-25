import { motion } from "motion/react";
import type { ReactNode, ComponentType, AnchorHTMLAttributes } from "react";
import { AuthScene } from "./AuthScene";

/**
 * Router-agnostic layout. Pass your framework's <Link> component and the
 * current pathname so the template works under TanStack, Next, React Router,
 * Remix, etc.
 *
 * Example with TanStack:
 *   import { Link, useLocation } from "@tanstack/react-router";
 *   <AuthLayout LinkComponent={Link} pathname={useLocation().pathname} ... />
 *
 * Example with Next.js:
 *   import Link from "next/link"; import { usePathname } from "next/navigation";
 *   <AuthLayout LinkComponent={Link} pathname={usePathname()} ... />
 */

type AnyLink = ComponentType<AnchorHTMLAttributes<HTMLAnchorElement> & { to?: string; href?: string }>;

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
  issue?: string;
  kicker?: string;
  pathname: string;
  LinkComponent: AnyLink;
  /** Route paths for the in-template nav. Override to fit your app. */
  signInPath?: string;
  signUpPath?: string;
  forgotPath?: string;
  /** Branding */
  brand?: string;
  brandAccent?: string;
}

const ISSUE_DATE = "Vol. 04 — June 2026";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
  issue,
  kicker,
  pathname,
  LinkComponent: Link,
  signInPath = "/",
  signUpPath = "/sign-up",
  forgotPath = "/forgot-password",
  brand = "THE LEDGER",
  brandAccent = ".",
}: AuthLayoutProps) {
  const issueLine = issue ?? ISSUE_DATE;
  const tabs = [
    { label: "Sign in", to: signInPath },
    { label: "Register", to: signUpPath },
  ];

  // `to` works for TanStack/React Router; `href` for Next.js — pass both.
  const linkProps = (to: string) => ({ to, href: to });

  return (
    <div className="paper-grain relative min-h-screen w-full bg-paper text-ink">
      <div className="paper-grain-overlay" />

      <header className="relative z-20 border-b-2 border-ink">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3 lg:px-10">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-ink/70">
            <span className="hidden sm:inline">{issueLine}</span>
            <span className="hidden md:inline text-ink/30">·</span>
            <span className="hidden md:inline">Est. MMXXVI</span>
          </div>
          <Link {...linkProps(signInPath)} className="font-display text-base tracking-tight">
            {brand}<span className="text-accent">{brandAccent}</span>
          </Link>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-ink/70">
            <span className="hidden sm:inline">Members only</span>
            <span className="size-1.5 rounded-full bg-accent animate-ink-blot" />
          </div>
        </div>
        <div className="relative overflow-hidden border-t border-ink/20 bg-paper-deep">
          <div className="flex animate-marquee whitespace-nowrap py-1.5 font-display text-[11px] uppercase tracking-[0.3em] text-ink/70">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex shrink-0 items-center gap-6 pr-6">
                <span>★ A reusable auth template for the entire world</span>
                <span>·</span>
                <span>Drop-in · React · TanStack · Three.js</span>
                <span>·</span>
                <span>Edition № {String(i + 1).padStart(2, "0")}</span>
                <span>·</span>
                <span>Built with ink &amp; paper</span>
                <span>·</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-12">
        <aside className="relative hidden lg:flex lg:col-span-7 flex-col border-r border-ink/15 px-10 py-12">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-ink/60">
            <span>Feature № 01</span>
            <span>{kicker ?? "Access · Identity · Trust"}</span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.92] tracking-tight uppercase"
          >
            A login,<br />
            <span className="italic font-display">printed</span> in ink,<br />
            <span className="relative inline-block">
              <span className="relative z-10">set</span>
              <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-accent/80" />
            </span>{" "}
            in paper.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 max-w-md text-[15px] leading-relaxed text-ink-soft"
          >
            A reusable authentication template — drawn in the spirit of broadsheet
            journalism. Heavy display type, generous rules, a single dab of red
            ink. Plug into any provider, ship in minutes.
          </motion.p>

          <div className="relative mt-10 flex-1 min-h-[280px]">
            <div className="absolute inset-0"><AuthScene /></div>
            <div className="absolute left-0 bottom-0 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-ink/60">
              <span className="size-2 rounded-full bg-ink" />
              Fig. 01 — Wireframe study, ink on paper
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-ink/20 pt-4 text-[10px] uppercase tracking-[0.3em] text-ink/60">
            <span>By the Editors</span>
            <span>§ Continue reading on the right →</span>
          </div>
        </aside>

        <main className="relative lg:col-span-5 flex min-h-[calc(100vh-96px)] flex-col px-6 py-10 sm:px-10 lg:py-14">
          {pathname !== forgotPath && (
            <nav className="mb-10 flex items-center gap-0 border-b border-ink/20">
              {tabs.map((t) => {
                const active = pathname === t.to;
                return (
                  <Link
                    key={t.to}
                    {...linkProps(t.to)}
                    className="relative px-0 mr-8 pb-3 font-display text-[11px] uppercase tracking-[0.25em]"
                  >
                    <span className={active ? "text-ink" : "text-ink/40 hover:text-ink/70 transition-colors"}>
                      {t.label}
                    </span>
                    {active && (
                      <motion.span
                        layoutId="auth-tab-rule"
                        className="absolute -bottom-px left-0 right-0 h-[2px] bg-ink"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                  </Link>
                );
              })}
              <span className="ml-auto text-[10px] uppercase tracking-[0.25em] text-ink/40 pb-3">
                Page A1
              </span>
            </nav>
          )}

          <motion.section
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <p className="font-display text-[10px] uppercase tracking-[0.35em] text-accent mb-3">
              §§ {kicker ?? "The Members' Desk"}
            </p>
            <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] uppercase leading-[0.95] tracking-tight">
              {title}
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
              {subtitle}
            </p>

            <div className="mt-10">{children}</div>

            {footer && (
              <div className="mt-8 border-t border-ink/15 pt-5 text-sm text-ink-soft">
                {footer}
              </div>
            )}
          </motion.section>

          <div className="mt-auto pt-12 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-ink/40">
            <span>© {brand}</span>
            <span>Set in Archivo &amp; Hind</span>
          </div>
        </main>
      </div>
    </div>
  );
}
