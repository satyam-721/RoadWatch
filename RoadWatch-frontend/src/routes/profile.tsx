import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { getComplaints, getUser } from "@/lib/mock-store";
import { LogOut, Pencil, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/profile")({ component: Profile });

function Profile() {
  const user = getUser();
  const nav = useNavigate();
  const list = getComplaints();
  const total = list.length;
  const resolved = list.filter((c) => c.status === "Resolved").length;

  return (
    <PageShell>
      <div className="rounded-3xl bg-white border border-border p-6 shadow-sm text-center">
        <div className="mx-auto h-20 w-20 rounded-full bg-secondary text-secondary-foreground grid place-items-center text-3xl font-bold">
          {user.name.charAt(0)}
        </div>
        <h1 className="mt-3 text-2xl font-bold text-foreground">{user.name}</h1>
        <div className="mt-2 flex flex-col items-center gap-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> {user.mobile}</span>
          <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {user.district}, {user.state}</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white border border-border p-5 text-center shadow-sm">
          <div className="text-3xl font-bold text-primary">{total}</div>
          <div className="text-sm text-muted-foreground">Total Complaints</div>
        </div>
        <div className="rounded-2xl bg-white border border-border p-5 text-center shadow-sm">
          <div className="text-3xl font-bold text-green-700">{resolved}</div>
          <div className="text-sm text-muted-foreground">Resolved</div>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-bold text-primary-foreground">
          <Pencil className="h-5 w-5" /> Edit Profile
        </button>
        <button
          onClick={() => nav({ to: "/" })}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white border-2 border-destructive py-4 font-bold text-destructive"
        >
          <LogOut className="h-5 w-5" /> Logout
        </button>
      </div>
    </PageShell>
  );
}