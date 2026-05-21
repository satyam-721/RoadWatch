import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { getComplaints, statusColor } from "@/lib/mock-store";
import { Search, ImageIcon, ChevronRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/track")({ component: Track });

function Track() {
  const [q, setQ] = useState("");
  const list = getComplaints().filter((c) =>
    c.id.toLowerCase().includes(q.toLowerCase()) ||
    c.roadName.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <PageShell>
      <h1 className="text-2xl font-bold text-foreground">Track Complaints</h1>
      <p className="text-sm text-muted-foreground mt-1">Search by complaint ID or road.</p>

      <div className="mt-4 flex gap-2">
        <div className="flex-1 flex items-center rounded-2xl border-2 border-input bg-white focus-within:border-primary">
          <span className="pl-4 text-muted-foreground"><Search className="h-5 w-5" /></span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. MS-2034"
            className="w-full bg-transparent px-3 py-4 text-base outline-none"
          />
        </div>
        <button className="rounded-2xl bg-primary px-5 font-bold text-primary-foreground">Search</button>
      </div>

      <div className="mt-5 space-y-3">
        {list.length === 0 && (
          <div className="rounded-2xl bg-white border border-border p-6 text-center text-muted-foreground">
            No complaints found.
          </div>
        )}
        {list.map((c) => (
          <Link
            key={c.id}
            to="/complaint/$id"
            params={{ id: c.id }}
            className="flex items-center gap-4 rounded-2xl bg-white border border-border p-4 shadow-sm"
          >
            <div className="h-16 w-16 rounded-xl bg-secondary/60 grid place-items-center overflow-hidden">
              {c.photo ? (
                <img src={c.photo} alt="" className="h-full w-full object-cover" />
              ) : (
                <ImageIcon className="h-7 w-7 text-secondary-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-foreground">{c.id}</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${statusColor(c.status)}`}>
                  {c.status}
                </span>
              </div>
              <div className="text-sm text-foreground truncate">{c.roadName}</div>
              <div className="text-xs text-muted-foreground truncate">{c.description}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{c.date}</div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </PageShell>
  );
}