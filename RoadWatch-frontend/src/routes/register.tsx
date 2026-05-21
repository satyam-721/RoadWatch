import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useState } from "react";
import { STATES, setUser } from "@/lib/mock-store";

export const Route = createFileRoute("/register")({ component: Register });

function Register() {
  const nav = useNavigate();
  const [f, setF] = useState({
    name: "",
    mobile: "",
    state: "",
    district: "",
    pwd: "",
    cpwd: "",
  });
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  return (
    <PageShell showBottomNav={false} showTopAuth>
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl bg-white border border-border p-6 sm:p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
          <p className="text-sm text-muted-foreground">Takes less than a minute.</p>
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (f.pwd !== f.cpwd) {
                alert("Passwords do not match");
                return;
              }
              setUser({
                name: f.name,
                mobile: f.mobile,
                state: f.state,
                district: f.district,
              });
              nav({ to: "/dashboard" });
            }}
          >
            <Field label="Full Name">
              <input required value={f.name} onChange={(e) => set("name", e.target.value)} className="msk-input" placeholder="Your full name" />
            </Field>
            <Field label="Mobile Number">
              <input required inputMode="numeric" maxLength={10} value={f.mobile} onChange={(e) => set("mobile", e.target.value)} className="msk-input" placeholder="10 digit mobile" />
            </Field>
            <Field label="State">
              <select required value={f.state} onChange={(e) => set("state", e.target.value)} className="msk-input">
                <option value="">Select state</option>
                {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="District">
              <input required value={f.district} onChange={(e) => set("district", e.target.value)} className="msk-input" placeholder="Your district" />
            </Field>
            <Field label="Password">
              <input required type="password" value={f.pwd} onChange={(e) => set("pwd", e.target.value)} className="msk-input" placeholder="Create password" />
            </Field>
            <Field label="Confirm Password">
              <input required type="password" value={f.cpwd} onChange={(e) => set("cpwd", e.target.value)} className="msk-input" placeholder="Re-enter password" />
            </Field>

            <button type="submit" className="w-full rounded-2xl bg-primary py-4 text-lg font-bold text-primary-foreground">
              Register
            </button>
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold">Login</Link>
            </div>
          </form>
        </div>
      </div>
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