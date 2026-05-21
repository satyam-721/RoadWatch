import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { getComplaint, statusColor, type ComplaintStatus } from "@/lib/mock-store";
import { MapPin, Calendar, Hash, ImageIcon, Check, Circle, X } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/complaint/$id")({ component: Detail });

const STAGES: ComplaintStatus[] = ["Submitted", "Under Review", "In Progress", "Resolved"];

function Detail() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const c = getComplaint(id);
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  if (!c) {
    return (
      <PageShell>
        <div className="rounded-2xl bg-white border border-border p-6 text-center">
          <div className="text-lg font-bold">Complaint not found</div>
          <Link to="/track" className="mt-3 inline-block text-primary font-semibold">Go to Track</Link>
        </div>
      </PageShell>
    );
  }

  const currentStageIdx = STAGES.indexOf(c.status === "Rejected" ? "Submitted" : c.status);

  return (
    <PageShell>
      <h1 className="text-2xl font-bold text-foreground">Complaint Details</h1>

      <div className="mt-4 rounded-3xl overflow-hidden bg-white border border-border shadow-sm">
        <div className="aspect-[16/9] bg-secondary/60 grid place-items-center">
          {c.photo ? (
            <img src={c.photo} alt="Road" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-14 w-14 text-secondary-foreground" />
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-foreground font-bold text-lg">
              <Hash className="h-5 w-5" /> {c.id}
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColor(c.status)}`}>
              {c.status}
            </span>
          </div>
          <div className="mt-2 font-semibold text-foreground">{c.roadName} - {c.issueType}</div>
          <p className="mt-2 text-sm text-foreground">{c.description}</p>

          <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {c.village}, {c.district}, {c.state}</div>
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Submitted on {c.date}</div>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-3xl bg-white border border-border p-5 shadow-sm">
        <div className="font-bold text-foreground">Status Timeline</div>
        <ol className="mt-4 space-y-4">
          {STAGES.map((s, i) => {
            const done = i <= currentStageIdx;
            const rejected = c.status === "Rejected" && i > 0;
            return (
              <li key={s} className="flex items-start gap-3">
                <div className={`mt-0.5 h-7 w-7 rounded-full grid place-items-center ${
                  rejected ? "bg-red-100 text-red-700" : done ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                }`}>
                  {rejected ? <X className="h-4 w-4" /> : done ? <Check className="h-4 w-4" /> : <Circle className="h-3 w-3" />}
                </div>
                <div>
                  <div className={`font-semibold ${done ? "text-foreground" : "text-muted-foreground"}`}>{s}</div>
                  {i === currentStageIdx && (
                    <div className="text-xs text-muted-foreground">Current stage</div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => nav({ to: "/feedback", search: { id: c.id } })}
          className="rounded-2xl bg-primary py-4 font-bold text-primary-foreground"
        >
          Give Feedback
        </button>
        <button
          onClick={() => setOpen(true)}
          className="rounded-2xl bg-white border-2 border-primary py-4 font-bold text-primary"
        >
          Reopen Complaint
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 grid place-items-center px-4" onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">Reopen Complaint</h3>
              <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Tell us why you want to reopen this complaint.</p>
            <label className="mt-4 block text-base font-semibold text-foreground mb-2">
              Reason for reopening
            </label>
            <textarea
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="msk-input"
              placeholder="The road is broken again..."
            />
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button onClick={() => setOpen(false)} className="rounded-2xl bg-white border border-border py-3 font-bold text-foreground">
                Cancel
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  alert("Reopen request submitted.");
                }}
                className="rounded-2xl bg-primary py-3 font-bold text-primary-foreground"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}