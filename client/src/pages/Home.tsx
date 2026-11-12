import {
  Activity,
  AlertTriangle,
  Archive,
  ArrowRight,
  BookOpen,
  Bot,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Code2,
  ExternalLink,
  FileCode2,
  FileJson,
  GitBranch,
  Github,
  Hash,
  Inbox,
  Link2,
  ListChecks,
  MessageSquare,
  MoreHorizontal,
  Radio,
  RefreshCw,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  UserCheck,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

type View = "overview" | "discord" | "projects" | "contributors" | "automation" | "audit";
type Mode = "operator" | "discord";
type Tone = "green" | "blue" | "gold" | "red" | "gray";

type Thread = {
  id: number;
  channel: string;
  question: string;
  requester: string;
  initials: string;
  repo: string;
  route: string;
  confidence: number;
  docs: string[];
  status: "needs-review" | "answered" | "gap";
  time: string;
  messages: { author: string; initials: string; bot?: boolean; time: string; text: string }[];
};

const threads: Thread[] = [
  {
    id: 1,
    channel: "gsoc-2026",
    question: "How do I get started with Resonate?",
    requester: "Ananya Rao",
    initials: "AR",
    repo: "Resonate",
    route: "AOSSIE-Org/Resonate",
    confidence: 96,
    docs: ["README.md", "CONTRIBUTING.md"],
    status: "needs-review",
    time: "8 min ago",
    messages: [
      { author: "Ananya Rao", initials: "AR", time: "10:24", text: "Hey! I want to help with Resonate for GSoC. What should I set up first, and where do new contributors usually start?" },
      { author: "AOSSIE Agent", initials: "AI", bot: true, time: "10:25", text: "I routed this to Resonate and found a contributor path in the repository docs. I’m checking the exact setup steps before I answer." },
    ],
  },
  {
    id: 2,
    channel: "landing-pages",
    question: "Where should I put a new landing page?",
    requester: "Miguel Santos",
    initials: "MS",
    repo: "Resonate-Website",
    route: "AOSSIE-Org/Resonate-Website",
    confidence: 89,
    docs: ["CONTRIBUTING.md", "README.md"],
    status: "answered",
    time: "23 min ago",
    messages: [
      { author: "Miguel Santos", initials: "MS", time: "10:09", text: "Should a new project landing page go in the website repo or the project repo?" },
      { author: "AOSSIE Agent", initials: "AI", bot: true, time: "10:10", text: "For AOSSIE website contributions, start in the Website repository and coordinate in #landing-pages. I linked the contributing guide below." },
    ],
  },
  {
    id: 3,
    channel: "skillbot",
    question: "Can Skill Bot run without an API key?",
    requester: "Kiran Patel",
    initials: "KP",
    repo: "SkillBot",
    route: "AOSSIE-Org/SkillBot",
    confidence: 98,
    docs: ["README.md", "repo_metadata.py"],
    status: "answered",
    time: "1 hr ago",
    messages: [
      { author: "Kiran Patel", initials: "KP", time: "09:18", text: "Can Skill Bot run without an API key? I’m trying to test it locally." },
      { author: "AOSSIE Agent", initials: "AI", bot: true, time: "09:19", text: "Yes. Skill Bot uses a local Ollama model, so it has no API fees or rate limits. You’ll still need a Discord token and a local model pulled in Ollama." },
    ],
  },
  {
    id: 4,
    channel: "general",
    question: "Is there a project for verifiable local models?",
    requester: "Riley Chen",
    initials: "RC",
    repo: "OpenVerifiableLLM",
    route: "AOSSIE-Org/OpenVerifiableLLM",
    confidence: 83,
    docs: ["README.md"],
    status: "gap",
    time: "Yesterday",
    messages: [
      { author: "Riley Chen", initials: "RC", time: "Yesterday", text: "Is there an AOSSIE project focused on local, open-weight, verifiable LLMs?" },
      { author: "AOSSIE Agent", initials: "AI", bot: true, time: "Yesterday", text: "I found a likely project route, but the current repository docs don’t explain its contributor path well enough to answer confidently." },
    ],
  },
];

const projects = [
  { name: "SkillBot", repo: "AOSSIE-Org/SkillBot", description: "Local Discord assistant that answers contributor questions from repository docs.", language: "Python", docs: 11, questions: 26, health: "green" as Tone, icon: Bot },
  { name: "Gitcord", repo: "AOSSIE-Org/Gitcord-GithubDiscordBot", description: "Offline-first Discord ↔ GitHub automation with audit-first plans and safe writes.", language: "Python", docs: 18, questions: 19, health: "green" as Tone, icon: GitBranch },
  { name: "Resonate", repo: "AOSSIE-Org/Resonate", description: "A community project where new contributors often need a clear first path.", language: "Dart", docs: 9, questions: 31, health: "gold" as Tone, icon: Radio },
  { name: "OpenVerifiableLLM", repo: "AOSSIE-Org/OpenVerifiableLLM", description: "Local, open-weight, open-data, verifiable language models.", language: "Python", docs: 6, questions: 14, health: "gold" as Tone, icon: ShieldCheck },
  { name: "BabyNest", repo: "AOSSIE-Org/BabyNest", description: "Pregnancy tracking with personalized insights and on-device assistance.", language: "TypeScript", docs: 13, questions: 8, health: "green" as Tone, icon: Code2 },
  { name: "ThruBox", repo: "AOSSIE-Org/ThruBox-Server", description: "A minimal relay server and client SDK for decentralized communication.", language: "Go", docs: 7, questions: 6, health: "gray" as Tone, icon: TerminalSquare },
];

const contributors = [
  { name: "Ananya Rao", handle: "@ananyarao", initials: "AR", status: "Needs review", role: "Prospective contributor", activity: "Asked about Resonate setup", tone: "gold" as Tone },
  { name: "Miguel Santos", handle: "@miguelsantos", initials: "MS", status: "Verified", role: "Contributor", activity: "Opened Website PR #142", tone: "green" as Tone },
  { name: "Kiran Patel", handle: "@kiranp", initials: "KP", status: "Verified", role: "SkillBot contributor", activity: "Synced docs locally", tone: "green" as Tone },
  { name: "Riley Chen", handle: "@rileychen", initials: "RC", status: "Unlinked", role: "Community member", activity: "Asked in #general", tone: "gray" as Tone },
];

const navItems: { id: View; label: string; icon: typeof Activity }[] = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "discord", label: "Discord inbox", icon: Inbox },
  { id: "projects", label: "Projects", icon: Code2 },
  { id: "contributors", label: "Contributors", icon: Users },
  { id: "automation", label: "Automation", icon: Zap },
  { id: "audit", label: "Audit log", icon: ListChecks },
];

