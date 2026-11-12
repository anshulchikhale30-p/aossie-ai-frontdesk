# AI Front Desk — implementation plan

## Product slice

Build a polished, interactive demo of the AI Front Desk brief. The first slice is provider-facing and customer-facing in one web app so the core product rules are legible without real channel credentials: provider operations dashboard, inbox with human handoff, calendar and schedule-change alternatives, text-only knowledge, channel states, reminders, and a customer conversation preview.

The demo uses local in-memory state in React. It does not claim to connect WhatsApp, Telegram, Discord, calendars, or a managed database yet. The architecture keeps those boundaries visible so the later server-backed implementation can replace mock data without redesigning the interaction model.

## Implementation approach

- React + TypeScript + Wouter starter, with Lucide icons and Tailwind-compatible utility classes.
- One `Home` page that owns demo state and swaps between Overview, Inbox, Calendar, Knowledge, Channels, Settings, and Customer view.
- Reusable visual primitives inside the page for KPI cards, avatar initials, status pills, conversation rows, message bubbles, schedule cards, and overlays.
- No decorative image assets: this is an operational product where visual hierarchy, information density, and clear states are more useful than illustration.
- The app is responsive: the provider console collapses to a compact rail on narrow screens; the customer preview becomes a full-width mobile chat surface.
- `public/manus-routes.json` declares the single-page route for Preview/crawlers.

## Design direction

Three possible directions were considered: “warm editorial clinic” (0.06), “soft SaaS dashboard” (0.28), and “quiet operations studio” (0.66). The selected direction is **quiet operations studio**.

- **Design movement:** editorial operations software with restrained Swiss typography and a calm hospitality palette.
- **Core principles:** status before decoration; clear next action; human judgment is visible; dense data still feels breathable.
- **Color philosophy:** deep ink/navy grounds the workspace, warm paper keeps content approachable, and a signature sea-glass green marks healthy automation. Amber is reserved for the moments that need staff attention.
- **Layout paradigm:** a slim permanent navigation rail and offset work surfaces rather than centered marketing cards. Primary content is arranged as a left-to-right operational scan: signal, work queue, then schedule.
- **Signature elements:** a vertical “live” rail accent, rounded status chips with small dot indicators, and appointment cards that read like physical desk slips.
- **Interaction philosophy:** actions state their consequence. Schedule changes show choices; escalations show who owns the next step; a sent reply immediately appears in the thread.
- **Animation:** use subtle 150–220ms fades and translate-y transitions for panels and status changes. Avoid bouncing or decorative motion in the console.
- **Typography system:** Inter/system sans for all interface text with tight tracking for labels and generous line-height for message copy. Large metrics use a slightly condensed feel via font-weight and letter-spacing, not a second display face.
- **Brand essence:** a dependable front desk for teams who want the calm of automation without losing the human handoff. Personality: composed, attentive, pragmatic.
- **Brand voice:** concise and reassuring. Example lines: “Nothing falls through the cracks.” “This needs your judgment — the customer is already in the loop.”
- **Wordmark & logo:** a small doorway/relay mark made from two vertical strokes and a linking crossbar, paired with the `frontdesk` wordmark in lowercase.
- **Signature brand color:** sea-glass `#66D5B0`.

## Project structure

- `client/src/pages/Home.tsx`: the interactive demo shell, mock domain state, view components, and local actions.
- `client/src/index.css`: the visual system, responsive layout, status treatments, and small interaction animations.
- `client/src/App.tsx`: route entry point.
- `public/manus-routes.json`: page route manifest.
- `app.config.ts`: project logo metadata.
- `TODO.md`: outcome-oriented acceptance items for this slice and future production work.

## Later production seams

The mock conversation list, appointments, knowledge entries, and channel states are intentionally shaped like domain objects. The next implementation pass can move them behind tRPC procedures and Drizzle tables, add provider authentication and verified customer identity, then add channel adapters and scheduled notifications without changing the primary user flows.
