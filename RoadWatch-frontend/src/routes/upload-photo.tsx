import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Camera, Upload, Info } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { getDraft, setDraft } from "@/lib/mock-store";

export const Route = createFileRoute("/upload-photo")({ component: UploadPhoto });

function UploadPhoto() {
  const nav = useNavigate();
  const ref = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<string | undefined>();

  useEffect(() => {
    setImg(getDraft().photo);
  }, []);

  const onFile = (f?: File | null) => {
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      const url = r.result as string;
      setImg(url);
      setDraft({ photo: url });
    };
    r.readAsDataURL(f);
  };

  return (
    <PageShell>
      <h1 className="text-2xl font-bold text-foreground">Upload Road Photo</h1>
      <p className="text-sm text-muted-foreground mt-1">A clear photo helps faster resolution.</p>

      <div className="mt-5 rounded-3xl bg-white border-2 border-dashed border-primary/60 p-6 text-center shadow-sm">
        {img ? (
          <img src={img} alt="Road" className="mx-auto max-h-80 rounded-2xl object-cover" />
        ) : (
          <div
            onClick={() => ref.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              onFile(e.dataTransfer.files?.[0]);
            }}
            className="cursor-pointer py-10"
          >
            <div className="mx-auto h-20 w-20 rounded-full bg-secondary text-secondary-foreground grid place-items-center">
              <Camera className="h-10 w-10" />
            </div>
            <div className="mt-3 font-semibold text-foreground">Tap to take a photo</div>
            <div className="text-sm text-muted-foreground">or drag and drop an image here</div>
          </div>
        )}
        <input
          ref={ref}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0])}
        />
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground"
        >
          <Upload className="h-5 w-5" /> {img ? "Retake Photo" : "Choose Photo"}
        </button>
      </div>

      <div className="mt-4 rounded-2xl bg-blue-50 border border-blue-200 p-4 flex gap-3">
        <Info className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-900">Clear road photo helps faster resolution.</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button onClick={() => nav({ to: "/report" })} className="rounded-2xl bg-white border border-border py-4 font-bold text-foreground">
          Back
        </button>
        <button disabled={!img} onClick={() => nav({ to: "/report-details" })} className="rounded-2xl bg-primary py-4 font-bold text-primary-foreground disabled:opacity-50">
          Continue
        </button>
      </div>
    </PageShell>
  );
}