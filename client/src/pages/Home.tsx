import {
  Activity,
  AlertCircle,
  ArrowLeft,
  ArrowUpRight,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Headphones,
  Inbox,
  Info,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

type View = "overview" | "inbox" | "calendar" | "knowledge" | "channels" | "settings";
type Mode = "provider" | "customer";

type Conversation = {
  id: number;
  name: string;
  initials: string;
  channel: string;
  preview: string;
  time: string;
  status: "pending" | "handled" | "urgent";
  messages: { from: "customer" | "agent"; text: string; time: string }[];
};

const conversations: Conversation[] = [
  {
    id: 1,
    name: "Maya Chen",
    initials: "MC",
    channel: "WhatsApp",
    preview: "Do you have a quiet room for the intake call?",
    time: "9:42 AM",
    status: "pending",
    messages: [
      { from: "customer", text: "Hi! I’m looking to book an intake call next week. Do you have a quiet room for it?", time: "9:36 AM" },
      { from: "agent", text: "I can help with the booking. I don’t have a confirmed answer about room availability yet, so I’ve asked the team to confirm it for you.", time: "9:37 AM" },
      { from: "customer", text: "Thanks — I’d prefer somewhere private if possible.", time: "9:42 AM" },
    ],
  },
  {
    id: 2,
    name: "Jon Bell",
    initials: "JB",
    channel: "Telegram",
    preview: "I need to move my appointment to Thursday.",
    time: "8:18 AM",
    status: "handled",
    messages: [
      { from: "customer", text: "I need to move my appointment to Thursday.", time: "8:10 AM" },
      { from: "agent", text: "I found two Thursday openings. I’ve held 11:30 AM for you for the next 10 minutes — reply ‘confirm’ to move it.", time: "8:18 AM" },
    ],
  },
  {
    id: 3,
    name: "Priya Shah",
    initials: "PS",
    channel: "Discord",
    preview: "Is the first session refundable if I cancel?",
    time: "Yesterday",
    status: "urgent",
    messages: [
      { from: "customer", text: "Is the first session refundable if I cancel? I’m not sure I can make it.", time: "Yesterday" },
      { from: "agent", text: "I’m going to route this to the team because the answer depends on the timing of the cancellation. You won’t need to repeat the question.", time: "Yesterday" },
    ],
  },
  {
    id: 4,
    name: "Liam Ortiz",
    initials: "LO",
    channel: "WhatsApp",
    preview: "Thanks, Tuesday at 2 works for me.",
    time: "Mon",
    status: "handled",
    messages: [
      { from: "customer", text: "Thanks, Tuesday at 2 works for me.", time: "Mon" },
      { from: "agent", text: "Confirmed — you’re booked for Tuesday, 14 May at 2:00 PM with Alex. I’ll remind you the day before.", time: "Mon" },
    ],
  },
];

const appointments = [
  { time: "09:00", name: "Maya Chen", service: "Intake call · 45 min", color: "mint" },
  { time: "11:30", name: "Jon Bell", service: "Follow-up · 30 min", color: "blue" },
  { time: "14:00", name: "Team focus block", service: "No appointments", color: "amber" },
  { time: "16:15", name: "Priya Shah", service: "First session · 60 min", color: "mint" },
];

const knowledge = [
  { title: "Opening hours", body: "Mon–Fri, 08:30–17:30. The front desk is closed on public holidays.", scope: "Organization-wide", updated: "Updated today" },
  { title: "Rescheduling policy", body: "Customers can reschedule up to 24 hours before the appointment without a fee.", scope: "Organization-wide", updated: "Updated 2 days ago" },
  { title: "Maya Chen · private arrangement", body: "Prefers a quiet room for calls. Confirm room availability with staff before promising it.", scope: "Customer-specific", updated: "Added today" },
  { title: "First session preparation", body: "Send the short intake form after a first session is confirmed. Do not request medical records in chat.", scope: "Service context", updated: "Updated 1 week ago" },
];

const navItems: { id: View; label: string; icon: typeof Activity }[] = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "knowledge", label: "Knowledge", icon: BookOpen },
  { id: "channels", label: "Channels", icon: MessageCircle },
];

