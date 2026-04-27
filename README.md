# cannygpt

A chat interface for talking to **Bev** — a warm Geordie matriarch from Newcastle who calls everyone pet and means it every single time. *Why AI, pet?*

Newcastle United kit aesthetic — pure monochrome with NUFC gold (#f5c518) as the only accent. The warmth comes entirely from Bev's voice; the design stays stark and graphic by design.

---

## Local dev setup

Requires Node 20+ and pnpm.

```bash
pnpm install
cp .env.local.example .env.local
# fill in keys, then:
pnpm dev
```

Open http://localhost:3000.

### Environment variables

```
ANTHROPIC_API_KEY=
NEXT_PUBLIC_STRIPE_BEER_LINK=
NEXT_PUBLIC_STRIPE_CASE_LINK=
```

Restart `pnpm dev` after editing `.env.local` — Next.js loads env at startup.

---

## Editing the personality

**To change how Bev talks, open [`lib/systemPrompt.ts`](lib/systemPrompt.ts). This is the most important file in the project.** Voice, vocabulary, refusals, length defaults — all in one string. Edit, save, refresh.

Paywall phrasing, suggestions, and stamp microtype live in [`lib/constants.ts`](lib/constants.ts).

---

## Stripe Setup

Free tier is 3 questions. Two unlocks via Stripe Payment Links.

### Step 1 — Create a Stripe account

[stripe.com](https://stripe.com), verify email, default to test mode.

### Step 2 — Create two Payment Links

Stripe dashboard → **Payment Links** → **+ New**.

**Link 1 — Newcastle Brown ($2):**
1. + Add a product → Create new product
2. Name: `Newcastle Brown for Bev`
3. Price: `$2.00 USD`, one-time
4. After payment → Redirect to your website
5. Redirect URL: `https://cannygpt.com?session=success&tier=beer`

**Link 2 — Full Round ($10):**
1. Repeat
2. Name: `A Full Round for Bev`
3. Price: `$10.00 USD`, one-time
4. Redirect URL: `https://cannygpt.com?session=success&tier=case`

### Step 3 — Set the Stripe statement descriptor

Stripe dashboard → **Settings** → **Public details** → **Statement descriptors**:
- **Statement descriptor**: `CANNYGPT` (5–22 chars)
- **Shortened statement descriptor**: `CANNYGPT` (5–10 chars)

Both for test and live mode separately.

### Step 4 — Add links to your environment

In `.env.local` and Vercel Project → Settings → Environment Variables:

```
NEXT_PUBLIC_STRIPE_BEER_LINK=https://buy.stripe.com/...
NEXT_PUBLIC_STRIPE_CASE_LINK=https://buy.stripe.com/...
```

### Step 5 — Test mode → Live mode switchover

1. Test card: `4242 4242 4242 4242`, any future expiry, any CVC.
2. Confirm: redirect to `cannygpt.vercel.app?session=success&tier=beer`, URL cleans to `/`, confirmation appears in chat, prompt counter updates.
3. Switch Stripe to **Live mode**, recreate both links, update Vercel env vars, redeploy.

---

## Vercel deploy

1. Push to GitHub.
2. Vercel → **Add New → Project**, import the repo.
3. Framework preset: Next.js.
4. **Environment Variables** — `ANTHROPIC_API_KEY` and both `NEXT_PUBLIC_STRIPE_*` for Production, Preview, Development.
5. Deploy.

---

## Custom domain

1. **Vercel:** Project → Settings → Domains → add `cannygpt.com`.
2. **At the registrar (Namecheap example):**
   - Delete any parking-page records.
   - A record: Host `@`, Value `76.76.21.21`.
   - CNAME: Host `www`, Value `cname.vercel-dns.com`.
3. Wait 5–30 min for DNS + Vercel-issued SSL.

---

## Generating the favicon

```bash
node scripts/generate-images.mjs
```

Produces `app/icon.png` (512×512) and `app/apple-icon.png` (180×180) — gold five-pointed star on black, ringed in gold then white. The Toon badge distilled.

The OG image (`public/og.png`, 1200×630) is created separately via Claude Design — see `MASTER_TEMPLATE.md` section 18.A.

---

## Design notes (this site's overrides)

- **Background**: pure black `#0a0a0a` with subtle ghost vertical stripes (`rgba(255,255,255,0.035)`, 40px on / 40px off). NUFC kit barely visible behind everything. NO sunburst, smoke, or vignette atmospheric layers — the design is deliberately stark.
- **Wordmark**: Anton, white, 3px gold drop shadow + 5px near-black layered shadow + soft gold glow. Upright, no drift animation.
- **Tagline**: Source Serif 4 italic, gold, slightly larger than other sites in the network (20px desktop). Solid gold rules at 60% opacity above and below.
- **Chat card**: cream `#f5f0e8` paper. Side stripes are tight 2px alternating black/white kit stripes (10px wide each). Gold outer ring on the card.
- **Avatar**: gold five-pointed star on black circle, gold inner ring + white outer ring + soft gold glow.
- **Loading dots**: white, gold, white — the three kit colours.
- **Suggestion chips**: cream bg, black border. Hover turns the border gold. All chips identical.
- **Paywall buttons**: beer is black with gold border + white text; case is solid gold with black text.
- **Bottom stripe**: 8px alternating black/white repeating pattern, full width.
- **Footer**: black bg, gold headings, white links with gold hover.

---

## Analytics

Two sources, both already wired up — no third-party analytics service.

- **Vercel Web Analytics** via `<Analytics />` from `@vercel/analytics/react` in `app/layout.tsx`. Free tier covers page views, unique visitors, top pages, referrers, countries, devices, and Web Vitals. Vercel dashboard → Project → Analytics.
- **Stripe Dashboard** is the source of truth for everything paywall-related: button clicks that converted (= each Payment Link checkout start), successful payments by tier, refunds, disputes, conversion rate. Set the statement descriptor to `CANNYGPT` so charges are identifiable on customer statements.

What's *not* tracked (deliberately): paywall shown, share-card opens, share completions. Trade-off accepted — if conversion analysis ever needs them, re-add a thin event layer rather than a third-party SDK.

---

## Protecting against API costs

Set a hard cap in the Anthropic console:
1. [console.anthropic.com](https://console.anthropic.com) → **Settings** → **Billing**
2. Monthly spend limit — suggested **$200** for launch.

In-app rate limit: 20 req/IP/min, in-memory and per-instance. For real traffic, upgrade to Upstash (V2 wishlist).

---

## Launch checklist

Before declaring the project done:

- [ ] OG image and favicon generated (see `MASTER_TEMPLATE.md` section 18.A — Claude Design prompt; favicon also generable via `node scripts/generate-images.mjs`)
- [ ] Stripe statement descriptor set to `CANNYGPT` in both test and live mode (see Stripe Setup, Step 3)
- [ ] All env vars set on Vercel for Production
- [ ] Custom domain `cannygpt.com` resolving with valid SSL
- [ ] Tested: free 3 questions → paywall → beer/case redirect → confirmation message
- [ ] Tested: Bev stays in character on a formal-document prompt (e.g., "Write a complaint letter")

---

## V2 wishlist

- Upstash Redis rate limiting + session store (paid balances survive cold starts).
- Stripe Webhook prompt verification (closes the "anyone can call /api/session/create" loophole).
- Server-rendered share images via `@vercel/og`.
