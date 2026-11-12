# AOSSIE Agent — implementation plan

## Product direction

Rebuild the generic AI Front Desk into an AOSSIE-focused Discord agent console. AOSSIE is an Australian open-source umbrella organization with a broad project portfolio, GSoC/community programs, and a public Discord. The product slice should feel like an internal community operations tool for maintainers and mentors, not a service-business appointment dashboard.

The demo centers on the actual AOSSIE-adjacent workflow described by SkillBot and Gitcord: contributors ask repository questions in Discord; the agent routes a question to the right project and relevant Markdown docs; maintainers review audit-friendly answers; GitHub and Discord activity can be synchronized through deterministic, permission-aware plans; and gaps become a visible backlog for documentation work.

This is still a UI/demo slice. It uses local in-memory data and does not claim live access to the AOSSIE Discord server, GitHub tokens, Ollama, or local repositories. Real credentials, bot permissions, identity linking, and mutation execution remain production seams.

## Information architecture

- **Overview:** Community control room with unanswered Discord threads, project routing health, contributor pulse, and safe-mode status.
- **Discord inbox:** Channel/thread view for #gsoc-2026, #landing-pages, #skillbot, and #general. Each thread shows the repository route, source docs, confidence, and a reply/escalate/log-gap workflow.
- **Projects:** AOSSIE project registry with repository language, indexed docs, question volume, and routing health.
- **Contributors:** Verified/pending GitHub ↔ Discord identity links, roles, and recent activity.
- **Automation:** Read → Plan → Report → Apply pipeline with dry-run, observer, and active modes. Apply stays locked until permissions are configured.
- **Audit log:** Markdown/JSON audit reports, gaps, plan summaries, and explicit mutation status.
- **Discord preview:** A customer-facing view becomes a realistic Discord thread preview showing how the agent answers with source citations and asks clarifying questions.

## Interaction model

The operator can select a thread, inspect the route and docs used, ask the agent to draft an answer, send a local reply into the mock thread, escalate to a mentor, or log a documentation gap. The UI makes “dry-run” the safe default and shows why a mutation is blocked. The Discord preview lets the user choose a repository question and see the answer shape without pretending that it was sent to a live server.

## Design direction

Three possible directions were considered: “open-source command center” (0.64), “Discord-native community lounge” (0.19), and “lightweight maintainer CRM” (0.07). The selected direction is **open-source command center**.

- **Design movement:** GitHub dark documentation chrome fused with Discord-native operational surfaces.
- **Core principles:** audit before action; context over clutter; contributor-friendly language; reversible controls.
- **Color philosophy:** GitHub dark grounds the workspace, Discord blurple marks Discord-facing actions, AOSSIE green marks synced/healthy state, and AOSSIE gold calls attention to mentorship, programs, and review gates.
- **Layout paradigm:** fixed server rail + operational sidebar + wide workbench. Thread context sits beside the conversation instead of hiding behind modal CRUD.
- **Signature elements:** a vertical Discord server rail, monospace routing/audit labels, and source chips that show exactly which repository docs informed an answer.
- **Interaction philosophy:** every write is explicit. “Draft,” “report,” “apply,” and “log gap” are different actions with different evidence and permission states.
- **Animation:** subtle panel fade/slide for selection changes and a restrained pulse for healthy sync. No decorative motion in audit data.
- **Typography system:** system UI for the product, monospace for repository names, commands, confidence, and audit output.
- **Brand essence:** a calm, reviewable bridge between AOSSIE’s codebases and its Discord community. Personality: transparent, mentor-friendly, practical.
- **Brand voice:** direct and welcoming. Example lines: “Answer from the repo, not from memory.” “Dry-run first. Apply only when the audit is understood.”
- **Wordmark & mark:** AOSSIE wordmark with a small linked-node mark that suggests repository ↔ Discord routing.
- **Signature brand color:** AOSSIE green `#228B22`, paired with Discord blurple `#5865F2` and AOSSIE gold `#FFC517`.

## Project structure

- `client/src/pages/Home.tsx`: AOSSIE operator console, Discord preview, local domain data, and demo interactions.
- `client/src/index.css`: GitHub-dark/AOSSIE visual system, responsive layouts, status treatments, and audit surfaces.
- `client/src/App.tsx`: route entry point.
- `client/public/manus-routes.json`: root route manifest.
- `app.config.ts`: AOSSIE/Gitcord-compatible project logo metadata.
- `TODO.md`: delivered demo outcomes and production follow-ups.

## Production seams

The local arrays intentionally map to future domain records: guild/channel/thread/message, repository/doc index, contributor identity link, automation run, audit report, and gap log. The next production pass can add the official Discord adapter, GitHub/OAuth scopes, local-first sync workers, SQLite or managed database persistence, and real Ollama or built-in-model routing while preserving this information architecture.
