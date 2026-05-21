import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Camera, MapPin, Send, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/help")({ component: Help });

const FAQ = [
  { q: "How long does resolution take?", a: "Usually 7 to 30 days, depending on the type of work needed and approvals." },
  { q: "Can I reopen a complaint?", a: "Yes. Open the complaint and tap Reopen Complaint to send it back for review." },
  { q: "Is location required?", a: "Yes. Location helps the department reach the exact spot quickly." },
  { q: "Can I upload photos later?", a: "It is best to upload while reporting, but you can edit before submission." },
];

function Help() {
  return (
    <PageShell>
      <h1 className="text-2xl font-bold text-foreground">Help & Instructions</h1>
      <p className="text-sm text-muted-foreground mt-1">Simple guide to use Meri Sadak.</p>

      <div className="mt-5 grid gap-3">
        <Step icon={<Camera className="h-6 w-6" />} title="1. Take a Photo" desc="Click a clear photo of the damaged road area in good light." />
        <Step icon={<MapPin className="h-6 w-6" />} title="2. Mark the Location" desc="Use GPS or type the village/landmark name." />
        <Step icon={<Send className="h-6 w-6" />} title="3. Submit the Complaint" desc="Add a short description and submit. You will get a complaint ID." />
        <Step icon={<Search className="h-6 w-6" />} title="4. Track Status" desc="Use the complaint ID to check progress anytime." />
      </div>

      <h2 className="mt-8 text-lg font-bold text-foreground">Frequently Asked Questions</h2>
      <div className="mt-3 space-y-3">
        {FAQ.map((f, i) => <FaqCard key={i} {...f} />)}
      </div>
    </PageShell>
  );
}

function Step({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-white border border-border p-5 shadow-sm flex gap-4">
      <div className="h-12 w-12 rounded-xl bg-secondary text-secondary-foreground grid place-items-center shrink-0">
        {icon}
      </div>
      <div>
        <div className="font-bold text-foreground">{title}</div>
        <div className="text-sm text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}

function FaqCard({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-white border border-border shadow-sm">
      <button onClick={() => setOpen(!open)} className="w-full text-left px-5 py-4 font-semibold text-foreground flex items-center justify-between">
        {q}
        <span className="text-primary text-xl">{open ? "-" : "+"}</span>
      </button>
      {open && <div className="px-5 pb-4 text-sm text-muted-foreground">{a}</div>}
    </div>
  );
}