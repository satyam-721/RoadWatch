import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Camera, MapPin, Send, Search, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <PageShell showBottomNav={false} showTopAuth>
      {/* Hero */}
      <section className="rounded-3xl bg-white border border-border p-6 sm:p-10 shadow-sm">
        <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
          <div>
            <span className="inline-block rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-semibold">
              Public Service · सार्वजनिक सेवा
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight text-foreground">
              Report Bad Roads Easily
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              Upload a photo of a damaged road in your village or town. We send it
              to the right department and you can track the status anytime.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-2xl bg-white border-2 border-primary px-6 py-4 text-base font-bold text-primary"
              >
                Register
              </Link>
              <Link
                to="/track"
                className="inline-flex items-center justify-center rounded-2xl bg-secondary px-6 py-4 text-base font-bold text-secondary-foreground"
              >
                <Search className="mr-2 h-5 w-5" /> Track Complaint
              </Link>
            </div>
          </div>
          <div className="rounded-2xl bg-[#eaf3ff] aspect-[4/3] grid place-items-center border border-blue-100">
            <div className="text-center px-6">
              <div className="mx-auto h-24 w-24 rounded-full bg-white shadow grid place-items-center mb-3">
                <Camera className="h-12 w-12 text-primary" />
              </div>
              <div className="text-sm text-muted-foreground">
                Snap · Locate · Submit
              </div>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs text-green-700 border border-green-200">
                <CheckCircle2 className="h-4 w-4" /> Trusted by citizens across India
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 cards */}
      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { icon: <Camera className="h-7 w-7" />, t: "Upload Photo", d: "Take a clear picture of the road problem." },
          { icon: <MapPin className="h-7 w-7" />, t: "Mark Location", d: "Pick the location on the map or auto-detect." },
          { icon: <Send className="h-7 w-7" />, t: "Submit Complaint", d: "Send it to the concerned department." },
        ].map((c) => (
          <div key={c.t} className="rounded-2xl bg-white border border-border p-5 shadow-sm">
            <div className="h-12 w-12 rounded-xl bg-secondary text-secondary-foreground grid place-items-center">
              {c.icon}
            </div>
            <div className="mt-3 font-bold text-lg text-foreground">{c.t}</div>
            <div className="text-sm text-muted-foreground">{c.d}</div>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section className="mt-8 rounded-3xl bg-white border border-border p-6 sm:p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <p className="text-sm text-muted-foreground">Simple 4 steps. No paperwork.</p>
        <ol className="mt-5 grid gap-4 sm:grid-cols-4">
          {["Take Photo", "Select Road", "Submit Complaint", "Track Status"].map((s, i) => (
            <li key={s} className="rounded-2xl bg-secondary/50 p-5">
              <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground grid place-items-center font-bold">
                {i + 1}
              </div>
              <div className="mt-2 font-semibold text-foreground">{s}</div>
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground"
          >
            Get Started <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
