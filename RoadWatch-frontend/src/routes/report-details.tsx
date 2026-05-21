import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useEffect, useState } from "react";
import { STATES, ISSUE_TYPES, getDraft, setDraft, getUser } from "@/lib/mock-store";

export const Route = createFileRoute("/report-details")({ component: Details });

function Details() {
  const nav = useNavigate();
  const user = getUser();
  const [f, setF] = useState({
    roadName: "",
    issueType: "",
    description: "",
    state: user.state,
    district: user.district,
    village: "",
  });
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    const d = getDraft();
    setF((p) => ({ ...p, ...d }));
  }, []);

  return (
    <PageShell>
      <h1 className="text-2xl font-bold text-foreground">Complaint Details</h1>
      <p className="text-sm text-muted-foreground mt-1">Step 2 of 3 - Fill the basic information.</p>

      <form
        className="mt-5 space-y-4 rounded-3xl bg-white border border-border p-5 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          setDraft(f);
          nav({ to: "/location" });
        }}
      >
        <Field label="Road Name">
          <input required value={f.roadName} onChange={(e) => set("roadName", e.target.value)} className="msk-input" placeholder="e.g. Village Main Road" />
        </Field>
        <Field label="Issue Type">
          <select required value={f.issueType} onChange={(e) => set("issueType", e.target.value)} className="msk-input">
            <option value="">Select issue</option>
            {ISSUE_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Description">
          <textarea required rows={4} value={f.description} onChange={(e) => set("description", e.target.value)} className="msk-input" placeholder="Briefly describe the road problem" />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="State">
            <select required value={f.state} onChange={(e) => set("state", e.target.value)} className="msk-input">
              <option value="">Select state</option>
              {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="District">
            <input required value={f.district} onChange={(e) => set("district", e.target.value)} className="msk-input" placeholder="District" />
          </Field>
        </div>
        <Field label="Village / Area">
          <input required value={f.village} onChange={(e) => set("village", e.target.value)} className="msk-input" placeholder="Village or area name" />
        </Field>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button type="button" onClick={() => nav({ to: "/report" })} className="rounded-2xl bg-white border border-border py-4 font-bold text-foreground">
            Cancel
          </button>
          <button type="submit" className="rounded-2xl bg-primary py-4 font-bold text-primary-foreground">
            Next
          </button>
        </div>
      </form>
    </PageShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-base font-semibold text-foreground mb-2">{label}</span>
      {children}
    </label>
  );
}