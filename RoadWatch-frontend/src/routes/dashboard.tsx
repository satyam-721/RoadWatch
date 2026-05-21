import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { getComplaints, getUser, statusColor } from "@/lib/mock-store";
import { FileWarning, Search, MessageSquare, HelpCircle, ChevronRight, ImageIcon } from "lucide-react";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

function Dashboard() {
  const user = getUser();
  const complaints = getComplaints().slice(0, 5);

  return (
    <PageShell>
      <div className="rounded-3xl bg-white border border-border p-5 shadow-sm flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-secondary text-secondary-foreground grid place-items-center text-xl font-bold">
          {user.name.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="text-sm text-muted-foreground">Namaste</div>
          <div className="text-xl font-bold text-foreground">{user.name}</div>
        </div>
        <Link to="/profile" className="rounded-full border border-border px-3 py-2 text-sm font-semibold">
          Profile
        </Link>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <BigCard to="/report" icon={<FileWarning className="h-7 w-7" />} title="Report New Road Issue" desc="Send a new complaint" tone="primary" />
        <BigCard to="/track" icon={<Search className="h-7 w-7" />} title="Track Complaints" desc="Check current status" tone="secondary" />
        <BigCard to="/feedback" icon={<MessageSquare className="h-7 w-7" />} title="Feedback" desc="Rate resolution" tone="secondary" />
        <BigCard to="/help" icon={<HelpCircle className="h-7 w-7" />} title="Help" desc="How to use the app" tone="secondary" />
      </div>

      <div className="mt-7">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-foreground">Recent Complaints</h2>
          <Link to="/track" className="text-primary text-sm font-semibold">View all</Link>
        </div>
        <div className="space-y-3">
          {complaints.map((c) => (
            <Link
              key={c.id}
              to="/complaint/$id"
              params={{ id: c.id }}
              className="flex items-center gap-4 rounded-2xl bg-white border border-border p-4 shadow-sm"
            >
              <div className="h-16 w-16 rounded-xl bg-secondary/60 grid place-items-center text-secondary-foreground">
                <ImageIcon className="h-7 w-7" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-foreground">{c.id}</span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${statusColor(c.status)}`}>
                    {c.status}
                  </span>
                </div>
                <div className="text-sm text-foreground truncate">{c.roadName} - {c.issueType}</div>
                <div className="text-xs text-muted-foreground">{c.date}</div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function BigCard({ to, icon, title, desc, tone }: { to: string; icon: React.ReactNode; title: string; desc: string; tone: "primary" | "secondary" }) {
  return (
    <Link
      to={to}
      className={`rounded-2xl p-5 border shadow-sm flex items-center gap-4 ${
        tone === "primary" ? "bg-primary text-primary-foreground border-primary" : "bg-white border-border"
      }`}
    >
      <div className={`h-12 w-12 rounded-xl grid place-items-center ${tone === "primary" ? "bg-white/15" : "bg-secondary text-secondary-foreground"}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="font-bold text-base">{title}</div>
        <div className={`text-sm ${tone === "primary" ? "text-white/80" : "text-muted-foreground"}`}>{desc}</div>
      </div>
      <ChevronRight className="h-5 w-5 opacity-70" />
    </Link>
  );
}