# Inner Insight Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone, responsive one-page website for Hirata Hikaru's introspection sessions that communicates the philosophy and sends visitors to the supplied Google Form.

**Architecture:** A separate Vinext/React project renders static, source-controlled content through focused server components. One small client component handles progressive reveal behavior; all business links and copy live in a typed content module, and the Google Form is isolated behind a resilient embed component with an always-visible external fallback.

**Tech Stack:** TypeScript 5.9, React 19, Vinext 1, Vite 8, plain CSS, Vitest 4, Testing Library, OpenAI Sites Vite plugin.

**Spec:** `docs/superpowers/specs/2026-09-02-inner-insight-design.md`

## Global Constraints

- Keep the project at `WebProjects/inner-insight`; do not modify `WebProjects/kidoairaku-marche`.
- Use the exact Google Form, X, note, and Instagram destinations recorded in the spec.
- Do not invent prices, qualifications, testimonials, client counts, treatment claims, or guaranteed outcomes.
- The first release is a single page with static content; there is no database, account system, payment flow, custom form, or social-feed API.
- The form fallback link must remain usable when the iframe is unavailable or requires Google login.
- All core content and primary links must remain available without client-side JavaScript.
- Motion must stop under `prefers-reduced-motion: reduce`.
- Verify at approximately 390px and 1440px viewport widths.

---

## File Structure

- `package.json`: scripts and pinned project dependencies.
- `pnpm-workspace.yaml`: native package build permissions.
- `next.config.ts`: minimal Next-compatible configuration.
- `vite.config.ts`: Vinext, Sites, Tailwind PostCSS compatibility, and Cloudflare local runtime wiring.
- `tsconfig.json`: strict TypeScript and `@/*` path aliases.
- `vitest.config.ts`: React test environment and project aliases.
- `.gitignore`: generated, local, and deployment output exclusions.
- `app/layout.tsx`: Japanese document shell, metadata, fonts, header, footer, and progressive enhancement client.
- `app/page.tsx`: ordered composition of the one-page sections.
- `app/globals.css`: brand system, responsive layout, watercolor texture, interaction, and reduced-motion behavior.
- `app/page.test.tsx`: server-rendered content, hierarchy, and destination checks.
- `lib/content.ts`: typed site copy, navigation, philosophy, flow, and official external URLs.
- `lib/content.test.ts`: source-of-truth URL and content contract tests.
- `components/site-header.tsx`: desktop and mobile navigation.
- `components/home-sections.tsx`: hero, about, philosophy, session, flow, profile, journal, and closing CTA.
- `components/application-embed.tsx`: Google Form iframe and external fallback.
- `components/site-footer.tsx`: brand close and secondary navigation.
- `components/experience-client.tsx`: intersection-based reveal enhancement only.
- `components/experience-client.test.tsx`: enhancement behavior with mocked IntersectionObserver.
- `public/favicon.svg`: gradient `I` monogram.
- `public/og.svg`: share image with the primary message and brand mark.

---

### Task 1: Scaffold the standalone project and lock the content contract

**Files:**
- Create: `.gitignore`
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `next.config.ts`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `lib/content.test.ts`
- Create: `lib/content.ts`

**Interfaces:**
- Consumes: the approved spec and the four official destinations.
- Produces: `siteLinks`, `navigation`, `philosophies`, `sessionSteps`, and `profile` exports used by all later UI tasks.

- [ ] **Step 1: Create project configuration and install dependencies**

Create `package.json`:

```json
{
  "name": "inner-insight",
  "version": "0.1.0",
  "private": true,
  "engines": { "node": ">=22.13.0" },
  "scripts": {
    "dev": "vinext dev",
    "build": "vinext build",
    "start": "wrangler dev --config dist/server/wrangler.json",
    "lint": "oxlint",
    "format": "oxfmt",
    "test": "vitest run --config vitest.config.ts"
  },
  "dependencies": {
    "react": "19.2.6",
    "react-dom": "19.2.6",
    "react-server-dom-webpack": "19.2.6",
    "vinext": "1.0.0-beta.5"
  },
  "devDependencies": {
    "@cloudflare/vite-plugin": "1.37.1",
    "@openai/sites-vite-plugin": "0.2.0",
    "@testing-library/jest-dom": "7.0.1",
    "@testing-library/react": "16.3.3",
    "@types/node": "22.19.19",
    "@types/react": "19.2.14",
    "@types/react-dom": "19.2.3",
    "@vitejs/plugin-react": "6.0.2",
    "@vitejs/plugin-rsc": "0.5.26",
    "jsdom": "30.0.1",
    "oxfmt": "0.61.0",
    "oxlint": "1.76.0",
    "oxlint-tsgolint": "7.0.2001",
    "typescript": "5.9.3",
    "vite": "8.0.13",
    "vitest": "4.1.11",
    "wrangler": "4.92.0"
  }
}
```

