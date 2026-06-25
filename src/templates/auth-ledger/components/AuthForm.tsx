import { motion } from "motion/react";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { forwardRef, useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

/**
 * Reusable form primitives for the "Ledger" auth template.
 * Router-agnostic — only depends on `motion/react` and `lucide-react`.
 */

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  index?: string;
  error?: string;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, index, error, type = "text", className = "", ...props }, ref) => {
    const [show, setShow] = useState(false);
    const [focused, setFocused] = useState(false);
    const isPassword = type === "password";
    const actualType = isPassword && show ? "text" : type;

    return (
      <div className={`group relative ${className}`}>
        <div className="flex items-baseline justify-between mb-1">
          <label className="flex items-baseline gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
            {index && <span className="font-display text-ink/40">{index}</span>}
            <span>{label}</span>
          </label>
          {isPassword && (
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="text-[10px] uppercase tracking-widest text-ink/50 hover:text-ink flex items-center gap-1"
              tabIndex={-1}
            >
              {show ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
              {show ? "Hide" : "Show"}
            </button>
          )}
        </div>
        <div className="relative">
          <input
            ref={ref}
            type={actualType}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full bg-transparent border-0 border-b border-ink/30 px-0 py-2.5 text-[15px] text-ink placeholder:text-ink/30 focus:outline-none font-sans"
            {...props}
          />
          <motion.span
            initial={false}
            animate={{ scaleX: focused ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
            className="absolute bottom-0 left-0 h-[2px] w-full bg-ink"
          />
        </div>
        {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
      </div>
    );
  },
);
Field.displayName = "Field";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function PrimaryButton({ children, loading, className = "", ...props }: PrimaryButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.99 }}
      disabled={loading || props.disabled}
      onClick={props.onClick}
      type={props.type}
      className={`group relative w-full overflow-hidden bg-ink text-paper py-4 px-5 font-display text-[15px] uppercase tracking-[0.15em] disabled:opacity-60 ${className}`}
    >
      <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-500 ease-out group-hover:translate-x-0" />
      <span className="relative flex items-center justify-between gap-2">
        <span>{loading ? "Sending…" : children}</span>
        {loading ? (
          <span className="size-3.5 animate-spin rounded-full border-2 border-paper/30 border-t-paper" />
        ) : (
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
    </motion.button>
  );
}

export function SocialButton({ provider, icon }: { provider: string; icon: ReactNode }) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      type="button"
      className="flex flex-1 items-center justify-center gap-2 border border-ink/25 bg-transparent px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-paper"
    >
      {icon}
      <span className="hidden sm:inline">{provider}</span>
    </motion.button>
  );
}

export function Divider({ children }: { children: ReactNode }) {
  return (
    <div className="my-7 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-ink/50">
      <div className="h-px flex-1 bg-ink/20" />
      <span className="font-semibold">{children}</span>
      <div className="h-px flex-1 bg-ink/20" />
    </div>
  );
}
