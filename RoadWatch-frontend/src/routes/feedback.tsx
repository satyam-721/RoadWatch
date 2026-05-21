import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Star } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/feedback")({
  component: Feedback,
  validateSearch: z.object({ id: z.string().optional() }),
});

function Feedback() {
  const { id } = Route.useSearch();
  const nav = useNavigate();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  return (
    <PageShell>
      <h1 className="text-2xl font-bold text-foreground">Feedback</h1>
      <p className="text-sm text-muted-foreground mt-1">
        {id ? `For complaint ${id}` : "Share your experience with the service."}
      </p>

      <form
        className="mt-5 rounded-3xl bg-white border border-border p-5 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Thank you for your feedback!");
          nav({ to: "/dashboard" });
        }}
      >
        <div className="text-base font-semibold text-foreground">Rate the resolution</div>
        <div className="mt-3 flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              onClick={() => setRating(n)}
              aria-label={`${n} star`}
              className="p-1"
            >
              <Star className={`h-10 w-10 ${n <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
            </button>
          ))}
        </div>

        <label className="mt-5 block text-base font-semibold text-foreground mb-2">Your feedback</label>
        <textarea
          rows={5}
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="msk-input"
          placeholder="Tell us what went well or what can be better"
        />

        <button className="mt-5 w-full rounded-2xl bg-primary py-4 font-bold text-primary-foreground">
          Submit Feedback
        </button>
      </form>
    </PageShell>
  );
}