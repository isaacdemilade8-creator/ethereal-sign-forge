import { motion } from "motion/react";
import { Link, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AuthScene } from "./AuthScene";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
  issue?: string;
  kicker?: string;
}

const tabs = [
  { label: "Sign in", to: "/" },
  { label: "Register", to: "/sign-up" },
];

const ISSUE_DATE = "Vol. 04 — June 2026";

export function AuthLayout({ title, subtitle, children, footer, issue, kicker }: AuthLayoutProps) {
  const { pathname } = useLocation();
  const issueLine = issue ?? ISSUE_DATE;

  return (
    <div className="paper-grain relative min-h-screen w-full bg-paper text-ink">
      <div className="paper-grain-overlay" />

      {/* Top masthead */}
      <header className="relative z-20 border-b-2 border-ink">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3 lg:px-10">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-ink/70">
            <span className="hidden sm:inline">{issueLine}</span>
            <span className="hidden md:inline text-ink/30">·</span>
            <span className="hidden md:inline">Est. MMXXVI</span>
          </div>
          <Link to="/" className="font-display text-base tracking-tight">
            THE LEDGER<span className="text-accent">.</span>
          </Link>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-ink/70">
            <span className="hidden sm:inline">Members only</span>
            <span className="size-1.5 rounded-full bg-accent animate-ink-blot" />
          </div>
        </div>
        {/* Marquee strip */}
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
        {/* LEFT: Featured editorial column */}
        <aside className="relative hidden lg:flex lg:col-span-7 flex-col border-r border-ink/15 px-10 py-12">
          {/* Issue meta */}
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-ink/60">
            <span>Feature № 01</span>
            <span>{kicker ?? "Access · Identity · Trust"}</span>
          </div>

          {/* Big editorial headline */}
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

          {/* Lead paragraph */}
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

          {/* 3D Ink sculpture */}
          <div className="relative mt-10 flex-1 min-h-[280px]">
            <div className="absolute inset-0">
              <AuthScene />
            </div>
            <div className="absolute left-0 bottom-0 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-ink/60">
              <span className="size-2 rounded-full bg-ink" />
              Fig. 01 — Wireframe study, ink on paper
            </div>
          </div>

          {/* Bottom byline */}
          <div className="mt-10 flex items-center justify-between border-t border-ink/20 pt-4 text-[10px] uppercase tracking-[0.3em] text-ink/60">
            <span>By the Editors</span>
            <span>§ Continue reading on the right →</span>
          </div>
        </aside>

        {/* RIGHT: Form column */}
        <main className="relative lg:col-span-5 flex min-h-[calc(100vh-96px)] flex-col px-6 py-10 sm:px-10 lg:py-14">
          {/* Tabs */}
          {pathname !== "/forgot-password" && (
            <nav className="mb-10 flex items-center gap-0 border-b border-ink/20">
              {tabs.map((t) => {
                const active = pathname === t.to;
                return (
                  <Link
                    key={t.to}
                    to={t.to}
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

          {/* Footer dateline */}
          <div className="mt-auto pt-12 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-ink/40">
            <span>© The Ledger</span>
            <span>Set in Archivo &amp; Hind</span>
          </div>
        </main>
      </div>
    </div>
  );
}