function Avatar({ initials, tone = "customer" }: { initials: string; tone?: "customer" | "staff" | "orange" }) {
  return <div className={`avatar ${tone}`}>{initials}</div>;
}

function StatusPill({ children, tone = "mint" }: { children: React.ReactNode; tone?: "mint" | "amber" | "red" | "blue" }) {
  return <span className={`status-pill ${tone}`}>{children}</span>;
}

function PageHeading({ view, onCreate }: { view: View; onCreate: () => void }) {
  const copy: Record<View, { eyebrow: string; title: string; sub: string; action?: string }> = {
    overview: { eyebrow: "Tuesday · 14 May 2024", title: "Good morning, Alex.", sub: "Your front desk is calm, current, and ready for the day.", action: "Draft broadcast" },
    inbox: { eyebrow: "Shared provider inbox", title: "Nothing falls through the cracks.", sub: "Review the conversations that need human judgment, then hand them back to the front desk.", action: "New broadcast" },
    calendar: { eyebrow: "Availability & appointments", title: "A schedule people can trust.", sub: "Changes surface as choices for customers — never silent moves.", action: "Change hours" },
    knowledge: { eyebrow: "Operational knowledge", title: "Keep the answers current.", sub: "Plain-text guidance the front desk can use, with scope and validity made visible.", action: "Add knowledge" },
    channels: { eyebrow: "Messaging integrations", title: "Meet people where they already are.", sub: "Each channel keeps its own identity, permissions, and native interaction rules.", action: "Connect channel" },
    settings: { eyebrow: "Front desk settings", title: "Set the tone once.", sub: "Reminders, escalation defaults, and team access for Northstar Studio.", action: "Save changes" },
  };
  const item = copy[view];
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow"><span className="eyebrow-dot" />{item.eyebrow}</div>
        <h1>{item.title}</h1>
        <p>{item.sub}</p>
      </div>
      {item.action && (
        <div className="heading-actions">
          <button className="btn btn-soft" onClick={onCreate}><Plus size={14} />{item.action}</button>
        </div>
      )}
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, foot, tone = "mint" }: { icon: typeof Activity; label: string; value: string; foot: React.ReactNode; tone?: "mint" | "amber" }) {
  return (
    <div className="kpi">
      <div className="kpi-top"><span>{label}</span><span className={`kpi-icon ${tone === "amber" ? "amber" : ""}`}><Icon size={14} /></span></div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-foot">{foot}</div>
    </div>
  );
}

