# AOSSIE Agent — source notes

The redesign is grounded in these public sources accessed on 12 November 2026.

- AOSSIE organization profile: https://github.com/AOSSIE-Org
  - Public profile identifies AOSSIE as Australian Open Source Software Innovation and Education, with a public Discord link, an Australia location, and a broad repository portfolio.
- AOSSIE website: https://aossie.org/en
  - Positions AOSSIE around “A Fair Go Through Open Source,” free software, contributors, mentors, projects, sponsors, and an official Discord community.
- AOSSIE Website contributing guide: https://raw.githubusercontent.com/AOSSIE-Org/Website/main/CONTRIBUTING.md
  - Directs contributors to Discord for questions and identifies the #landing-pages channel as a collaboration point.
- SkillBot README: https://raw.githubusercontent.com/AOSSIE-Org/SkillBot/main/README.md
  - Describes a free local Discord bot that routes contributor questions to repository docs, uses local Ollama inference, creates one thread per query, asks clarifying questions, recovers backlog, and records documentation gaps.
- Gitcord README: https://raw.githubusercontent.com/AOSSIE-Org/Gitcord-GithubDiscordBot/main/README.md
  - Describes a local offline-first Discord ↔ GitHub automation engine with audit-first reports, deterministic planning, permission-aware IO, dry-run/observer behavior, identity linking, contributor profiles, and gated writes.
- Gitcord brand guide: https://raw.githubusercontent.com/AOSSIE-Org/Gitcord-GithubDiscordBot/main/brand/Brand.md
  - Supplies the visual cues used here: Discord Blurple `#5865F2`, GitHub Dark `#0D1117`, GitHub Green `#238636`, Surface `#161B22`, muted text `#8B949E`, AOSSIE Green `#228B22`, AOSSIE Gold `#FFC517`, and system/monospace typography.
- Google Summer of Code AOSSIE profile: https://summerofcode.withgoogle.com/archive/2025/organizations/aossie
  - Describes AOSSIE as an Australian not-for-profit umbrella organization for open-source projects, with projects spanning AI, communication, mobile, governance, blockchain, and social-good themes.

The UI is a local mock demo. It does not claim access to the live AOSSIE Discord, GitHub organization, bot tokens, or local Ollama instance.