Create `.gitignore`:

```gitignore
node_modules/
.next/
.vinext/
dist/
.wrangler/
.env*
!.env.example
```

Create `pnpm-workspace.yaml`:

```yaml
allowBuilds:
  esbuild: true
  workerd: true
```

Create `next.config.ts`:

```ts
import type { NextConfig } from 'next';
const nextConfig: NextConfig = {};
export default nextConfig;
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "types": ["node", "vinext/types"],
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", "**/*.mts"],
  "exclude": ["node_modules"]
}
```

Create `vitest.config.ts`:

```ts
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { alias: { '@': fileURLToPath(new URL('.', import.meta.url)) } },
  test: { environment: 'node', include: ['**/*.test.{ts,tsx}'], exclude: ['node_modules/**'] },
});
```

Create `vite.config.ts`:

```ts
import { sites } from '@openai/sites-vite-plugin';
import vinext from 'vinext';
import { defineConfig } from 'vite';

export default defineConfig(async () => {
  process.env.WRANGLER_WRITE_LOGS ??= 'false';
  process.env.WRANGLER_LOG_PATH ??= '.wrangler/logs';
  process.env.MINIFLARE_REGISTRY_PATH ??= '.wrangler/registry';
  const { cloudflare } = await import('@cloudflare/vite-plugin');
  return {
    plugins: [
      vinext(),
      sites(),
      cloudflare({
        viteEnvironment: { name: 'rsc', childEnvironments: ['ssr'] },
        config: { main: 'vinext/server/fetch-handler', compatibility_flags: ['nodejs_compat'] },
      }),
    ],
  };
});
```

Run: `pnpm install`

Expected: `pnpm-lock.yaml` is created and installation exits with code 0.

- [ ] **Step 2: Write the failing content contract test**

Create `lib/content.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { navigation, philosophies, profile, sessionSteps, siteLinks } from './content';

describe('Inner Insight content', () => {
  it('keeps every approved external destination in one source of truth', () => {
    expect(siteLinks.form).toContain('1FAIpQLSdm8nubPbm62zAnRIucGQa4mc22KrQW790tQTbZEC3TlgMtZw');
    expect(siteLinks.note).toBe('https://note.com/ripe_briony7413');
    expect(siteLinks.x).toBe('https://x.com/Hikaruhirata242');
    expect(siteLinks.instagram).toContain('hikaruhirata_24');
  });

  it('contains complete navigation and narrative data', () => {
    expect(navigation.map((item) => item.href)).toEqual(['#about', '#session', '#flow', '#profile', '#application']);
    expect(philosophies).toHaveLength(3);
    expect(sessionSteps).toHaveLength(3);
    expect(profile.name).toBe('平田 光');
  });
});
```

- [ ] **Step 3: Run the content test to verify it fails**

Run: `pnpm test -- lib/content.test.ts`

Expected: FAIL because `./content` does not exist.

- [ ] **Step 4: Implement the typed content module**

Create `lib/content.ts` with readonly data and these exact export shapes:

```ts
export const siteLinks = {
  form: 'https://docs.google.com/forms/d/e/1FAIpQLSdm8nubPbm62zAnRIucGQa4mc22KrQW790tQTbZEC3TlgMtZw/viewform',
  note: 'https://note.com/ripe_briony7413',
  x: 'https://x.com/Hikaruhirata242',
  instagram: 'https://www.instagram.com/hikaruhirata_24/',
} as const;

export const navigation = [
  { label: '内観とは', href: '#about' },
  { label: 'セッション', href: '#session' },
  { label: '流れ', href: '#flow' },
  { label: '平田光について', href: '#profile' },
  { label: 'お申し込み', href: '#application' },
] as const;

export const philosophies = [
  { number: '01', title: '痛みを、比べない。', body: '世間から小さく見えても、自分の中で痛いものなら、その痛みは確かにそこにあります。' },
  { number: '02', title: '小さな石ころを、守る。', body: '外側の評価よりも、あなたの根にある小さく大切なものを見失わないために。' },
  { number: '03', title: 'まず、自分を生きる。', body: '誰かに手を差し伸べる前に、自分が折れないこと。自分の声を聞くことから始めます。' },
] as const;

export const sessionSteps = [
  { number: '01', title: 'フォームから申し込む', body: 'ご希望や候補日をGoogleフォームからお知らせください。' },
  { number: '02', title: '日程を整える', body: 'メールまたはDMで、確定日時とGoogle Meetをご案内します。' },
  { number: '03', title: '対話から始める', body: '最初は約2時間。雑談も交えながら、今の心の動きを一緒に見ていきます。' },
] as const;

export const profile = {
  name: '平田 光',
  reading: 'HIKARU HIRATA',
  role: '心の土台を作る人',
} as const;
```

- [ ] **Step 5: Run tests and commit the scaffold/content task**

Run: `pnpm test -- lib/content.test.ts`

Expected: 2 tests PASS.

Run: `git add .gitignore package.json pnpm-lock.yaml pnpm-workspace.yaml next.config.ts vite.config.ts tsconfig.json vitest.config.ts lib && git commit -m "feat: scaffold inner insight content foundation"`

---

### Task 2: Build the complete semantic page and form fallback

**Files:**
- Create: `app/page.test.tsx`
- Create: `app/page.tsx`
- Create: `app/layout.tsx`
- Create: `components/home-sections.tsx`
- Create: `components/application-embed.tsx`
- Create: `components/site-header.tsx`
- Create: `components/site-footer.tsx`

**Interfaces:**
- Consumes: all exports from `lib/content.ts`.
- Produces: a statically renderable `Home` page, a reusable `ApplicationEmbed({ formUrl }: { formUrl: string })`, and document-wide header/footer components.

- [ ] **Step 1: Write the failing server-rendered page test**

Create `app/page.test.tsx`:

```tsx
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import Home from './page';

describe('Inner Insight home page', () => {
  it('renders the complete narrative and application path', () => {
    const markup = renderToStaticMarkup(<Home />);
    expect(markup).toContain('自分の声を、置き去りにしない。');
    expect(markup).toContain('内観とは');
    expect(markup).toContain('痛みを、比べない。');
    expect(markup).toContain('平田 光');
    expect(markup).toContain('title="内観セッション 申し込みフォーム"');
    expect(markup).toContain('フォームを別画面で開く');
  });

  it('renders the approved social destinations', () => {
    const markup = renderToStaticMarkup(<Home />);
    expect(markup).toContain('https://note.com/ripe_briony7413');
    expect(markup).toContain('https://x.com/Hikaruhirata242');
    expect(markup).toContain('https://www.instagram.com/hikaruhirata_24/');
  });
});
```

- [ ] **Step 2: Run the page test to verify it fails**

Run: `pnpm test -- app/page.test.tsx`

Expected: FAIL because `app/page.tsx` does not exist.

- [ ] **Step 3: Implement shared semantic components**

Implement these stable signatures:

```tsx
export function SiteHeader(): React.JSX.Element;
export function SiteFooter(): React.JSX.Element;
export function ApplicationEmbed({ formUrl }: { formUrl: string }): React.JSX.Element;
export function HomeHero(): React.JSX.Element;
export function HomeAbout(): React.JSX.Element;
export function HomePhilosophy(): React.JSX.Element;
export function HomeSession(): React.JSX.Element;
export function HomeFlow(): React.JSX.Element;
export function HomeProfile(): React.JSX.Element;
export function HomeJournal(): React.JSX.Element;
export function HomeApplication(): React.JSX.Element;
```

The form iframe must use a derived embed URL and always render a sibling fallback link:

```tsx
const embedUrl = `${formUrl.replace(/\/viewform.*$/, '/viewform')}?embedded=true`;

<iframe
  className="application-frame"
  src={embedUrl}
  title="内観セッション 申し込みフォーム"
  loading="lazy"
>
  Googleフォームを表示できません。
</iframe>
<a className="button button--primary" href={formUrl} target="_blank" rel="noreferrer">
  フォームを別画面で開く
</a>
```

- [ ] **Step 4: Compose the page and document layout**

`app/page.tsx` must preserve this section order:

```tsx
export default function Home() {
  return (
    <main id="main-content">
      <HomeHero />
      <HomeAbout />
      <HomePhilosophy />
      <HomeSession />
      <HomeFlow />
      <HomeProfile />
      <HomeJournal />
      <HomeApplication />
    </main>
  );
}
```

`app/layout.tsx` must set `lang="ja"`, expose a skip link, wrap the page with `SiteHeader` and `SiteFooter`, and use Japanese serif/sans font variables with `display: 'swap'`.

- [ ] **Step 5: Run tests and commit the semantic page**

Run: `pnpm test -- app/page.test.tsx lib/content.test.ts`

Expected: 4 tests PASS.

Run: `git add app components lib && git commit -m "feat: add inner insight session page"`

---

### Task 3: Add the visual system, responsive behavior, and progressive reveal

**Files:**
- Create: `app/globals.css`
- Create: `components/experience-client.test.tsx`
- Create: `components/experience-client.tsx`
- Modify: `app/layout.tsx`
- Modify: `components/home-sections.tsx`
- Modify: `components/site-header.tsx`
- Create: `public/favicon.svg`
- Create: `public/og.svg`

**Interfaces:**
- Consumes: semantic classes and `[data-reveal]` attributes from Task 2.
- Produces: `ExperienceClient(): null`, which reveals observed elements by adding `is-visible`, plus the final responsive presentation.

- [ ] **Step 1: Write the failing progressive-enhancement test**

Create `components/experience-client.test.tsx` with a jsdom file directive:

```tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ExperienceClient } from './experience-client';

afterEach(() => vi.restoreAllMocks());

describe('ExperienceClient', () => {
  it('reveals observed elements as they enter the viewport', () => {
    let callback: IntersectionObserverCallback = () => undefined;
    const observe = vi.fn();
    const disconnect = vi.fn();
    vi.stubGlobal('IntersectionObserver', class {
      constructor(next: IntersectionObserverCallback) { callback = next; }
      observe = observe;
      disconnect = disconnect;
      unobserve = vi.fn();
      root = null;
      rootMargin = '';
      thresholds = [];
      takeRecords = () => [];
    });

    const target = document.createElement('div');
    target.dataset.reveal = 'true';
    document.body.append(target);
    const { unmount } = render(<ExperienceClient />);
    expect(observe).toHaveBeenCalledWith(target);

    callback([{ target, isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    expect(target.classList.contains('is-visible')).toBe(true);
    unmount();
    expect(disconnect).toHaveBeenCalled();
    target.remove();
  });
});
```

- [ ] **Step 2: Run the enhancement test to verify it fails**

Run: `pnpm test -- components/experience-client.test.tsx`

Expected: FAIL because `experience-client.tsx` does not exist.

- [ ] **Step 3: Implement the minimal reveal client**

Create `components/experience-client.tsx`:

```tsx
'use client';

import { useEffect } from 'react';

export function ExperienceClient() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
  return null;
}
```

- [ ] **Step 4: Implement the watercolor editorial CSS system**

Define exact tokens in `:root`:

```css
:root {
  --paper: #f7f3ed;
  --paper-bright: #fffdf9;
  --ink: #211c22;
  --muted: #756d70;
  --rose: #aa6676;
  --sand: #c9ae87;
  --plum: #64183f;
  --midnight: #090e22;
  --line: rgba(65, 48, 53, 0.16);
  --brand-gradient: linear-gradient(160deg, #c7b47a 0%, #7d174c 32%, #331136 58%, #071127 100%);
  --frame: min(calc(100% - 40px), 1180px);
}
```