function Overview({ onNavigate, onNotify }: { onNavigate: (view: View) => void; onNotify: (message: string) => void }) {
  const bars = [
    { day: "Mon", answered: 36, escalated: 8 }, { day: "Tue", answered: 44, escalated: 7 }, { day: "Wed", answered: 51, escalated: 12 },
    { day: "Thu", answered: 41, escalated: 8 }, { day: "Fri", answered: 38, escalated: 5 }, { day: "Sat", answered: 20, escalated: 3 }, { day: "Sun", answered: 12, escalated: 2 },
  ];
  return (
    <>
      <div className="kpi-grid">
        <KpiCard icon={MessageCircle} label="Conversations handled" value="184" foot={<><strong>+12%</strong> vs last week</>} />
        <KpiCard icon={Headphones} label="Need your judgment" value="07" foot={<><strong>3 urgent</strong> · oldest 42m</>} tone="amber" />
        <KpiCard icon={CalendarDays} label="Appointments confirmed" value="32" foot={<><strong>96%</strong> confirmation rate</>} />
        <KpiCard icon={Sparkles} label="Front desk coverage" value="91%" foot={<><strong>Healthy</strong> · 2 connected, 1 review</>} />
      </div>
      <div className="grid-main">
        <div>
          <div className="panel">
            <div className="panel-head"><div><h2 className="panel-title">Front desk activity</h2><p className="panel-subtitle">Messages answered automatically, plus handoffs to your team.</p></div><button className="panel-link" onClick={() => onNavigate("inbox")}>View inbox <ArrowUpRight size={12} style={{ verticalAlign: "-2px" }} /></button></div>
            <div className="panel-body">
              <div className="chart-wrap"><div className="chart-bars">{bars.map((bar) => <div className="bar-day" key={bar.day}><div className="bar-stack"><div className="bar escalated" style={{ height: `${bar.escalated * 3}px` }} /><div className="bar answered" style={{ height: `${bar.answered * 2.4}px` }} /></div><span>{bar.day}</span></div>)}</div><div className="chart-legend"><span className="legend-item"><span className="legend-dot" style={{ background: "#b4e8d5" }} />Answered automatically</span><span className="legend-item"><span className="legend-dot" style={{ background: "#f3c88c" }} />Sent to your team</span></div></div>
            </div>
          </div>
          <div className="panel">
            <div className="panel-head"><div><h2 className="panel-title">Attention queue</h2><p className="panel-subtitle">The next few things that need a human decision.</p></div><StatusPill tone="amber">7 open</StatusPill></div>
            <div className="attention-list">
              <div className="attention-item"><span className="priority amber" /><div><p><strong>Maya Chen</strong> is waiting on quiet-room availability for her intake call.</p><small>WhatsApp · 42 minutes ago</small></div><ChevronRight size={14} color="#a4b5b0" /></div>
              <div className="attention-item"><span className="priority red" /><div><p><strong>Priya Shah</strong> asked about a cancellation exception. Review before responding.</p><small>Discord · Yesterday</small></div><ChevronRight size={14} color="#a4b5b0" /></div>
              <div className="attention-item"><span className="priority green" /><div><p><strong>Tuesday 14:00</strong> is over capacity if the focus block is removed.</p><small>Calendar · Change proposed</small></div><ChevronRight size={14} color="#a4b5b0" /></div>
            </div>
          </div>
        </div>
        <div>
          <div className="panel">
            <div className="panel-head"><div><h2 className="panel-title">Upcoming today</h2><p className="panel-subtitle">Tuesday, 14 May</p></div><button className="panel-link" onClick={() => onNavigate("calendar")}>Open calendar</button></div>
            <div className="panel-body"><div className="schedule-list">{appointments.map((appointment) => <div className="schedule-row" key={appointment.time}><div className="time"><strong>{appointment.time}</strong>{appointment.time === "09:00" ? "AM" : ""}</div><div className="schedule-info"><strong>{appointment.name}</strong><span>{appointment.service}</span></div><StatusPill tone={appointment.color as "mint" | "amber" | "blue"}>{appointment.color === "amber" ? "Hold" : "Confirmed"}</StatusPill></div>)}</div></div>
          </div>
          <div className="panel">
            <div className="panel-head"><div><h2 className="panel-title">A small win</h2><p className="panel-subtitle">The front desk learned something useful.</p></div><Sparkles size={15} color="#e4a852" /></div>
            <div className="panel-body"><p style={{ margin: 0, color: "#41625e", fontSize: 12, lineHeight: 1.55 }}>“Customers can reschedule up to 24 hours before an appointment without a fee” answered <strong>4 conversations</strong> this week.</p><button className="btn btn-soft btn-small" style={{ marginTop: 15 }} onClick={() => onNotify("Knowledge is always scoped to Northstar Studio.")}><BookOpen size={13} />Review knowledge</button></div>
          </div>
        </div>
      </div>
    </>
  );
}

