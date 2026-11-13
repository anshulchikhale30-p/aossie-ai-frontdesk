# AOSSIE AI Front Desk — unified rebuild plan

## Product direction

AOSSIE AI Front Desk is one provider-facing operational system with two surfaces: an AOSSIE maintainer dashboard and a Discord customer/contributor experience. AOSSIE maintainers and authorized staff are the provider team; contributors are customers/participants. The provider account is the data boundary.

The system answers contributor questions from approved AOSSIE project knowledge, routes uncertain parts to maintainers, coordinates contributor meetings, sends reminders, and applies explicit scope and consent rules. A contribution issue or pull-request request starts the codebase-understanding quiz before the Agent helps create it. In Discord DMs the Agent is addressed naturally; in server channels, natural questions and contribution requests can be handled without forcing a tag, while unrelated conversation remains quiet.

## Provider dashboard

- **Front Desk:** provider operations summary for open conversations, approved knowledge, meetings, pending human decisions, reminders, and guardrails.
- **Discord inbox:** source-backed conversation review, replies, escalation, and documentation gaps.
- **Projects:** AOSSIE repository and documentation routing health.
- **Contributors:** verified identity and mentorship context without merging records from names alone.
- **Automation:** observer/dry-run first; writes remain explicitly gated.
- **Audit:** readable evidence for answers, pending interactions, reminders, and changes.

## Discord Agent

The Python Agent remains the channel adapter and workflow executor. It preserves provider/customer scoping, maintainer-authored knowledge, atomic scheduling, reminder queues, spam controls, pending questions, and the contribution quiz. Public repository documentation remains an AOSSIE-specific approved source for contributor support; it is not treated as unrestricted external ingestion.

## Safety and scope

Provider-wide facts are separated from customer-specific contributor context. An answer learned from one contributor is not promoted globally without maintainer confirmation. Live availability and bookings come from the scheduling service. Availability changes never silently move or cancel an existing meeting. Uncertain, sensitive, or dissatisfied requests become pending maintainer work without blocking unrelated questions.

## Delivery shape

The dashboard is a polished local demo surface. The Agent is the runnable Discord implementation with Docker/VPS deployment. SQLite remains the self-contained MVP persistence layer; a future production deployment can replace it with PostgreSQL behind the same service boundaries.
