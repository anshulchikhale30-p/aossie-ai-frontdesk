# AOSSIE Agent — delivery outcomes

- [x] **AOSSIE identity and visual language:** The product is positioned as an AOSSIE community operations tool and uses GitHub-dark, Discord blurple, AOSSIE green, gold, system UI, and monospace audit styling.
- [x] **Discord-first operator flow:** The console shows AOSSIE channels and threads, lets an operator select a contributor question, inspect its repository route and source docs, draft a reply, escalate to a mentor, or log a documentation gap.
- [x] **Repository-aware answers:** Thread context shows repository name, route confidence, matched Markdown docs, and a source-backed answer shape instead of generic front-desk language.
- [x] **AOSSIE project registry:** The Projects view presents representative public projects such as SkillBot, Gitcord, Resonate, OpenVerifiableLLM, BabyNest, and ThruBox with routing/indexing health.
- [x] **Contributor identity flow:** The Contributors view shows verified and pending GitHub ↔ Discord links, roles, and recent activity, reflecting Gitcord’s identity-linking workflow.
- [x] **Audit-first automation:** The Automation view exposes Read → Plan → Report → Apply, dry-run/observer/active modes, and a visible mutation gate that stays locked without permission configuration.
- [x] **Audit and gap visibility:** The Audit view shows Markdown/JSON reports, sync history, and unanswered documentation gaps as first-class work rather than hidden logs.
- [x] **Discord preview:** A Discord-facing preview demonstrates a cited answer and a clarifying question without claiming that a live AOSSIE server was changed.
- [ ] **Production Discord/GitHub connectivity:** Add authorized AOSSIE bot credentials, server/channel permissions, GitHub scopes, verified identity linking, and real event ingestion.
- [ ] **Local-first execution:** Add repository doc sync, Ollama or configured model calls, durable gap logs, scheduled refreshes, and safe write/apply workers behind the audit gate.