function InboxView({ onNotify }: { onNotify: (message: string) => void }) {
  const [selected, setSelected] = useState(0);
  const [draft, setDraft] = useState("");
  const [handled, setHandled] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const [threadMessages, setThreadMessages] = useState(conversations[0].messages);
  const conversation = conversations[selected];
  const send = () => {
    if (!draft.trim()) return;
    setThreadMessages([...threadMessages, { from: "agent", text: draft.trim(), time: "Now" }]);
    setDraft("");
    onNotify("Reply sent to the customer.");
  };
  return (
    <div className="panel">
      <div className="inbox-layout">
        <div className="conversation-list">
          <div className="inbox-list-head"><strong>All conversations</strong><span className="count-badge">18</span></div>
          {conversations.map((item, index) => <button className={`conversation-item ${index === selected ? "selected" : ""}`} key={item.id} onClick={() => { setSelected(index); setHandled(false); setEscalated(false); setDraft(""); setThreadMessages(item.messages); }}><Avatar initials={item.initials} tone={item.status === "urgent" ? "orange" : "customer"} /><div className="conversation-copy"><div className="conversation-copy-top"><strong>{item.name}</strong><time>{item.time}</time></div><p>{item.preview}</p><span className="channel-tag"><MessageCircle size={10} />{item.channel}<span style={{ marginLeft: "auto" }}><StatusPill tone={item.status === "pending" ? "amber" : item.status === "urgent" ? "red" : "mint"}>{item.status === "pending" ? "Needs you" : item.status === "urgent" ? "Urgent" : "Handled"}</StatusPill></span></span></div></button>)}
        </div>
        <div className="thread">
          <div className="thread-head"><div className="thread-person"><Avatar initials={conversation.initials} tone={conversation.status === "urgent" ? "orange" : "customer"} /><div><strong>{conversation.name}</strong><span>{conversation.channel} · verified customer</span></div></div><div className="thread-actions">{conversation.status !== "handled" && <button className="btn btn-danger btn-small" onClick={() => { setEscalated(true); onNotify("Escalated to Sam Lee with a conversation summary."); }}><Headphones size={13} />{escalated ? "Escalated" : "Escalate"}</button>}{conversation.status !== "handled" && <button className="btn btn-primary btn-small" onClick={() => { setHandled(true); onNotify("Conversation marked as handled."); }}><Check size={13} />{handled ? "Handled" : "Mark handled"}</button>}<button className="icon-button" title="More actions"><MoreHorizontal size={15} /></button></div></div>
          <div className="thread-body"><div className="day-divider">Today</div>{threadMessages.map((message, index) => <div className={`message ${message.from === "agent" ? "from-agent" : "from-customer"}`} key={`${message.time}-${index}`}><div className="message-meta"><span>{message.from === "agent" ? "Front desk" : conversation.name}</span><span>{message.time}</span></div><div className="bubble">{message.text}</div></div>)}{conversation.status !== "handled" && !handled && <div className="handoff-card"><AlertCircle size={16} /><div><strong>{escalated ? "Escalated to your team" : "Human judgment requested"}</strong>{escalated ? "Sam Lee has the original question, customer context, and channel details." : "This question is pending with your team. The customer has already been told they won’t need to repeat themselves."}</div></div>}</div>
          <div className="composer"><textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Reply as Northstar Studio…" onKeyDown={(event) => { if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) send(); }} /><button className="btn btn-primary" onClick={send}><Send size={14} />Send</button></div>
        </div>
      </div>
    </div>
  );
}

