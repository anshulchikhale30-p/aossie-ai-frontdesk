# AI Front Desk — delivery outcomes

- [x] **Provider operations overview:** The provider-facing interface presents shared operational signal, including handled conversations, pending handoffs, confirmed appointments, automation health, an attention queue, and upcoming schedule items.
- [x] **Customer and provider interaction surfaces:** The product exposes one shared provider console and a customer conversation preview. The customer view only shows the customer’s own appointment context and provider information made available in the conversation.
- [x] **Inbox and human handoff:** The inbox shows customer conversations, preserves the original question and thread context, labels pending human judgment, and lets staff reply, mark handled, or escalate without blocking other conversations.
- [x] **Availability change safety:** Calendar changes present customer-selectable replacement times and do not silently move or cancel the existing appointment. The customer view lets the customer choose and confirm a replacement.
- [x] **Text-only operational knowledge:** The knowledge view allows plain-text operational entries with scope and validity metadata. It does not present file upload or repository ingestion as supported behavior.
- [x] **Channel operations:** The channels view makes WhatsApp Business, Telegram, and Discord integration states explicit, including connection/permission caveats and native platform interaction notes.
- [x] **Notification and broadcast states:** The overview and settings surfaces show provider-configured reminder timing, attendance confirmation, and a provider-requested broadcast flow without implying that adding knowledge automatically broadcasts it.
- [ ] **Production account isolation:** Replace local demo state with authenticated provider/staff roles, verified customer identity, and server/database ownership boundaries so each service-provider account is isolated.
- [ ] **Production adapters and delivery:** Add real channel adapters, durable appointments/knowledge/escalations, scheduled reminders, provider notifications, and authorized demo-account gating.
