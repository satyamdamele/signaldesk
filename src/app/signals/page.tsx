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
  {
    title: "Dashboard takes too long to load",
    source: "Support",
    priority: "High",
    time: "2 hrs ago",
  },
  {
    title: "Request for dark mode",
    source: "Feedback",
    priority: "Low",
    time: "3 hrs ago",
  },
];

const priorityStyles = {
  Urgent: "bg-red-500/10 text-red-400",
  High: "bg-orange-500/10 text-orange-400",
  Medium: "bg-yellow-500/10 text-yellow-400",
  Low: "bg-emerald-500/10 text-emerald-400",
};

export default function SignalsPage() {
    const [search, setSearch] = useState("");
    const [priority, setPriority] = useState("All");
    const filteredSignals = signals.filter((signal) => {
        const matchesSearch = `${signal.title} ${signal.source} ${signal.priority}`
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesPriority =
            priority === "All" || signal.priority === priority;

        return matchesSearch && matchesPriority;
    });
    return (
        <main className="min-h-screen bg-[#08090b] text-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
            <a
            href="/"
            className="text-sm text-zinc-500 transition hover:text-white"
            >
            ← Overview
            </a>

            <div className="mt-12">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                Inbox
            </p>

            <h1 className="mt-2 text-4xl font-semibold tracking-tight">
                All signals
            </h1>

            <p className="mt-4 max-w-2xl leading-7 text-zinc-500">
                Review incoming customer signals, understand their priority, and
                decide what deserves action.
            </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center">
                <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search signals..."
                    className="w-full rounded-xl border border-zinc-800 bg-[#0b0c0f] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600 sm:max-w-md"
                />
                <select
                    value={priority}
                    onChange={(event) => setPriority(event.target.value)}
                    className="mt-3 w-full rounded-xl border border-zinc-800 bg-[#0b0c0f] px-4 py-3 text-sm text-zinc-300 outline-none focus:border-zinc-600 sm:ml-3 sm:mt-0 sm:w-auto">
                    <option>All</option>
                    <option>Urgent</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>
            </div>

            <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-900">
            <div className="hidden grid-cols-[1fr_140px_120px_100px] border-b border-zinc-900 bg-[#0b0c0f] px-6 py-4 text-xs uppercase tracking-wider text-zinc-600 sm:grid">
                <span>Signal</span>
                <span>Source</span>
                <span>Priority</span>
                <span>Age</span>
            </div>

            {filteredSignals.length > 0 ? (
                filteredSignals.map((signal) => (
                    <div
                    key={signal.title}
                    className="grid gap-4 border-b border-zinc-900 bg-[#0b0c0f] px-6 py-5 last:border-b-0 sm:grid-cols-[1fr_140px_120px_100px] sm:items-center"
                    >
                    <div>
                        <p className="font-medium">{signal.title}</p>
                        <p className="mt-1 text-sm text-zinc-600 sm:hidden">
                        {signal.source} · {signal.time}
                        </p>
                    </div>

                    <span className="hidden text-sm text-zinc-500 sm:block">
                        {signal.source}
                    </span>

                    <span
                        className={`w-fit rounded-full px-3 py-1 text-xs ${
                        priorityStyles[
                            signal.priority as keyof typeof priorityStyles
                        ]
                        }`}
                    >
                        {signal.priority}
                    </span>

                    <span className="hidden text-sm text-zinc-600 sm:block">
                        {signal.time}
                    </span>
                    </div>
                ))
                ) : (
                <div className="px-6 py-16 text-center">
                    <p className="text-lg font-medium">No signals found</p>
                    <p className="mt-2 text-sm text-zinc-600">
                    Try changing your search or priority filter.
                    </p>
                </div>
            )}
            </div>
        </div>
        </main>
    );
}