function CalendarView({ onNotify }: { onNotify: (message: string) => void }) {
  const [showChange, setShowChange] = useState(false);
  const [selectedAlternative, setSelectedAlternative] = useState("");
  return (
    <>
      <div className="calendar-grid">
        <div className="panel" style={{ overflowX: "auto" }}>
          <div className="calendar-toolbar"><div><strong>Week of 13–19 May</strong><span style={{ display: "block", marginTop: 4 }}>Northstar Studio · London time</span></div><div style={{ display: "flex", gap: 6 }}><button className="icon-button"><ArrowLeft size={14} /></button><button className="icon-button"><ChevronRight size={14} /></button></div></div>
          <div className="week-grid">
            <div className="week-day" />{["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => <div className={`week-day ${day === "Tue" ? "active" : ""}`} key={day}>{day}<strong>{13 + index}</strong></div>)}
            {["09:00", "10:30", "12:00", "14:00", "15:30"].map((time) => <div className="week-row" key={time}><div className="time-label">{time}</div>{[0, 1, 2, 3, 4].map((dayIndex) => <div className="calendar-cell" key={`${time}-${dayIndex}`}>{time === "09:00" && dayIndex === 1 && <div className="calendar-event"><strong>Maya Chen</strong>Intake call</div>}{time === "10:30" && dayIndex === 3 && <div className="calendar-event"><strong>Open slot</strong>Available</div>}{time === "12:00" && dayIndex === 1 && <div className="calendar-event amber"><strong>Focus block</strong>Held</div>}{time === "14:00" && dayIndex === 1 && <div className="calendar-event"><strong>Jon Bell</strong>Follow-up</div>}{time === "15:30" && dayIndex === 4 && <div className="calendar-event"><strong>Open slot</strong>Available</div>}</div>)}</div>)}
          </div>
        </div>
        <div>
          <div className="panel"><div className="panel-head"><div><h2 className="panel-title">Tuesday, 14 May</h2><p className="panel-subtitle">4 appointments · 1 held block</p></div><StatusPill>Healthy</StatusPill></div><div className="panel-body"><div className="schedule-list">{appointments.map((appointment) => <div className="schedule-row" key={appointment.time}><div className="time"><strong>{appointment.time}</strong></div><div className="schedule-info"><strong>{appointment.name}</strong><span>{appointment.service}</span></div><StatusPill tone={appointment.color as "mint" | "amber" | "blue"}>{appointment.color === "amber" ? "Hold" : "Confirmed"}</StatusPill></div>)}</div></div></div>
          <div className="panel"><div className="panel-head"><div><h2 className="panel-title">Availability safety</h2><p className="panel-subtitle">What happens when hours change.</p></div><ShieldCheck size={15} color="#0e7c6b" /></div><div className="panel-body"><p style={{ margin: 0, color: "#58736f", fontSize: 11, lineHeight: 1.55 }}>Existing appointments are never moved silently. Affected customers receive valid alternatives and choose what happens next.</p><button className="btn btn-primary btn-small" style={{ marginTop: 14 }} onClick={() => setShowChange(true)}>Propose a change <ArrowUpRight size={12} /></button></div></div>
        </div>
      </div>
      {showChange && <div className="modal-backdrop" onClick={() => setShowChange(false)}><div className="modal" onClick={(event) => event.stopPropagation()}><div className="modal-head"><div><h2>Propose a schedule change</h2><p>Maya’s Tuesday appointment stays in place until she confirms an alternative.</p></div><button className="icon-button" onClick={() => setShowChange(false)}><X size={15} /></button></div><div className="modal-body"><div className="change-banner" style={{ margin: 0 }}><Info size={16} /><div><strong>Customer choice is required</strong>We will notify Maya with the reason and valid replacement times. The original booking remains active until she chooses.</div></div><div style={{ marginTop: 18, fontSize: 11, color: "#78908c", fontWeight: 700 }}>Offer these alternatives</div><div className="choice-grid" style={{ marginTop: 9 }}>{["Wed · 11:00", "Thu · 10:30", "Fri · 15:30"].map((option) => <button key={option} className={`choice ${selectedAlternative === option ? "selected" : ""}`} onClick={() => setSelectedAlternative(option)}>{option}</button>)}</div></div><div className="modal-foot"><button className="btn btn-soft" onClick={() => setShowChange(false)}>Cancel</button><button className="btn btn-primary" disabled={!selectedAlternative} onClick={() => { setShowChange(false); setSelectedAlternative(""); onNotify("Change proposed — Maya will choose a replacement."); }}>Notify customer</button></div></div></div>}
    </>
  );
}

function KnowledgeView({ onNotify }: { onNotify: (message: string) => void }) {
  const [entries, setEntries] = useState(knowledge);
  const [showEditor, setShowEditor] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const addEntry = () => {
    if (!title.trim() || !body.trim()) return;
    setEntries([{ title: title.trim(), body: body.trim(), scope: "Organization-wide", updated: "Added just now" }, ...entries]);
    setTitle("");
    setBody("");
    setShowEditor(false);
    onNotify("Plain-text knowledge added to Northstar Studio.");
  };
  return <div className="panel"><div className="panel-head"><div><h2 className="panel-title">Northstar Studio knowledge</h2><p className="panel-subtitle">Text-only operational guidance · {entries.length} active entries</p></div><div style={{ display: "flex", gap: 8, alignItems: "center" }}><StatusPill>Current</StatusPill><button className="btn btn-primary btn-small" onClick={() => setShowEditor(!showEditor)}><Plus size={12} />New entry</button></div></div>{showEditor && <div style={{ padding: "16px 17px", background: "#f7fbf9", borderBottom: "1px solid #edf2f0" }}><input aria-label="Knowledge title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title, e.g. Parking instructions" style={{ width: "100%", border: "1px solid #dce8e3", borderRadius: 8, padding: "9px 10px", color: "#36565a", fontSize: 11, outline: 0 }} /><textarea aria-label="Knowledge text" value={body} onChange={(event) => setBody(event.target.value)} placeholder="Write the operational answer in plain text…" style={{ width: "100%", minHeight: 72, marginTop: 8, resize: "vertical", border: "1px solid #dce8e3", borderRadius: 8, padding: "9px 10px", color: "#36565a", fontSize: 11, outline: 0 }} /><div style={{ display: "flex", justifyContent: "flex-end", gap: 7, marginTop: 8 }}><button className="btn btn-soft btn-small" onClick={() => setShowEditor(false)}>Cancel</button><button className="btn btn-primary btn-small" disabled={!title.trim() || !body.trim()} onClick={addEntry}>Save text</button></div></div>}<div className="data-list">{entries.map((item) => <div className="data-row" key={item.title}><div className="kpi-icon"><FileText size={14} /></div><div className="data-main"><strong>{item.title}</strong><p>{item.body}</p><div className="meta-line"><span className="scope">{item.scope}</span><span>{item.updated}</span></div></div><button className="icon-button" onClick={() => onNotify(`Editing “${item.title}” is ready for this demo.`)}><MoreHorizontal size={15} /></button></div>)}</div><div style={{ padding: "15px 17px", borderTop: "1px solid #edf2f0", color: "#8aa09b", fontSize: 10 }}><Info size={12} style={{ verticalAlign: "-2px", marginRight: 5 }} />Knowledge is entered as plain text. Files, archives, and external repository ingestion are not part of this workspace.</div></div>;
}

function ChannelsView({ onNotify }: { onNotify: (message: string) => void }) {
  const channels = [
    { key: "whatsapp", name: "WhatsApp Business", letter: "W", state: "Connected", tone: "mint", body: "Northstar Front Desk · 1,284 contacts" },
    { key: "telegram", name: "Telegram", letter: "T", state: "Connected", tone: "mint", body: "@northstar_frontdesk · 436 contacts" },
    { key: "discord", name: "Discord", letter: "D", state: "Needs permission", tone: "amber", body: "#front-desk · mentions only" },
  ];
  return <><div className="channel-grid">{channels.map((channel) => <div className="channel-card" key={channel.key}><div className={`channel-icon ${channel.key}`}>{channel.letter}</div><strong>{channel.name}</strong><p>{channel.body}</p><div className="channel-foot"><StatusPill tone={channel.tone as "mint" | "amber"}>{channel.state}</StatusPill><button className="panel-link" onClick={() => onNotify(channel.state === "Connected" ? `${channel.name} settings opened.` : `Permission checklist opened for ${channel.name}.`)}>Manage</button></div></div>)}</div><div className="panel"><div className="panel-head"><div><h2 className="panel-title">Interaction rules</h2><p className="panel-subtitle">The same front desk, adapted to each channel’s native capabilities.</p></div><ShieldCheck size={15} color="#0e7c6b" /></div><div className="data-list"><div className="data-row"><MessageCircle size={16} color="#0e7c6b" /><div className="data-main"><strong>Direct conversations</strong><p>Customers can message the channel identity directly. Verified identity and customer scope stay inside Northstar Studio.</p></div><StatusPill>Active</StatusPill></div><div className="data-row"><Users size={16} color="#0e7c6b" /><div className="data-main"><strong>Groups, rooms, and mentions</strong><p>The front desk only processes messages delivered under each integration’s configured rules. Unrelated messages are not treated as requests by default.</p></div><StatusPill tone="blue">Native</StatusPill></div><div className="data-row"><Bell size={16} color="#0e7c6b" /><div className="data-main"><strong>Outbound reminders</strong><p>Proactive messages depend on channel permissions and policy. Every appointment record remains authoritative in the app.</p></div><StatusPill tone="amber">Review</StatusPill></div></div></div></>;
}

function SettingsView({ onNotify }: { onNotify: (message: string) => void }) {
  const [reminders, setReminders] = useState(true);
  const [confirmations, setConfirmations] = useState(true);
  const [followUps, setFollowUps] = useState(false);
  const rows = [
    { label: "Appointment reminders", body: "Send 1 day and 20 minutes before the appointment.", value: reminders, set: setReminders },
    { label: "Attendance confirmation", body: "Ask customers to confirm before the reminder window.", value: confirmations, set: setConfirmations },
    { label: "Routine follow-up", body: "Offer provider-recommended follow-ups after 3 or 6 months.", value: followUps, set: setFollowUps },
  ];
  return <div className="settings-grid"><div className="panel"><div className="panel-head"><div><h2 className="panel-title">Notification defaults</h2><p className="panel-subtitle">Applied to new appointments only.</p></div><Bell size={15} color="#0e7c6b" /></div>{rows.map((row) => <div className="setting-row" key={row.label}><div><strong>{row.label}</strong><p>{row.body}</p></div><button className={`toggle ${row.value ? "on" : ""}`} onClick={() => row.set(!row.value)} aria-label={`Toggle ${row.label}`} /></div>)}</div><div className="panel"><div className="panel-head"><div><h2 className="panel-title">Escalation defaults</h2><p className="panel-subtitle">Make handoffs concise and actionable.</p></div><Headphones size={15} color="#0e7c6b" /></div><div className="setting-row"><div><strong>Include conversation summary</strong><p>Give staff the original question and the latest context.</p></div><button className="toggle on" aria-label="Summary enabled" /></div><div className="setting-row"><div><strong>Urgent incident route</strong><p>Show official emergency contact guidance without promising a response time.</p></div><StatusPill tone="amber">Configured</StatusPill></div><div className="setting-row"><div><strong>Provider team</strong><p>Alex Morgan · owner<br />Sam Lee · staff</p></div><button className="btn btn-soft btn-small" onClick={() => onNotify("Team access is scoped to this provider account.")}>Manage</button></div></div></div>;
}

function CustomerView({ onExit, onNotify }: { onExit: () => void; onNotify: (message: string) => void }) {
  const [selected, setSelected] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [customerDraft, setCustomerDraft] = useState("");
  const [customerSent, setCustomerSent] = useState("");
  const sendCustomerMessage = () => {
    if (!customerDraft.trim()) return;
    setCustomerSent(customerDraft.trim());
    setCustomerDraft("");
    onNotify("Customer message added to the conversation.");
  };
  return <div className="customer-shell"><div className="customer-frame animate-enter"><div className="customer-top"><button className="icon-button" style={{ background: "rgba(255,255,255,.08)", borderColor: "rgba(255,255,255,.12)", color: "#e7f9f2" }} onClick={onExit}><ArrowLeft size={14} /></button><div className="brand-mark" style={{ transform: "scale(.8)", marginLeft: -3 }}><span /></div><div><strong>Northstar Front Desk</strong><span><span className="live-dot" style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: "#66d5b0", marginRight: 4 }} />Usually replies instantly</span></div><span className="online" /></div><div className="customer-messages"><div className="customer-date">Today · Tuesday, 14 May</div><div className="customer-msg">Hi Maya — I’m the Northstar front desk. I can help with your appointment and pass anything uncertain to the team.</div><div className="customer-msg reply">Hi! I’m looking to book an intake call next week. Do you have a quiet room for it?</div><div className="customer-msg">I’m checking on the room detail with the team now. I won’t guess, and you won’t need to repeat the question. In the meantime, here are the available intake slots.</div><div className="customer-booking"><div className="customer-booking-label"><span><CalendarDays size={11} style={{ verticalAlign: "-2px", marginRight: 4 }} />Appointment options</span>{confirmed ? <StatusPill>Confirmed</StatusPill> : <span>Choose one</span>}</div><h3>Intake call · 45 min</h3><p>Northstar Studio · Your choice is required before anything moves.</p>{confirmed ? <div style={{ padding: "10px 9px", background: "#e2f7ed", borderRadius: 7, color: "#207662", fontSize: 10, lineHeight: 1.45 }}><CheckCircle2 size={13} style={{ verticalAlign: "-3px", marginRight: 5 }} />Confirmed for <strong>{selected}</strong>. We’ll send a reminder the day before.</div> : <div className="choice-grid">{["Wed · 11:00", "Thu · 10:30", "Fri · 15:30"].map((option) => <button key={option} className={`choice ${selected === option ? "selected" : ""}`} onClick={() => setSelected(option)}>{option}</button>)}</div>}{!confirmed && selected && <button className="btn btn-primary" style={{ width: "100%", marginTop: 8 }} onClick={() => { setConfirmed(true); onNotify("Customer selected a replacement time."); }}>Confirm {selected}</button>}</div>{customerSent && <div className="customer-msg reply">{customerSent}</div>}<div className="customer-msg">If you need a person, just say “human”. I’ll route it with a short summary.</div></div><div className="customer-compose"><input aria-label="Customer message" value={customerDraft} onChange={(event) => setCustomerDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") sendCustomerMessage(); }} placeholder="Write a message…" /><button className="icon-button" onClick={sendCustomerMessage}><Send size={14} /></button></div></div></div>;
}

export default function Home() {
  const [view, setView] = useState<View>("overview");
  const [mode, setMode] = useState<Mode>("provider");
  const [toast, setToast] = useState("");
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2400); };
  const createAction = () => {
    const messages: Record<View, string> = { overview: "Broadcast draft opened — no message has been sent.", inbox: "Broadcast draft opened — audience is required before sending.", calendar: "Hours editor opened — existing bookings will stay protected.", knowledge: "New text-only knowledge entry opened.", channels: "Channel connection checklist opened.", settings: "Settings saved for this demo workspace." };
    notify(messages[view]);
  };
  if (mode === "customer") return <><CustomerView onExit={() => setMode("provider")} onNotify={notify} />{toast && <div className="toast-note">{toast}</div>}</>;
  const ActiveView = view === "overview" ? <Overview onNavigate={setView} onNotify={notify} /> : view === "inbox" ? <InboxView onNotify={notify} /> : view === "calendar" ? <CalendarView onNotify={notify} /> : view === "knowledge" ? <KnowledgeView onNotify={notify} /> : view === "channels" ? <ChannelsView onNotify={notify} /> : <SettingsView onNotify={notify} />;
  return <div className="app-shell"><aside className="sidebar"><div className="brand"><div className="brand-mark"><span /></div><div className="brand-copy"><div className="brand-name">frontdesk</div><div className="brand-kicker">Northstar Studio</div></div></div><div><div className="nav-label">Workspace</div><nav className="nav">{navItems.map((item) => { const Icon = item.icon; return <button className={`nav-button ${view === item.id ? "active" : ""}`} key={item.id} onClick={() => setView(item.id)}><Icon size={16} /><span>{item.label}</span>{item.id === "inbox" && <span style={{ marginLeft: "auto", fontSize: 10, color: "#66d5b0" }}>7</span>}</button>; })}</nav></div><div><div className="nav-label">Workspace</div><nav className="nav"><button className={`nav-button ${view === "settings" ? "active" : ""}`} onClick={() => setView("settings")}><Settings2 size={16} /><span>Settings</span></button></nav></div><div className="sidebar-spacer" /><div className="sidebar-plan"><strong>Demo workspace</strong><p>Mock data only. Connect channels and add auth before production use.</p></div><div className="sidebar-user"><Avatar initials="AM" tone="staff" /><div className="sidebar-user-copy"><div className="sidebar-user-name">Alex Morgan</div><div className="sidebar-user-role">Workspace owner</div></div></div></aside><main className="main"><header className="topbar"><div className="breadcrumb"><span>Northstar Studio</span><ChevronRight size={13} /><strong>{view === "overview" ? "Overview" : view[0].toUpperCase() + view.slice(1)}</strong></div><div className="topbar-actions"><div className="demo-switch"><button className="active">Provider view</button><button onClick={() => setMode("customer")}>Customer preview</button></div><button className="icon-button" onClick={() => notify("No new notifications.")}><Bell size={15} /></button><Avatar initials="AM" tone="staff" /></div></header><div className="content"><PageHeading view={view} onCreate={createAction} />{view !== "overview" && view !== "inbox" && view !== "calendar" && view !== "knowledge" && view !== "channels" && view !== "settings" ? null : ActiveView}</div></main>{toast && <div className="toast-note">{toast}</div>}</div>;
}