function Status({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return <span className={`status ${tone}`}>{children}</span>;
}

function Initials({ children, bot = false, gold = false }: { children: React.ReactNode; bot?: boolean; gold?: boolean }) {
  return <span className={`message-avatar ${bot ? "bot" : ""} ${gold ? "gold" : ""}`}>{children}</span>;
}

function Metric({ icon: Icon, label, value, foot, tone = "blue" }: { icon: typeof Activity; label: string; value: string; foot: React.ReactNode; tone?: Tone }) {
  return <div className="metric"><div className="metric-top"><span>{label}</span><span className="metric-icon" style={{ color: tone === "green" ? "#3fb950" : tone === "gold" ? "#ffc517" : undefined }}><Icon size={14} /></span></div><div className="metric-value">{value}</div><div className="metric-foot">{foot}</div></div>;
}

function PageHead({ view, onAction }: { view: View; onAction: () => void }) {
  const copy: Record<View, { kicker: string; title: string; sub: string; action: string }> = {
    overview: { kicker: "AOSSIE · community ops", title: "Keep the community moving.", sub: "A reviewable bridge between AOSSIE’s repositories and Discord contributors.", action: "Run dry-run" },
    discord: { kicker: "Discord · AOSSIE server", title: "Answer from the repo, not from memory.", sub: "Route questions, inspect source docs, and hand uncertain work to a mentor.", action: "Refresh threads" },
    projects: { kicker: "Repository registry", title: "Every project has a path in.", sub: "Keep routing context tight so a local model can answer with the smallest useful set of docs.", action: "Sync repositories" },
    contributors: { kicker: "Identity & mentorship", title: "Make the human graph visible.", sub: "Link Discord identities to GitHub activity without guessing who is who.", action: "Review links" },
    automation: { kicker: "Gitcord-style automation", title: "Dry-run first. Apply only with evidence.", sub: "A deterministic pipeline for Discord and GitHub state, with every write behind an explicit gate.", action: "Run audit" },
    audit: { kicker: "Reports & documentation gaps", title: "A clean audit is a feature.", sub: "See what the agent read, planned, reported, and still could not answer.", action: "Export report" },
  };
  const item = copy[view];
  return <div className="page-head"><div><div className="kicker">{item.kicker}</div><h1>{item.title}</h1><p>{item.sub}</p></div><div className="head-actions"><button className="btn btn-ghost" onClick={onAction}><RefreshCw size={13} />{item.action}</button></div></div>;
}

function Sidebar({ view, setView, onDiscordPreview }: { view: View; setView: (view: View) => void; onDiscordPreview: () => void }) {
  return <><aside className="server-rail"><button className="server-icon active" title="AOSSIE">AO</button><div className="server-divider" /><button className="server-icon" title="Discord preview" onClick={onDiscordPreview}><MessageSquare size={18} /></button><button className="server-icon" title="GitHub"><Github size={18} /></button><button className="server-icon server-plus" title="Add server">+</button></aside><aside className="side-panel"><div className="org-head"><div className="org-mark">AO</div><div><div className="org-name">AOSSIE</div><span className="org-subtitle">community operations</span></div><ChevronRight size={14} color="#6e7681" style={{ marginLeft: "auto" }} /></div><div className="side-scroll"><div className="side-label">Community</div><nav className="side-nav">{navItems.slice(0, 4).map((item) => { const Icon = item.icon; return <button key={item.id} className={view === item.id ? "active" : ""} onClick={() => setView(item.id)}><Icon size={14} /><span>{item.label}</span>{item.id === "discord" && <span className="side-count">4</span>}</button>; })}</nav><div className="side-label">Operations</div><nav className="side-nav">{navItems.slice(4).map((item) => { const Icon = item.icon; return <button key={item.id} className={view === item.id ? "active" : ""} onClick={() => setView(item.id)}><Icon size={14} /><span>{item.label}</span></button>; })}</nav><div className="side-label">Channels</div><div className="channel-group"><button className="channel-row active" onClick={() => setView("discord")}><span className="hash">#</span>gsoc-2026<small>2</small></button><button className="channel-row" onClick={() => setView("discord")}><span className="hash">#</span>landing-pages</button><button className="channel-row" onClick={() => setView("discord")}><span className="hash">#</span>skillbot<small>1</small></button><button className="channel-row" onClick={() => setView("discord")}><span className="hash">#</span>general</button></div></div><div className="side-bottom"><div className="safe-mini"><strong><span className="pulse-green" style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#3fb950", marginRight: 5 }} />Observer mode</strong>Reads Discord and GitHub state. No writes are enabled.</div><div className="operator"><div className="operator-avatar">AM</div><div><strong>Alex Morgan</strong><span>maintainer · operator</span></div><MoreHorizontal size={14} color="#6e7681" style={{ marginLeft: "auto" }} /></div></div></aside></>;
}

function Overview({ setView, notify }: { setView: (view: View) => void; notify: (message: string) => void }) {
  return <><div className="metric-grid"><Metric icon={MessageSquare} label="Open Discord threads" value="04" foot={<><strong>2 need mentor review</strong></>} tone="gold" /><Metric icon={BookOpen} label="Docs indexed" value="64" foot={<><strong>6 projects</strong> in this workspace</>} tone="green" /><Metric icon={UserCheck} label="Verified contributors" value="128" foot={<><strong>+9 this week</strong></>} tone="green" /><Metric icon={ShieldCheck} label="Safe-mode coverage" value="100%" foot={<><strong>0 writes</strong> without review</>} /></div><div className="overview-grid"><div><div className="panel"><div className="panel-head"><div><h2 className="panel-title">Needs attention</h2><p className="panel-sub">Questions the agent cannot confidently close alone.</p></div><Status tone="gold">4 open</Status></div>{threads.filter((thread) => thread.status !== "answered").map((thread) => <button className="attention-row" key={thread.id} onClick={() => setView("discord")} style={{ width: "100%", border: 0, background: "transparent", textAlign: "left" }}><span className="thread-icon"><Hash size={15} /></span><span className="row-copy"><span className="row-top"><strong>{thread.question}</strong><time>{thread.time}</time></span><p><strong>{thread.requester}</strong> in #{thread.channel} · {thread.status === "gap" ? "docs gap" : "mentor review"}</p><span className="repo-chip"><GitBranch size={10} />{thread.repo}</span><span className="source-chip">{thread.docs.length} docs matched</span></span><ChevronRight size={14} color="#6e7681" /></button>)}</div><div className="panel"><div className="panel-head"><div><h2 className="panel-title">Routing health</h2><p className="panel-sub">Small context windows, better answers.</p></div><button className="panel-link" onClick={() => setView("projects")}>View projects</button></div><div className="panel-body"><div className="pipeline-mini"><div className="pipeline-step done"><strong>Route</strong><span>6 / 6 ready</span></div><div className="pipeline-step done"><strong>Retrieve</strong><span>64 docs</span></div><div className="pipeline-step done"><strong>Draft</strong><span>local model</span></div><div className="pipeline-step"><strong>Apply</strong><span>locked</span></div></div></div></div></div><div><div className="panel"><div className="panel-head"><div><h2 className="panel-title">Community pulse</h2><p className="panel-sub">AOSSIE activity from the last 24 hours.</p></div><Activity size={14} color="#3fb950" /></div><div className="feed"><div className="feed-item"><span className="feed-dot green" /><div><p><strong>SkillBot</strong> refreshed 11 repository docs locally.</p><small>8 minutes ago · local sync</small></div></div><div className="feed-item"><span className="feed-dot" /><div><p><strong>Miguel Santos</strong> linked GitHub identity and opened PR #142.</p><small>23 minutes ago · #landing-pages</small></div></div><div className="feed-item"><span className="feed-dot gold" /><div><p><strong>OpenVerifiableLLM</strong> generated a new documentation gap.</p><small>Yesterday · #general</small></div></div><div className="feed-item"><span className="feed-dot" /><div><p><strong>GSoC 2026</strong> channel received 17 new questions this week.</p><small>Trend · +18%</small></div></div></div></div><div className="panel"><div className="panel-head"><div><h2 className="panel-title">Safe by default</h2><p className="panel-sub">The agent can plan without mutating.</p></div><ShieldCheck size={14} color="#3fb950" /></div><div className="panel-body"><div className="safe-card"><CheckCircle2 size={16} /><div><strong>Observer mode is active</strong><p>Answers and role changes become reports first. Configure permissions before enabling Apply.</p></div></div><button className="btn btn-ghost btn-small" style={{ marginTop: 11 }} onClick={() => { setView("automation"); notify("Automation controls opened in safe mode."); }}>Inspect pipeline <ArrowRight size={12} /></button></div></div></div></div></>;
}

function DiscordInbox({ notify }: { notify: (message: string) => void }) {
  const [selectedId, setSelectedId] = useState(1);
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState<Record<number, string[]>>({});
  const [escalated, setEscalated] = useState<Record<number, boolean>>({});
  const [gapLogged, setGapLogged] = useState<Record<number, boolean>>({});
  const selected = threads.find((thread) => thread.id === selectedId) ?? threads[0];
  const send = () => { if (!draft.trim()) return; setSent((current) => ({ ...current, [selected.id]: [...(current[selected.id] ?? []), draft.trim()] })); setDraft(""); notify("Draft reply added to the mock Discord thread."); };
  return <div className="panel"><div className="workbench"><div className="workbench-sidebar"><div className="panel-head"><div><h2 className="panel-title">AOSSIE Discord</h2><p className="panel-sub">4 threads need review</p></div><Search size={13} color="#6e7681" /></div>{threads.map((thread) => <button className={`channel-row ${thread.id === selected.id ? "active" : ""}`} key={thread.id} onClick={() => { setSelectedId(thread.id); setDraft(""); }}><span className="hash">#</span><span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{thread.channel}</span>{thread.status === "needs-review" && <small style={{ color: "#ffc517" }}>1</small>}</button>)}</div><div className="thread-main"><div className="thread-head"><div className="thread-title"><Hash size={17} color="#8b949e" /><div><h2>{selected.channel}</h2><span>{selected.question}</span></div></div><div className="thread-actions"><button className="btn btn-ghost btn-small" onClick={() => notify("Thread opened in the Discord preview.")}><ExternalLink size={11} />Open thread</button><button className="icon-btn"><MoreHorizontal size={14} /></button></div></div><div className="thread-body"><div className="message"><Initials>{selected.initials}</Initials><div className="message-copy"><div className="message-meta"><strong>{selected.requester}</strong><time>{selected.time}</time></div><div className="message-text">{selected.messages[0]?.text}</div></div></div>{selected.messages.slice(1).map((message, index) => <div className="message" key={`${message.time}-${index}`}><Initials bot={message.bot}>{message.initials}</Initials><div className="message-copy"><div className="message-meta"><strong>{message.author}</strong><time>{message.time}</time></div><div className="message-text">{message.text}</div>{message.bot && <div className="bot-card"><p>{selected.status === "gap" ? "I can route this to OpenVerifiableLLM, but I found only a README. Would you like a maintainer to confirm the contributor path?" : <>I found the likely repository and selected the smallest useful source set. The response draft is ready for review.</>}</p><div className="bot-card-foot">{selected.docs.map((doc) => <span className="source-chip" key={doc}><FileCode2 size={10} />{doc}</span>)}<Status tone={selected.status === "gap" ? "gold" : "green"}>{selected.status === "gap" ? "needs context" : "source-backed"}</Status></div></div>}</div></div>)}{(sent[selected.id] ?? []).map((reply, index) => <div className="message" key={`sent-${index}`}><Initials gold>AM</Initials><div className="message-copy"><div className="message-meta"><strong>Alex Morgan</strong><time>now</time></div><div className="message-text">{reply}</div></div></div>)}{escalated[selected.id] && <div className="bot-card" style={{ borderLeftColor: "#ffc517" }}><p><strong>Mentor review requested.</strong> The original question, route, and source docs were attached to the audit trail.</p></div>}{gapLogged[selected.id] && <div className="bot-card" style={{ borderLeftColor: "#ffc517" }}><p><strong>Gap logged.</strong> This question is now part of the documentation backlog.</p></div>}</div><div className="composer"><textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={`Reply in #${selected.channel}…`} onKeyDown={(event) => { if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) send(); }} /><div className="composer-foot"><span className="composer-hint">⌘↵ to send · observer mode keeps this local</span><div style={{ display: "flex", gap: 6 }}><button className="btn btn-gold btn-small" onClick={() => { setGapLogged((current) => ({ ...current, [selected.id]: true })); notify("Documentation gap added to audit log."); }}><Archive size={11} />Log gap</button><button className="btn btn-ghost btn-small" onClick={() => { setEscalated((current) => ({ ...current, [selected.id]: true })); notify("Mentor review requested with context attached."); }}><Users size={11} />Escalate</button><button className="btn btn-primary btn-small" onClick={send}><Send size={11} />Reply</button></div></div></div></div><aside className="context-rail"><div className="context-section"><h3 className="context-title">Repository route</h3><div className="context-row"><span>Matched repo</span><strong className="mono">{selected.repo}</strong></div><div className="context-row"><span>Route</span><strong className="mono" style={{ color: "#79c0ff" }}>{selected.route}</strong></div><div className="context-row"><span>Confidence</span><strong>{selected.confidence}%</strong></div><div className="confidence"><span className="confidence-track"><span style={{ width: `${selected.confidence}%` }} /></span><span style={{ color: "#3fb950", font: "9px var(--font-mono)" }}>good</span></div></div><div className="context-section"><h3 className="context-title">Source docs</h3>{selected.docs.map((doc) => <div key={doc} className="source-chip" style={{ display: "flex", margin: "0 0 6px" }}><FileCode2 size={10} />{doc}<Check size={10} color="#3fb950" style={{ marginLeft: "auto" }} /></div>)}</div><div className="context-section"><h3 className="context-title">Contributor</h3><div className="context-row"><span>Discord</span><strong>{selected.requester}</strong></div><div className="context-row"><span>Identity</span><Status tone={selected.id === 4 ? "gray" : "green"}>{selected.id === 4 ? "unlinked" : "verified"}</Status></div><button className="btn btn-ghost btn-small" style={{ width: "100%", marginTop: 7 }} onClick={() => notify("Identity review opened for this contributor.")}><Link2 size={11} />Review identity</button></div><div className="context-section"><div className="gap-box"><strong>{selected.status === "gap" ? "Docs gap detected" : "Audit-first answer"}</strong>{selected.status === "gap" ? "This repository needs a clearer contributor path before the agent can answer confidently." : "Every answer records the repository and docs used so a maintainer can review it."}</div></div></aside></div></div>;
}

function ProjectsView() {
  return <><div className="project-grid">{projects.map((project) => { const Icon = project.icon; return <div className="project-card" key={project.name}><div className="project-top"><div className="project-name"><Icon size={15} /><strong>{project.name}</strong></div><Status tone={project.health}>{project.health === "green" ? "indexed" : project.health === "gold" ? "review" : "partial"}</Status></div><p>{project.description}</p><div className="project-meta"><span><span className="language-dot" style={{ background: project.language === "Python" ? "#3572A5" : project.language === "Dart" ? "#00B4AB" : project.language === "Go" ? "#375eab" : "#f1e05a" }} />{project.language}</span><span>{project.docs} docs</span><span>{project.questions} questions</span></div></div>; })}</div><div className="panel list-panel"><div className="panel-head"><div><h2 className="panel-title">Routing principles</h2><p className="panel-sub">What the agent sends to the local model for each question.</p></div><BookOpen size={14} color="#3fb950" /></div><div className="audit-row"><FileCode2 size={15} /><div><strong>README.md always starts the context</strong><span>Overview and “how do I start?” questions get the first 2,000 characters.</span></div><Status tone="green">active</Status></div><div className="audit-row"><Search size={15} /><div><strong>Question words select matching docs</strong><span>setup → setup.md · contribute → CONTRIBUTING.md · tests → testing.md</span></div><Status tone="blue">deterministic</Status></div><div className="audit-row"><Archive size={15} /><div><strong>Unanswered questions become gap_log.json</strong><span>Documentation gaps are visible work, not silent failures.</span></div><Status tone="gold">reviewable</Status></div></div></>;
}

function ContributorsView({ notify }: { notify: (message: string) => void }) {
  return <><div className="metric-grid"><Metric icon={UserCheck} label="Verified links" value="128" foot={<><strong>92%</strong> of active members</>} tone="green" /><Metric icon={Link2} label="Needs review" value="09" foot={<><strong>3 stale</strong> links</>} tone="gold" /><Metric icon={Users} label="Mentors" value="24" foot={<><strong>6 active</strong> this week</>} tone="blue" /><Metric icon={Github} label="GitHub events" value="42" foot={<><strong>+14%</strong> this week</>} /></div><div className="panel list-panel"><div className="panel-head"><div><h2 className="panel-title">Contributor identity links</h2><p className="panel-sub">A Discord name alone is never enough to merge records.</p></div><button className="panel-link" onClick={() => notify("Identity-link review queue opened.")}>Review queue <ArrowRight size={11} style={{ verticalAlign: "-2px" }} /></button></div>{contributors.map((person) => <div className="list-row" key={person.name}><div className="list-avatar" style={{ background: person.tone === "gold" ? "#f6c344" : person.tone === "green" ? "#238636" : "#30363d", color: person.tone === "gold" ? "#352600" : "#fff" }}>{person.initials}</div><div className="list-main"><strong>{person.name} <span style={{ color: "#6e7681", font: "10px var(--font-mono)", fontWeight: 400 }}>{person.handle}</span></strong><p>{person.activity}</p><div className="list-meta"><span>{person.role}</span><span>last seen {person.name === "Ananya Rao" ? "8m" : person.name === "Riley Chen" ? "yesterday" : "23m"} ago</span></div></div><Status tone={person.tone}>{person.status}</Status><button className="icon-btn" onClick={() => notify(`${person.name} profile opened.`)}><MoreHorizontal size={14} /></button></div>)}</div></>;
}

function AutomationView({ notify }: { notify: (message: string) => void }) {
  const [mode, setMode] = useState<"dry-run" | "observer" | "active">("observer");
  const [running, setRunning] = useState(false);
  const run = () => { setRunning(true); window.setTimeout(() => { setRunning(false); notify("Audit complete — 4 threads reviewed, 0 writes applied."); }, 700); };
  return <div className="automation-grid"><div><div className="panel"><div className="panel-head"><div><h2 className="panel-title">Execution mode</h2><p className="panel-sub">The default is safe. Mutations need an explicit, permission-aware mode.</p></div><Status tone={mode === "active" ? "red" : "green"}>{mode === "active" ? "writes possible" : "no writes"}</Status></div><div className="panel-body"><div className="mode-cards">{(["dry-run", "observer", "active"] as const).map((item) => <button className={`mode-card ${mode === item ? "selected" : ""}`} key={item} onClick={() => item !== "active" && setMode(item)}><h3>{item === "dry-run" ? "Dry-run" : item === "observer" ? "Observer" : "Active"}</h3><p>{item === "dry-run" ? "Plan from a snapshot and produce a report." : item === "observer" ? "Read Discord/GitHub state without mutation." : "Apply approved writes when permissions are configured."}</p><Status tone={item === "active" ? "red" : item === mode ? "blue" : "gray"}>{item === "active" ? "locked" : item === mode ? "selected" : "available"}</Status></button>)}</div><div style={{ marginTop: 15, display: "flex", justifyContent: "space-between", alignItems: "center" }}><span className="composer-hint">Current scope: AOSSIE-Org · 6 repositories · 4 threads</span><button className="btn btn-primary" onClick={run} disabled={running}>{running ? <><RefreshCw size={12} className="animate-spin" />Running…</> : <><TerminalSquare size={12} />Run {mode === "observer" ? "observer" : "dry-run"}</>}</button></div></div></div><div className="panel"><div className="panel-head"><div><h2 className="panel-title">Read → Plan → Report → Apply</h2><p className="panel-sub">The apply stage is intentionally separated from planning.</p></div></div><div className="panel-body"><div className="pipeline-mini"><div className="pipeline-step done"><strong>Read</strong><span>Discord + GitHub</span></div><div className="pipeline-step done"><strong>Plan</strong><span>deterministic</span></div><div className="pipeline-step done"><strong>Report</strong><span>JSON + MD</span></div><div className="pipeline-step"><strong>Apply</strong><span>permission gate</span></div></div></div></div></div><div><div className="panel"><div className="panel-head"><div><h2 className="panel-title">Latest audit snapshot</h2><p className="panel-sub">run-2026-11-12-1042</p></div><FileJson size={14} color="#79c0ff" /></div><div className="panel-body"><div className="audit-code"><span className="key">"mode"</span>: <span className="string">"observer"</span>,<br /><span className="key">"repositories_read"</span>: <span className="gold">6</span>,<br /><span className="key">"threads_routed"</span>: <span className="gold">4</span>,<br /><span className="key">"mentor_reviews"</span>: <span className="gold">2</span>,<br /><span className="key">"writes_applied"</span>: <span className="good">0</span>,<br /><span className="key">"gaps_logged"</span>: <span className="gold">1</span></div><button className="btn btn-ghost btn-small" style={{ width: "100%", marginTop: 10 }} onClick={() => notify("Markdown report opened in read-only mode.")}><FileCode2 size={11} />Open audit.md</button></div></div><div className="panel"><div className="panel-head"><div><h2 className="panel-title">Mutation gate</h2><p className="panel-sub">Active mode requires more than a toggle.</p></div><ShieldCheck size={14} color="#ffc517" /></div><div className="panel-body"><div className="gap-box"><strong>Locked</strong>GitHub write scope, Discord role permissions, and an approved audit report are required before Apply can be enabled.</div></div></div></div></div>;
}

function AuditView({ notify }: { notify: (message: string) => void }) {
  const reports = [
    { id: "run-1042", title: "Observer sync · 12 Nov", detail: "4 threads · 6 repos · 1 gap", status: "Complete", tone: "green" as Tone },
    { id: "run-0920", title: "Dry-run · 11 Nov", detail: "3 threads · 0 writes · 2 reviews", status: "Complete", tone: "green" as Tone },
    { id: "gap-017", title: "Documentation gap · OpenVerifiableLLM", detail: "No contributor path in indexed docs", status: "Open", tone: "gold" as Tone },
    { id: "link-031", title: "Identity review · Riley Chen", detail: "Discord ↔ GitHub link is unverified", status: "Pending", tone: "gray" as Tone },
  ];
  return <div className="panel"><div className="panel-head"><div><h2 className="panel-title">Reports and gaps</h2><p className="panel-sub">Every run leaves a readable trail for maintainers and mentors.</p></div><button className="btn btn-ghost btn-small" onClick={() => notify("Report export prepared locally.")}><FileCode2 size={11} />Export Markdown</button></div>{reports.map((report) => <div className="audit-row" key={report.id}><div style={{ width: 28, height: 28, borderRadius: 5, background: "#21262d", display: "grid", placeItems: "center" }}>{report.id.startsWith("gap") ? <AlertTriangle size={14} color="#ffc517" /> : report.id.startsWith("link") ? <Link2 size={14} color="#8b949e" /> : <FileJson size={14} color="#79c0ff" />}</div><div style={{ flex: 1 }}><strong>{report.title}</strong><span>{report.id} · {report.detail}</span></div><Status tone={report.tone}>{report.status}</Status><button className="icon-btn" onClick={() => notify(`${report.title} opened in read-only mode.`)}><ArrowRight size={13} /></button></div>)}</div>;
}

function DiscordPreview({ onExit }: { onExit: () => void }) {
  return <div className="discord-preview"><button className="btn btn-ghost preview-exit" onClick={onExit}><X size={12} />Exit preview</button><div className="preview-rail"><div className="preview-server">AO</div></div><div className="preview-channels"><strong>AOSSIE</strong><div>⌄ COMMUNITY</div><div className="active"># gsoc-2026</div><div># landing-pages</div><div># skillbot</div><div># general</div><div style={{ marginTop: 15 }}>⌄ VOICE</div><div>◉ contributors</div></div><div className="preview-chat"><div className="preview-chat-head"><Hash size={17} color="#b5bac1" /><strong>gsoc-2026</strong><span>Questions and mentorship</span></div><div className="preview-chat-body"><h2>Welcome to #gsoc-2026</h2><p>Keep project questions scoped, searchable, and kind.</p><div className="discord-message"><div className="discord-avatar user">AR</div><div><strong>Ananya Rao</strong><time>Today at 10:24</time><p>How do I get started with Resonate for GSoC?</p></div></div><div className="discord-message"><div className="discord-avatar">AO</div><div><strong>AOSSIE Agent <span style={{ padding: "2px 4px", borderRadius: 3, background: "#5865f2", color: "#fff", fontSize: 8 }}>BOT</span></strong><time>Today at 10:25</time><p>I found a likely path in the Resonate repository. Before I answer, I’m checking the project’s contributor guide so I don’t send you to the wrong place.</p><div className="discord-embed"><p><strong>Source-backed draft</strong><br />Start with the repository README, then follow <span style={{ color: "#00aff4" }}>CONTRIBUTING.md</span> for local setup and the current contributor channel. If you tell me whether you’re working on the app or documentation, I can narrow the next step.</p><div style={{ marginTop: 8 }}><span className="source-chip"><FileCode2 size={10} />Resonate/README.md</span><span className="source-chip"><FileCode2 size={10} />CONTRIBUTING.md</span></div></div></div></div></div></div><div className="preview-side"><h3>Thread context</h3><p>Repository</p><span className="source-chip" style={{ display: "flex" }}><GitBranch size={10} />AOSSIE-Org/Resonate</span><p style={{ marginTop: 17 }}>Agent behavior</p><p style={{ marginTop: 5 }}>Routes first. Retrieves only matching docs. Asks a clarifying question when confidence is not enough.</p><p style={{ marginTop: 17 }}>Mode</p><Status tone="green">observer · no writes</Status></div></div>;
}

export default function Home() {
  const [view, setView] = useState<View>("overview");
  const [mode, setMode] = useState<Mode>("operator");
  const [toast, setToast] = useState("");
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2400); };
  const action = () => { const messages: Record<View, string> = { overview: "Observer audit started — no writes enabled.", discord: "Discord thread state refreshed locally.", projects: "Repository metadata refresh queued locally.", contributors: "Identity review queue opened.", automation: "Audit run prepared in observer mode.", audit: "Read-only report export prepared." }; notify(messages[view]); };
  if (mode === "discord") return <><DiscordPreview onExit={() => setMode("operator")} />{toast && <div className="toast">{toast}</div>}</>;
  const content = view === "overview" ? <Overview setView={setView} notify={notify} /> : view === "discord" ? <DiscordInbox notify={notify} /> : view === "projects" ? <ProjectsView /> : view === "contributors" ? <ContributorsView notify={notify} /> : view === "automation" ? <AutomationView notify={notify} /> : <AuditView notify={notify} />;
  return <div className="app-shell"><Sidebar view={view} setView={setView} onDiscordPreview={() => setMode("discord")} /><main className="main"><header className="topbar"><div className="crumb"><span>AOSSIE</span><ChevronRight size={13} /><strong>{view === "overview" ? "Community Ops" : view === "discord" ? "Discord inbox" : view === "projects" ? "Projects" : view === "contributors" ? "Contributors" : view === "automation" ? "Automation" : "Audit log"}</strong>{view === "discord" && <><ChevronRight size={13} /><code>#gsoc-2026</code></>}</div><div className="top-actions"><div className="mode-switch"><button className="active">Operator</button><button onClick={() => setMode("discord")}>Discord preview</button></div><a className="github-btn" href="https://github.com/AOSSIE-Org" target="_blank" rel="noreferrer"><Github size={13} />AOSSIE-Org</a><button className="icon-btn" onClick={() => notify("No new operator notifications.")}><MessageSquare size={14} /></button><div className="operator-avatar">AM</div></div></header><div className="content"><PageHead view={view} onAction={action} />{content}</div></main>{toast && <div className="toast">{toast}</div>}</div>;
}
