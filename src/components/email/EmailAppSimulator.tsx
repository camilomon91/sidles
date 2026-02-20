"use client";

import { useMemo, useState } from "react";

type Folder = "Inbox" | "Starred" | "Sent" | "Drafts" | "Archive" | "Spam" | "Trash";

type FakeMail = {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  folder: Folder;
  unread?: boolean;
  starred?: boolean;
  date: string;
};

const fakeMailbox: FakeMail[] = [
  {
    id: 1,
    sender: "Design Team",
    subject: "Moodboard feedback for campaign",
    preview: "Can you review the layout options before 4pm?",
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

const folderList: Folder[] = ["Inbox", "Starred", "Sent", "Drafts", "Archive", "Spam", "Trash"];

const signatures = ["Best regards,\nAlex", "Cheers,\nAlex — Product Design", "Thanks,\nAlex\nSIDLEE"];

const templates = [
  "Follow-up",
  "Project kick-off",
  "Meeting recap",
  "Customer support reply",
  "Out of office",
];

export default function EmailAppSimulator() {
  const [folder, setFolder] = useState<Folder>("Inbox");
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
  const [toast, setToast] = useState("");

  const filteredMails = useMemo(() => {
    if (folder === "Starred") {
      return fakeMailbox.filter((mail) => mail.starred);
    }

    return fakeMailbox.filter((mail) => mail.folder === folder);
  }, [folder]);

  const canSchedule = Boolean(scheduleDate && scheduleTime);
  const attachmentCount = 3;

  function handlePretendSend(mode: "send" | "schedule" | "draft") {
    if (mode === "schedule" && !canSchedule) {
      setToast("Select both schedule date and time first.");
      return;
    }

    const statusMessage =
      mode === "send"
        ? `Pretend sent to ${to || "(no recipient)"}`
        : mode === "schedule"
          ? `Pretend scheduled for ${scheduleDate} at ${scheduleTime}`
          : "Pretend saved as draft";

    setToast(statusMessage);
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

        <div className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)_320px]">
          <aside className="rounded-2xl border-2 border-black bg-zinc-50 p-4">
            <button className="mb-4 w-full rounded-xl border-2 border-black bg-lime-300 px-4 py-2 text-sm font-black uppercase tracking-wide">
              + New message
            </button>
            <ul className="space-y-2">
              {folderList.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => setFolder(item)}
                    className={`w-full rounded-xl border-2 px-3 py-2 text-left text-sm font-bold ${
                      item === folder ? "border-black bg-white" : "border-transparent bg-transparent"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="rounded-2xl border-2 border-black p-4">
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
              {['B','I','U','• List','1. List','Link','Quote','Code'].map((tool) => (
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
                Template
                <select
                  value={selectedTemplate}
                  onChange={(event) => setSelectedTemplate(event.target.value)}
                  className="mt-1 w-full rounded-lg border-2 border-black px-3 py-2"
                >
                  <option value="">None</option>
                  {templates.map((item) => (
                    <option key={item} value={item}>
                      {item}
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
            </div>

            <p className="mt-3 text-sm font-medium">{toast || "No message action yet."}</p>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border-2 border-black bg-zinc-50 p-4">
              <h2 className="text-sm font-black uppercase tracking-[0.15em]">Delivery options</h2>
              <label className="mt-3 block text-sm font-bold">
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
              <label className="mt-3 flex items-center gap-2 text-sm font-bold">
                <input type="checkbox" checked={readReceipt} onChange={() => setReadReceipt((value) => !value)} />
                Request read receipt
              </label>
              <label className="mt-2 flex items-center gap-2 text-sm font-bold">
                <input type="checkbox" checked={trackOpens} onChange={() => setTrackOpens((value) => !value)} />
                Track opens & clicks
              </label>
              <label className="mt-2 flex items-center gap-2 text-sm font-bold">
                <input type="checkbox" checked={encrypt} onChange={() => setEncrypt((value) => !value)} />
                Encrypt message
              </label>
            </div>

            <div className="rounded-2xl border-2 border-black bg-zinc-50 p-4">
              <h2 className="text-sm font-black uppercase tracking-[0.15em]">Attachments</h2>
              <p className="mt-2 text-sm font-medium">{attachmentCount} fake files attached</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• launch-plan.pdf</li>
                <li>• budget.xlsx</li>
                <li>• hero-image.png</li>
              </ul>
            </div>

            <div className="rounded-2xl border-2 border-black bg-zinc-50 p-4">
              <h2 className="text-sm font-black uppercase tracking-[0.15em]">{folder}</h2>
              <ul className="mt-3 space-y-2">
                {filteredMails.length === 0 ? (
                  <li className="text-sm font-medium">No emails in this folder.</li>
                ) : (
                  filteredMails.map((mail) => (
                    <li key={mail.id} className="rounded-lg border-2 border-black bg-white p-2 text-sm">
                      <p className="font-bold">{mail.sender}</p>
                      <p>{mail.subject}</p>
                      <p className="text-xs">{mail.preview}</p>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </aside>
        </div>
      </article>
    </section>
  );
}
