"use client";

import { useMemo, useState } from "react";

type Folder = "Inbox" | "Starred" | "Sent" | "Drafts" | "Scheduled" | "Archive" | "Spam" | "Trash";
type WindowView = "compose" | "preview" | "mailbox" | "settings";

type FakeMail = {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  body?: string;
  folder: Folder;
  unread?: boolean;
  starred?: boolean;
  date: string;
};

type TemplatePreset = {
  id: string;
  label: string;
  subject: string;
  body: string;
  to?: string;
};

const seedMailbox: FakeMail[] = [
  {
    id: 1,
    sender: "Design Team",
    subject: "Moodboard feedback for campaign",
    preview: "Can you review the layout options before 4pm?",
    body: "Hey Alex,\n\nCould you review the 3 moodboard options before 4pm?\n\nThanks!",
    folder: "Inbox",
    unread: true,
    starred: true,
    date: "09:20",
  },
  {
    id: 2,
    sender: "Newsletter",
    subject: "Weekly product updates",
    preview: "We shipped rich text support and new automation rules.",
    body: "This week: rich text, automations and shared snippets were released.",
    folder: "Inbox",
    date: "08:11",
  },
  {
    id: 3,
    sender: "You",
    subject: "Proposal deck attached",
    preview: "Thanks for your time today, attached is the deck.",
    folder: "Sent",
    date: "Yesterday",
  },
  {
    id: 4,
    sender: "You",
    subject: "Draft: Client follow-up",
    preview: "Hello team, sharing the next sprint timeline...",
    folder: "Drafts",
    date: "Yesterday",
  },
];

const folderList: Folder[] = ["Inbox", "Starred", "Sent", "Drafts", "Scheduled", "Archive", "Spam", "Trash"];

const signatures = ["Best regards,\nAlex", "Cheers,\nAlex — Product Design", "Thanks,\nAlex\nSIDLEE"];

const templatePresets: TemplatePreset[] = [
  {
    id: "",
    label: "None",
    subject: "",
    body: "",
  },
  {
    id: "follow-up",
    label: "Follow-up",
    subject: "Quick follow-up on our last discussion",
    body: "Hi,\n\nFollowing up on our previous discussion. Would love your feedback on next steps.\n",
  },
  {
    id: "kickoff",
    label: "Project kick-off",
    subject: "Project kick-off details",
    body: "Hello team,\n\nExcited to start! Sharing scope, milestones, and ownership in this thread.\n",
    to: "project-team@sidlee.com",
  },
  {
    id: "recap",
    label: "Meeting recap",
    subject: "Recap + action items",
    body: "Hi everyone,\n\nThanks for joining. Here is the recap and action items we agreed on:\n-\n-\n",
  },
  {
    id: "support",
    label: "Customer support reply",
    subject: "Re: Support request update",
    body: "Hi there,\n\nThanks for reaching out. We reproduced the issue and a fix is in progress.\n",
  },
  {
    id: "ooo",
    label: "Out of office",
    subject: "Out of office reply",
    body: "Hi,\n\nThanks for your email. I am currently out of office and will reply when I return.\n",
  },
];

const initialAttachments = ["launch-plan.pdf", "budget.xlsx", "hero-image.png"];

