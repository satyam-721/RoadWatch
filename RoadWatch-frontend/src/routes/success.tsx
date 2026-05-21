import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";

export const Route = createFileRoute("/success")({
  component: Success,
  validateSearch: z.object({ id: z.string().optional() }),
});

function Success() {
  const { id } = Route.useSearch();
  return (
    <PageShell showBottomNav={false}>
      <div className="mx-auto max-w-md text-center pt-6">
        <div className="mx-auto h-24 w-24 rounded-full bg-green-100 grid place-items-center">
          <CheckCircle2 className="h-14 w-14 text-green-600" />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-foreground">Complaint Submitted</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Your complaint has been sent to the concerned department.
        </p>
        <div className="mt-5 rounded-2xl bg-white border border-border p-4 inline-block">
          <div className="text-xs text-muted-foreground">Complaint ID</div>
          <div className="text-2xl font-bold text-primary">{id ?? "MS-XXXX"}</div>
        </div>
        <div className="mt-7 grid grid-cols-1 gap-3 max-w-sm mx-auto">
          {id && (
            <Link
              to="/complaint/$id"
              params={{ id }}
              className="rounded-2xl bg-primary py-4 font-bold text-primary-foreground"
            >
              Track Complaint
            </Link>
          )}
          <Link
            to="/dashboard"
            className="rounded-2xl bg-white border border-border py-4 font-bold text-foreground"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </PageShell>
  );
}