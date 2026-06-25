# Auth Ledger — reusable authentication template

A drop-in, magazine-editorial auth UI (Sign in / Register / Forgot password)
with a 3D ink sculpture, animated marquee, and a Paper-&-Ink palette.
Router-agnostic — works in TanStack Start, Next.js, React Router, Remix, Vite.

## What's in this folder

```
auth-ledger/
├── components/
│   ├── AuthLayout.tsx     # Two-column editorial shell (router-agnostic)
│   ├── AuthForm.tsx       # Field, PrimaryButton, SocialButton, Divider
│   ├── AuthScene.tsx      # React Three Fiber 3D scene
│   └── icons.tsx          # Inline Google / GitHub / Apple SVGs
├── pages/
│   ├── SignInPage.tsx
│   ├── SignUpPage.tsx
│   └── ForgotPasswordPage.tsx
├── styles/
│   └── theme.css          # Tokens, fonts, utilities
├── index.ts               # Barrel exports
└── README.md
```

## Install

```bash
bun add motion lucide-react three @react-three/fiber @react-three/drei \
        @fontsource/archivo-black @fontsource/hind
```

Tailwind **v4** is required (uses `@theme` and `@utility`).

## Wire up

**1. Load the theme** from your global stylesheet:

```css
/* src/styles.css */
@import "tailwindcss";
@import "./templates/auth-ledger/styles/theme.css";
```

**2. Render a page** and pass your framework's `<Link>` + current pathname.

### TanStack Start / React Router

```tsx
import { Link, useLocation } from "@tanstack/react-router";
import { SignInPage } from "@/templates/auth-ledger";

export default function Page() {
  const { pathname } = useLocation();
  return (
    <SignInPage
      pathname={pathname}
      LinkComponent={Link}
      onSubmit={async ({ email, password }) => {
        await supabase.auth.signInWithPassword({ email, password });
      }}
    />
  );
}
```

### Next.js (app router)

```tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInPage } from "@/templates/auth-ledger";

export default function Page() {
  return <SignInPage pathname={usePathname()} LinkComponent={Link as any} />;
}
```

## Plug in any auth provider

Every page exposes an `onSubmit` callback with typed values — wire it to
Supabase, Clerk, Auth.js, Firebase, Cognito, your own API, etc.

```tsx
<SignUpPage
  pathname={pathname}
  LinkComponent={Link}
  onSubmit={async ({ name, email, password }) => {
    await fetch("/api/register", { method: "POST", body: JSON.stringify({ name, email, password }) });
  }}
/>
```

## Customize

- **Brand**: pass `brand="ACME"` / `brandAccent="*"` to `AuthLayout` (or build your own page from the layout primitive).
- **Routes**: pass `signInPath`, `signUpPath`, `forgotPath` to match your URLs.
- **Palette**: edit `--paper`, `--ink`, `--accent` in `styles/theme.css`.
- **Fonts**: swap the `@fontsource` imports and `--font-display` / `--font-sans`.
- **3D scene**: edit `components/AuthScene.tsx` or remove the `<AuthScene />` mount in `AuthLayout`.

## License

MIT — copy the folder, ship it, modify freely.