function nowTimeLabel() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function EmailAppSimulator() {
  const [mailbox, setMailbox] = useState<FakeMail[]>(seedMailbox);
  const [activeFolder, setActiveFolder] = useState<Folder>("Inbox");
  const [activeView, setActiveView] = useState<WindowView>("compose");
  const [selectedMailId, setSelectedMailId] = useState<number | null>(seedMailbox[0]?.id ?? null);

  const [to, setTo] = useState("hello@sidlee.com");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("Launching the new campaign");
  const [message, setMessage] = useState("Hi team,\n\nI am sharing the final launch plan.\n\nThanks!");
  const [fromAlias, setFromAlias] = useState("alex@sidlee.com");
  const [replyTo, setReplyTo] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [readReceipt, setReadReceipt] = useState(false);
  const [trackOpens, setTrackOpens] = useState(true);
  const [encrypt, setEncrypt] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [signature, setSignature] = useState(signatures[0]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [attachments, setAttachments] = useState(initialAttachments);
  const [newAttachmentName, setNewAttachmentName] = useState("brief.docx");
  const [toast, setToast] = useState("Open Compose / Preview / Mailbox windows to test the flow.");

  const canSchedule = Boolean(scheduleDate && scheduleTime);

  const filteredMails = useMemo(() => {
    if (activeFolder === "Starred") {
      return mailbox.filter((mail) => mail.starred);
    }

    return mailbox.filter((mail) => mail.folder === activeFolder);
  }, [activeFolder, mailbox]);

  const selectedMail = useMemo(
    () => mailbox.find((mail) => mail.id === selectedMailId) ?? null,
    [mailbox, selectedMailId],
  );

  const folderCounts = useMemo(() => {
    return folderList.reduce<Record<Folder, number>>((acc, item) => {
      acc[item] = item === "Starred" ? mailbox.filter((mail) => mail.starred).length : mailbox.filter((mail) => mail.folder === item).length;
      return acc;
    }, {} as Record<Folder, number>);
  }, [mailbox]);

  const composedBody = `${message.trim()}\n\n${signature}`.trim();

  function applyTemplate(templateId: string) {
    setSelectedTemplate(templateId);
    const preset = templatePresets.find((item) => item.id === templateId);
    if (!preset || !preset.id) {
      setToast("Template cleared.");
      return;
    }

    setSubject(preset.subject);
    setMessage(preset.body);
    if (preset.to) {
      setTo(preset.to);
    }
    setToast(`Applied template: ${preset.label}`);
  }

  function resetComposer() {
    setTo("");
    setCc("");
    setBcc("");
    setSubject("");
    setMessage("");
    setReplyTo("");
    setScheduleDate("");
    setScheduleTime("");
    setSelectedTemplate("");
    setAttachments(initialAttachments);
  }

  function createMessageRecord(folder: Folder, prefix = "") {
    const id = Date.now();
    const safeSubject = subject.trim() || "(no subject)";
    const recipient = to.trim() || "(no recipient)";
    const preview = composedBody.replaceAll("\n", " ").slice(0, 88);

    return {
      id,
      sender: "You",
      subject: `${prefix}${safeSubject}`,
      preview,
      body: composedBody,
      folder,
      date: nowTimeLabel(),
      starred: false,
      unread: false,
      recipient,
    };
  }

  function handlePretendSend(mode: "send" | "schedule" | "draft") {
    if (mode === "schedule" && !canSchedule) {
      setToast("Select both schedule date and time before scheduling.");
      return;
    }

    if (!subject.trim() && !message.trim()) {
      setToast("Add a subject or message before sending.");
      return;
    }

    if (mode === "send") {
      const next = createMessageRecord("Sent");
      setMailbox((current) => [next, ...current]);
      setActiveFolder("Sent");
      setSelectedMailId(next.id);
      setActiveView("mailbox");
      setToast(`Pretend sent to ${to || "(no recipient)"}.`);
      return;
    }

    if (mode === "schedule") {
      const next = createMessageRecord("Scheduled", "[Scheduled] ");
      setMailbox((current) => [next, ...current]);
      setActiveFolder("Scheduled");
      setSelectedMailId(next.id);
      setActiveView("mailbox");
      setToast(`Pretend scheduled for ${scheduleDate} at ${scheduleTime}.`);
      return;
    }

    const next = createMessageRecord("Drafts", "Draft: ");
    setMailbox((current) => [next, ...current]);
    setActiveFolder("Drafts");
    setSelectedMailId(next.id);
    setActiveView("mailbox");
    setToast("Pretend saved as draft.");
  }

  function moveSelectedTo(folder: Exclude<Folder, "Starred">) {
    if (!selectedMail) {
      return;
    }

    setMailbox((current) =>
      current.map((mail) =>
        mail.id === selectedMail.id
          ? {
              ...mail,
              folder,
            }
          : mail,
      ),
    );
    setActiveFolder(folder);
    setToast(`Moved "${selectedMail.subject}" to ${folder}.`);
  }

  function toggleStarSelected() {
    if (!selectedMail) {
      return;
    }

    setMailbox((current) =>
      current.map((mail) =>
        mail.id === selectedMail.id
          ? {
              ...mail,
              starred: !mail.starred,
            }
          : mail,
      ),
    );
    setToast(selectedMail.starred ? "Removed star." : "Added star.");
  }

  function addAttachment() {
    const cleanName = newAttachmentName.trim();
    if (!cleanName) {
      setToast("Attachment name cannot be empty.");
      return;
    }

    setAttachments((current) => [cleanName, ...current]);
    setToast(`Attached ${cleanName}.`);
  }

  function removeAttachment(fileName: string) {
    setAttachments((current) => current.filter((item) => item !== fileName));
    setToast(`Removed ${fileName}.`);
  }

  return (
    <section className="section-space">
      <article className="rounded-3xl border-2 border-black bg-white p-4 shadow-[10px_10px_0_0_#111] md:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-4">
          <div>
            <p className="section-kicker">Email Playground</p>
            <h1 className="mt-2 text-3xl font-black md:text-4xl">Pretend Email App</h1>
          </div>
          <p className="rounded-full border-2 border-black bg-lime-300 px-4 py-2 text-xs font-black uppercase tracking-[0.14em]">
            Simulation only
          </p>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {[
            { id: "compose", label: "Compose window" },
            { id: "preview", label: "Preview window" },
            { id: "mailbox", label: "Mailbox window" },
            { id: "settings", label: "Settings window" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as WindowView)}
              className={`rounded-xl border-2 px-3 py-2 text-xs font-black uppercase tracking-wide ${
                activeView === item.id ? "border-black bg-lime-300" : "border-black bg-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)_320px]">
          <aside className="rounded-2xl border-2 border-black bg-zinc-50 p-4">
            <button
              onClick={() => {
                resetComposer();
                setActiveView("compose");
                setToast("Started a fresh message.");
              }}
              className="mb-4 w-full rounded-xl border-2 border-black bg-lime-300 px-4 py-2 text-sm font-black uppercase tracking-wide"
            >
              + New message
            </button>

            <ul className="space-y-2">
              {folderList.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      setActiveFolder(item);
                      setActiveView("mailbox");
                    }}
                    className={`flex w-full items-center justify-between rounded-xl border-2 px-3 py-2 text-left text-sm font-bold ${
                      item === activeFolder ? "border-black bg-white" : "border-transparent bg-transparent"
                    }`}
                  >
                    <span>{item}</span>
                    <span>{folderCounts[item]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="rounded-2xl border-2 border-black p-4">
            {activeView === "compose" && (
              <>
                <div className="mb-4 grid gap-3 md:grid-cols-2">
                  <label className="text-sm font-bold">
                    From
                    <input
                      value={fromAlias}
                      onChange={(event) => setFromAlias(event.target.value)}
                      className="mt-1 w-full rounded-lg border-2 border-black px-3 py-2"
                    />
                  </label>
                  <label className="text-sm font-bold">
                    Reply-to
                    <input
                      value={replyTo}
                      onChange={(event) => setReplyTo(event.target.value)}
                      placeholder="optional@address.com"
                      className="mt-1 w-full rounded-lg border-2 border-black px-3 py-2"
                    />
                  </label>
                  <label className="text-sm font-bold md:col-span-2">
                    To
                    <input
                      value={to}
                      onChange={(event) => setTo(event.target.value)}
                      className="mt-1 w-full rounded-lg border-2 border-black px-3 py-2"
                    />
                  </label>
                  <label className="text-sm font-bold">
                    Cc
                    <input
                      value={cc}
                      onChange={(event) => setCc(event.target.value)}
                      className="mt-1 w-full rounded-lg border-2 border-black px-3 py-2"
                    />
                  </label>
                  <label className="text-sm font-bold">
                    Bcc
                    <input
                      value={bcc}
                      onChange={(event) => setBcc(event.target.value)}
                      className="mt-1 w-full rounded-lg border-2 border-black px-3 py-2"
                    />
                  </label>
                  <label className="text-sm font-bold md:col-span-2">
                    Subject
                    <input
                      value={subject}
                      onChange={(event) => setSubject(event.target.value)}
                      className="mt-1 w-full rounded-lg border-2 border-black px-3 py-2"
                    />
                  </label>
                </div>

                <div className="mb-3 flex flex-wrap gap-2 text-xs font-black uppercase">
                  {["B", "I", "U", "• List", "1. List", "Link", "Quote", "Code"].map((tool) => (
                    <button key={tool} className="rounded-md border-2 border-black bg-zinc-100 px-2 py-1">
                      {tool}
                    </button>
                  ))}
                </div>

                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="h-56 w-full rounded-xl border-2 border-black p-3"
                />

                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <label className="text-sm font-bold">
                    Preset template
                    <select
                      value={selectedTemplate}
                      onChange={(event) => applyTemplate(event.target.value)}
                      className="mt-1 w-full rounded-lg border-2 border-black px-3 py-2"
                    >
                      {templatePresets.map((item) => (
                        <option key={item.id || "none"} value={item.id}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-sm font-bold">
                    Signature
                    <select
                      value={signature}
                      onChange={(event) => setSignature(event.target.value)}
                      className="mt-1 w-full rounded-lg border-2 border-black px-3 py-2"
                    >
                      {signatures.map((item) => (
                        <option key={item} value={item}>
                          {item.split("\n")[0]}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-sm font-bold">
                    Send later date
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(event) => setScheduleDate(event.target.value)}
                      className="mt-1 w-full rounded-lg border-2 border-black px-3 py-2"
                    />
                  </label>
                  <label className="text-sm font-bold">
                    Send later time
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(event) => setScheduleTime(event.target.value)}
                      className="mt-1 w-full rounded-lg border-2 border-black px-3 py-2"
                    />
                  </label>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => handlePretendSend("send")}
                    className="rounded-xl border-2 border-black bg-lime-300 px-4 py-2 text-sm font-black uppercase"
                  >
                    Pretend send
                  </button>
                  <button
                    onClick={() => handlePretendSend("schedule")}
                    className="rounded-xl border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase"
                  >
                    Schedule send
                  </button>
                  <button
                    onClick={() => handlePretendSend("draft")}
                    className="rounded-xl border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase"
                  >
                    Save draft
                  </button>
                  <button
                    onClick={() => setActiveView("preview")}
                    className="rounded-xl border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase"
                  >
                    Open preview
                  </button>
                </div>
              </>
            )}

            {activeView === "preview" && (
              <div className="space-y-3">
                <p className="text-xs font-black uppercase tracking-[0.15em]">Live preview window</p>
                <div className="rounded-xl border-2 border-black bg-zinc-50 p-3 text-sm">
                  <p>
                    <strong>From:</strong> {fromAlias}
                  </p>
                  <p>
                    <strong>To:</strong> {to || "(empty)"}
                  </p>
                  <p>
                    <strong>Cc:</strong> {cc || "(empty)"} <strong className="ml-2">Bcc:</strong> {bcc || "(empty)"}
                  </p>
                  <p>
                    <strong>Subject:</strong> {subject || "(no subject)"}
                  </p>
                  <hr className="my-2 border-black" />
                  <pre className="whitespace-pre-wrap font-sans">{composedBody || "(empty message)"}</pre>
                </div>
              </div>
            )}

            {activeView === "mailbox" && (
              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.15em]">Mailbox window: {activeFolder}</p>
                <div className="grid gap-3 md:grid-cols-2">
                  <ul className="max-h-[420px] space-y-2 overflow-auto pr-1">
                    {filteredMails.length === 0 ? (
                      <li className="rounded-lg border-2 border-black p-2 text-sm">No emails in this folder.</li>
                    ) : (
                      filteredMails.map((mail) => (
                        <li key={mail.id}>
                          <button
                            onClick={() => setSelectedMailId(mail.id)}
                            className={`w-full rounded-lg border-2 p-2 text-left text-sm ${
                              selectedMailId === mail.id ? "border-black bg-lime-100" : "border-black bg-white"
                            }`}
                          >
                            <p className="font-bold">
                              {mail.sender} {mail.unread ? "•" : ""}
                            </p>
                            <p>{mail.subject}</p>
                            <p className="text-xs">{mail.preview}</p>
                          </button>
                        </li>
                      ))
                    )}
                  </ul>

                  <div className="rounded-lg border-2 border-black bg-zinc-50 p-3 text-sm">
                    {selectedMail ? (
                      <>
                        <p className="font-black">{selectedMail.subject}</p>
                        <p className="text-xs">From: {selectedMail.sender}</p>
                        <p className="text-xs">Time: {selectedMail.date}</p>
                        <hr className="my-2 border-black" />
                        <p>{selectedMail.preview}</p>
                        {selectedMail.body && <pre className="mt-2 whitespace-pre-wrap font-sans">{selectedMail.body}</pre>}
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            onClick={toggleStarSelected}
                            className="rounded-lg border-2 border-black bg-white px-2 py-1 text-xs font-black uppercase"
                          >
                            {selectedMail.starred ? "Unstar" : "Star"}
                          </button>
                          <button
                            onClick={() => moveSelectedTo("Archive")}
                            className="rounded-lg border-2 border-black bg-white px-2 py-1 text-xs font-black uppercase"
                          >
                            Archive
                          </button>
                          <button
                            onClick={() => moveSelectedTo("Trash")}
                            className="rounded-lg border-2 border-black bg-white px-2 py-1 text-xs font-black uppercase"
                          >
                            Trash
                          </button>
                        </div>
                      </>
                    ) : (
                      <p>No selected email.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeView === "settings" && (
              <div className="space-y-3">
                <p className="text-xs font-black uppercase tracking-[0.15em]">Delivery and tracking settings</p>
                <label className="block text-sm font-bold">
                  Priority
                  <select
                    value={priority}
                    onChange={(event) => setPriority(event.target.value)}
                    className="mt-1 w-full rounded-lg border-2 border-black px-3 py-2"
                  >
                    <option>Low</option>
                    <option>Normal</option>
                    <option>High</option>
                  </select>
                </label>
                <label className="flex items-center gap-2 text-sm font-bold">
                  <input type="checkbox" checked={readReceipt} onChange={() => setReadReceipt((value) => !value)} />
                  Request read receipt
                </label>
                <label className="flex items-center gap-2 text-sm font-bold">
                  <input type="checkbox" checked={trackOpens} onChange={() => setTrackOpens((value) => !value)} />
                  Track opens & clicks
                </label>
                <label className="flex items-center gap-2 text-sm font-bold">
                  <input type="checkbox" checked={encrypt} onChange={() => setEncrypt((value) => !value)} />
                  Encrypt message
                </label>
              </div>
            )}

            <p className="mt-4 text-sm font-medium">{toast}</p>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border-2 border-black bg-zinc-50 p-4">
              <h2 className="text-sm font-black uppercase tracking-[0.15em]">Attachments</h2>
              <p className="mt-2 text-sm font-medium">{attachments.length} file(s) attached</p>
              <div className="mt-2 flex gap-2">
                <input
                  value={newAttachmentName}
                  onChange={(event) => setNewAttachmentName(event.target.value)}
                  className="w-full rounded-lg border-2 border-black px-2 py-1 text-sm"
                />
                <button onClick={addAttachment} className="rounded-lg border-2 border-black bg-white px-2 py-1 text-xs font-black">
                  Add
                </button>
              </div>
              <ul className="mt-2 space-y-1 text-sm">
                {attachments.map((item) => (
                  <li key={item} className="flex items-center justify-between gap-2">
                    <span>• {item}</span>
                    <button
                      onClick={() => removeAttachment(item)}
                      className="rounded border-2 border-black bg-white px-1 text-[10px] font-black uppercase"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border-2 border-black bg-zinc-50 p-4">
              <h2 className="text-sm font-black uppercase tracking-[0.15em]">Current email options</h2>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Priority: {priority}</li>
                <li>• Read receipt: {readReceipt ? "On" : "Off"}</li>
                <li>• Tracking: {trackOpens ? "On" : "Off"}</li>
                <li>• Encryption: {encrypt ? "On" : "Off"}</li>
                <li>• Template: {selectedTemplate || "None"}</li>
                <li>• Send later: {canSchedule ? `${scheduleDate} ${scheduleTime}` : "Not set"}</li>
              </ul>
            </div>
          </aside>
        </div>
      </article>
    </section>
  );
}
