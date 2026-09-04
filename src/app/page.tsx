"use client";
import { useState } from "react";

const signals = [
  {
    title: "Payment failure reported by multiple customers",
    source: "Support",
    priority: "Urgent",
    time: "8 min ago",
  },
  {
    title: "Users confused by the new onboarding flow",
    source: "Feedback",
    priority: "High",
    time: "24 min ago",
  },
  {
    title: "Request for CSV export",
    source: "Feature request",
    priority: "Medium",
    time: "1 hr ago",
  },
];

const priorityStyles = {
  Urgent: "bg-red-500/10 text-red-400",
  High: "bg-orange-500/10 text-orange-400",
  Medium: "bg-yellow-500/10 text-yellow-400",
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSignal, setSelectedSignal] = useState<(typeof signals)[number] | null>(null);
  const [actionCreatedFor, setActionCreatedFor] = useState<string | null>(null,);
  return (
    <main className="min-h-screen bg-[#08090b] text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-zinc-900 bg-[#0b0c0f] p-6 md:block">
          <div className="text-lg font-semibold">SignalDesk</div>

          <p className="mt-1 text-xs text-zinc-600">Operations intelligence</p>

          <nav className="mt-10 space-y-2 text-sm">
            <a
              href="#"
              className="block rounded-lg bg-zinc-800 px-3 py-2 text-white"
            >
              Overview
            </a>

            <a
              href="#"
              className="block rounded-lg px-3 py-2 text-zinc-500 hover:bg-zinc-900 hover:text-white"
            >
              Signals
            </a>

            <a
              href="#"
              className="block rounded-lg px-3 py-2 text-zinc-500 hover:bg-zinc-900 hover:text-white"
            >
              Customers
            </a>

            <a
              href="#"
              className="block rounded-lg px-3 py-2 text-zinc-500 hover:bg-zinc-900 hover:text-white"
            >
              Analytics
            </a>

            <a
              href="#"
              className="block rounded-lg px-3 py-2 text-zinc-500 hover:bg-zinc-900 hover:text-white"
            >
              Settings
            </a>
          </nav>

          <div className="mt-auto pt-32">
            <div className="rounded-xl border border-zinc-800 bg-[#101114] p-4">
              <p className="text-xs text-zinc-500">AI processing</p>
              <p className="mt-2 text-sm text-emerald-400">● Operational</p>
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-zinc-900 px-6 py-5 lg:px-10">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="mr-4 rounded-lg border border-zinc-800 px-3 py-2 text-sm text-zinc-400 md:hidden"
              aria-label="Toggle navigation"
            >
              ☰
            </button>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                Overview
              </p>
              <h1 className="mt-1 text-xl font-semibold">Good morning.</h1>
            </div>

            <div className="flex items-center gap-4">
              <button className="hidden rounded-lg border border-zinc-800 px-3 py-2 text-sm text-zinc-400 hover:text-white sm:block">
                Search
              </button>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/10 text-sm text-cyan-400">
                SD
              </div>
            </div>
          </header>

          {menuOpen && (
            <nav className="border-b border-zinc-900 bg-[#0b0c0f] p-4 md:hidden">
              <div className="grid grid-cols-2 gap-2 text-sm">
                {["Overview", "Signals", "Customers", "Analytics", "Settings"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-lg px-3 py-3 text-left text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    >
                      {item}
                    </button>
                  ),
                )}
              </div>
            </nav>
          )}

          <div className="px-6 py-8 lg:px-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["128", "Total signals"],
                ["24", "Needs attention"],
                ["7", "Urgent"],
                ["92%", "AI confidence"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-xl border border-zinc-900 bg-[#0b0c0f] p-5"
                >
                  <p className="text-3xl font-semibold">{value}</p>
                  <p className="mt-2 text-sm text-zinc-600">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                    Inbox
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    Recent signals
                  </h2>
                </div>

                <a
                  href="/signals"
                  className="text-sm text-zinc-500 hover:text-white">
                  View all →
                </a>
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-zinc-900">
                {signals.map((signal) => (
                  <div
                    key={signal.title}
                    className="grid gap-4 border-b border-zinc-900 bg-[#0b0c0f] p-5 last:border-b-0 sm:grid-cols-[1fr_auto_auto] sm:items-center"
                  >
                    <div>
                      <p className="font-medium">{signal.title}</p>

                      <p className="mt-1 text-sm text-zinc-600">
                        {signal.source} · {signal.time}
                      </p>
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs ${
                        priorityStyles[
                          signal.priority as keyof typeof priorityStyles
                        ]
                      }`}
                    >
                      {signal.priority}
                    </span>

                    <button
                      onClick={() => setSelectedSignal(signal)}
                      className="w-fit text-sm text-zinc-500 hover:text-white"
                    >
                      Review →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {selectedSignal && (
            <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center">
              <div className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-[#101114] p-6 shadow-2xl">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                      Signal details
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold">
                      {selectedSignal.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => setSelectedSignal(null)}
                    className="rounded-lg px-2 py-1 text-zinc-500 hover:bg-zinc-900 hover:text-white"
                    aria-label="Close signal details"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-zinc-900/60 p-4">
                    <p className="text-xs text-zinc-600">Source</p>
                    <p className="mt-2 text-sm text-zinc-300">
                      {selectedSignal.source}
                    </p>
                  </div>

                  <div className="rounded-xl bg-zinc-900/60 p-4">
                    <p className="text-xs text-zinc-600">Priority</p>
                    <p className="mt-2 text-sm text-zinc-300">
                      {selectedSignal.priority}
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-cyan-400/10 bg-cyan-400/5 p-4">
                  <p className="text-xs uppercase tracking-wider text-cyan-400">
                    AI assessment
                  </p>

                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    This signal appears to represent a recurring customer
                    problem that may require investigation.
                  </p>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedSignal(null)}
                    className="rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-400 hover:text-white"
                  >
                    Close
                  </button>

                  <button
                    onClick={() => setActionCreatedFor(selectedSignal?.title ?? null)}
                    className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200">
                    {actionCreatedFor === selectedSignal?.title ? "Action created ✓"  : "Create action"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}