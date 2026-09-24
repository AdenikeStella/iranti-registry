import { useState, useRef } from "react";

interface FileUploadCardProps {
  id: string;
  label: string;
  optional?: boolean;
  onFileSelect: (file: File | null) => void;
  maxSizeMB?: number;
  accept?: string;
}

export function FileUploadCard({
  id,
  label,
  optional = false,
  onFileSelect,
  maxSizeMB = 5,
  accept = "image/jpeg,image/png,application/pdf",
}: FileUploadCardProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const maxBytes = maxSizeMB * 1024 * 1024;
    if (selected.size > maxBytes) {
      setError(`File too large. Max ${maxSizeMB}MB.`);
      setFileName(null);
      onFileSelect(null);
      return;
    }

    setError("");
    setFileName(selected.name);
    onFileSelect(selected);
  };

  return (
    <span className="flex flex-col mb-5 w-full">
      <label htmlFor={id} className="flex items-center gap-2 text-slate uppercase font-mono text-xs mb-1.5">
        {label} {!optional && <span className="text-clay">*</span>}
        {optional && (
          <span className="lowercase font-sans bg-sage/20 text-sage border border-sage/40 rounded px-2 py-0.5 text-[10px] tracking-normal">
            optional — speeds up review
          </span>
        )}
      </label>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed py-8 px-4 transition-colors
          ${fileName ? "border-sage bg-sage/10" : "border-line hover:border-slate"}`}
      >
        {fileName ? (
          <>
            <span className="text-sage">✓</span>
            <span className="text-sm text-ink">File uploaded</span>
          </>
        ) : (
          <>
            <span className="text-slate text-xl">⬆</span>
            <span className="text-sm text-slate">Tap to upload</span>
          </>
        )}
        <span className="text-xs text-amber-600 font-mono">
          PDF · JPG · PNG — MAX {maxSizeMB} MB
        </span>
      </button>

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      {error && <p className="text-clay text-xs mt-1">{error}</p>}
    </span>
  );
}

