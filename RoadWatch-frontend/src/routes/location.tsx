import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { MapPin, Crosshair } from "lucide-react";
import { useState } from "react";
import { addComplaint, clearDraft, getDraft, getUser, newComplaintId } from "@/lib/mock-store";

export const Route = createFileRoute("/location")({ component: LocationPage });

function LocationPage() {
  const nav = useNavigate();
  const [lat, setLat] = useState<number | undefined>();
  const [lng, setLng] = useState<number | undefined>();
  const [manual, setManual] = useState("");

  const useCurrent = () => {
    if (!navigator.geolocation) {
      setLat(25.32);
      setLng(82.99);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setLat(+p.coords.latitude.toFixed(4));
        setLng(+p.coords.longitude.toFixed(4));
      },
      () => {
        setLat(25.32);
        setLng(82.99);
      },
    );
  };

  const submit = () => {
    const d = getDraft();
    const user = getUser();
    const id = newComplaintId();
    addComplaint({
      id,
      roadName: d.roadName || "Unnamed Road",
      issueType: d.issueType || "Other",
      description: d.description || "",
      state: d.state || user.state,
      district: d.district || user.district,
      village: d.village || "",
      photo: d.photo,
      lat,
      lng,
      date: new Date().toISOString().slice(0, 10),
      status: "Submitted",
    });
    clearDraft();
    nav({ to: "/success", search: { id } });
  };

  return (
    <PageShell>
      <h1 className="text-2xl font-bold text-foreground">Select Location</h1>
      <p className="text-sm text-muted-foreground mt-1">Step 3 of 3 - Tell us where it is.</p>

      <div className="mt-5 relative rounded-3xl overflow-hidden border border-border shadow-sm">
        <div
          className="aspect-[4/3] w-full bg-[#e9f1ec] relative"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        >
          <div className="absolute left-1/4 top-1/3 right-10 h-2 bg-gray-300 rounded-full rotate-6" />
          <div className="absolute left-10 bottom-10 right-1/3 h-2 bg-gray-300 rounded-full -rotate-3" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
            <MapPin className="h-12 w-12 text-red-600 drop-shadow" fill="currentColor" />
            <div className="mt-1 rounded-full bg-white px-2 py-0.5 text-xs font-semibold shadow border border-border">
              You are here
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={useCurrent}
        className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-bold text-primary-foreground"
      >
        <Crosshair className="h-5 w-5" /> Use Current Location
      </button>

      <div className="mt-5 rounded-2xl bg-white border border-border p-4">
        <label className="block text-base font-semibold text-foreground mb-2">
          Or enter location manually
        </label>
        <input
          value={manual}
          onChange={(e) => setManual(e.target.value)}
          className="msk-input"
          placeholder="Landmark or address"
        />
        <div className="mt-3 text-sm text-muted-foreground">
          Selected coordinates:{" "}
          <span className="font-mono text-foreground">
            {lat && lng ? `${lat}, ${lng}` : "—"}
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button onClick={() => nav({ to: "/report-details" })} className="rounded-2xl bg-white border border-border py-4 font-bold text-foreground">
          Back
        </button>
        <button onClick={submit} className="rounded-2xl bg-primary py-4 font-bold text-primary-foreground">
          Submit Complaint
        </button>
      </div>
    </PageShell>
  );
}