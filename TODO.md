# AOSSIE AI Front Desk — delivery outcomes

- [x] **Unified AOSSIE provider model:** The dashboard and Discord Agent represent AOSSIE maintainers/authorized staff as the provider side and contributors as customers/participants, with the provider account as the scope boundary.
- [x] **Provider operations surface:** The dashboard Front Desk view covers open conversations, approved knowledge, meetings, reminders, pending human decisions, and guardrails.
- [x] **Source-backed contributor support:** The Discord Agent answers AOSSIE repository and SkillBot questions from approved documentation or creates maintainer review work when confidence is insufficient.
- [x] **Natural channel experience:** DMs can be used without tagging; contribution requests can start the codebase-understanding quiz without a tag; unrelated public conversation remains quiet.
- [x] **Contribution quality gate:** Issue, bug, feature, contribution, and pull-request requests can start the codebase-understanding quiz before the Agent helps continue the request.
- [x] **Scoped provider knowledge:** Maintainer-entered text, provider-wide facts, and contributor-specific context are represented separately; a customer-specific answer is not automatically promoted globally.
- [x] **Scheduling safeguards:** Availability, meetings, atomic booking confirmation, cancellation, rescheduling, reminders, and attendance flows remain available, and availability changes do not silently move or cancel existing bookings.
- [x] **Human escalation:** Missing, conflicting, sensitive, urgent, or dissatisfied requests remain asynchronous pending work and do not block unrelated contributor messages.
- [x] **Audit and safety:** Spam controls, permission-aware staff actions, source citations, and observer/dry-run-first behavior remain visible in the dashboard and Agent.
- [x] **Persistent runnable Agent:** Docker Compose provides persistent data and restart-on-failure behavior for local development and an always-on VPS.
- [ ] **Production integration:** Connect the dashboard to durable Agent data and authenticated provider accounts; replace the SQLite MVP layer with the selected shared production database and add further channel adapters.