The hero uses a two-column desktop layout and one-column mobile layout. Build the `I` as selectable text with `background: var(--brand-gradient)`, `background-clip: text`, transparent fill, a serif face, and a soft blurred duplicate behind it. Use layered radial gradients for watercolor stains and a low-opacity noise-like SVG data background or CSS gradient pattern. Keep body copy at a minimum computed size of 14px and line-height of at least 1.8.

Add:

```css
[data-reveal] { opacity: 0; transform: translateY(22px); transition: opacity .9s ease, transform .9s ease; }
[data-reveal].is-visible { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; animation: none !important; transition-duration: .01ms !important; }
  [data-reveal] { opacity: 1 !important; transform: none !important; }
}
```

At desktop widths, the philosophy cards form a three-column rail and the profile/application sections use balanced two-column layouts. At mobile widths, cards stack, navigation collapses into a native `<details>` menu, and the iframe height is at least `900px`.

- [ ] **Step 5: Create brand SVG assets and wire the enhancement**

Create `public/favicon.svg` with an ivory square and a serif `I` filled by the approved plum-to-midnight gradient. Create `public/og.svg` at 1200×630 with the same monogram, brand name, and primary message. Import `ExperienceClient` in `app/layout.tsx` and render it before the header.

- [ ] **Step 6: Run focused tests and commit the visual system**

Run: `pnpm test -- components/experience-client.test.tsx app/page.test.tsx`

Expected: 3 tests PASS.

Run: `git add app components public && git commit -m "feat: add watercolor inner insight visual system"`

---

### Task 4: Add metadata, perform full verification, and produce the 6–8割 review build

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.test.tsx`
- Create: `README.md`

**Interfaces:**
- Consumes: the completed page and visual system.
- Produces: a buildable, documented review version with verified responsive and external-link behavior.

- [ ] **Step 1: Extend the page test with metadata-adjacent content requirements**

Add assertions that the rendered page contains exactly one `<h1`, `id="main-content"`, the external-form explanation `Googleアカウントへのログインが必要です`, and no unsupported claims matching `治療|必ず改善|資格保有|満足度`.

- [ ] **Step 2: Run the page test and verify the new expectation fails**

Run: `pnpm test -- app/page.test.tsx`

Expected: FAIL if the login explanation or single-heading contract has not yet been implemented.

- [ ] **Step 3: Complete metadata and truthful application copy**

Export metadata from `app/layout.tsx`:

```ts
export const metadata: Metadata = {
  title: 'Inner Insight｜平田光の内観セッション',
  description: '自分の心の動きに気づき、自分はどう生きたいかを見つめるための内観セッション。',
  openGraph: {
    title: 'Inner Insight｜内観セッション',
    description: '自分の声を、置き去りにしない。',
    images: [{ url: '/og.svg', width: 1200, height: 630 }],
    type: 'website',
    locale: 'ja_JP'
  },
  twitter: { card: 'summary_large_image', images: ['/og.svg'] }
};
```

Ensure the application section says that Google login is required and that the same official form opens in a separate tab.

- [ ] **Step 4: Run automated verification**

Run: `pnpm test`

Expected: all tests PASS.

Run: `pnpm lint`

Expected: exits with code 0, or only reports generated/vendor files that are then excluded without weakening checks for application code.

Run: `pnpm build`

Expected: production build exits with code 0 and emits the Vinext output.

- [ ] **Step 5: Perform browser verification at desktop and mobile sizes**

Run: `pnpm dev`

Inspect the local page at approximately 1440×1000 and 390×844. Verify:

- the hero headline and `I` monogram fit without clipping;
- all ten content areas appear in the approved order;
- header navigation reaches the correct section IDs;
- the native mobile menu is keyboard-operable;
- note, X, Instagram, and form links use the approved destinations;
- the Google Form area presents both iframe and fallback link;
- there is no horizontal overflow;
- there are no application console errors;
- reduced-motion emulation leaves all content visible.

- [ ] **Step 6: Document review status and commit**

Create `README.md` with the project purpose, `pnpm install`, `pnpm dev`, `pnpm test`, and `pnpm build` commands; list the external sources and state that the current artifact is the 6–8割 review version.

Run: `git add app README.md && git commit -m "docs: prepare inner insight review build"`

Run: `git status --short`

Expected: clean working tree.
