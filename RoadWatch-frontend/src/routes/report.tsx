import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Camera, MapPin, Info, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/report")({ component: Report });

function Report() {
  return (
    <PageShell>
      <h1 className="text-2xl font-bold text-foreground">Report a Road Issue</h1>
      <p className="text-sm text-muted-foreground mt-1">Choose how you want to report.</p>

      <div className="mt-4 rounded-2xl bg-blue-50 border border-blue-200 p-4 flex gap-3">
        <Info className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-900">
          Please take a clear photo of the road problem. Your complaint will be sent to the
          concerned department.
        </p>
      </div>

      <h2 className="mt-6 text-base font-semibold text-foreground">Choose Reporting Method</h2>
      <div className="mt-3 space-y-4">
        <Link to="/upload-photo" className="block rounded-2xl bg-white border-2 border-primary p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-primary text-primary-foreground grid place-items-center">
              <Camera className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-lg text-foreground">Upload Road Photo</div>
              <div className="text-sm text-muted-foreground">Take or upload a photo of the damaged road.</div>
            </div>
            <ChevronRight className="h-6 w-6 text-muted-foreground" />
          </div>
        </Link>
        <Link to="/report-details" className="block rounded-2xl bg-white border border-border p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-secondary text-secondary-foreground grid place-items-center">
              <MapPin className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-lg text-foreground">Select Existing Road</div>
              <div className="text-sm text-muted-foreground">Pick a road name and fill the issue details.</div>
            </div>
            <ChevronRight className="h-6 w-6 text-muted-foreground" />
          </div>
        </Link>
      </div>
    </PageShell>
  );
}