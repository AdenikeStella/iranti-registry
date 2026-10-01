import { CheckIcon, UploadIcon } from "lucide-react";
import { useRef, useState } from "react";

interface FileUploadCardProps2 {
    id: string;
    label: string;
    optional?: boolean;
    onFileSelect: (file: File | null ) => void;
    maxSizeMB?: number;
    accept?: string;
}

export function FileUploadCardPractice ({
    id,
    label,
    optional = false,
    onFileSelect,
    maxSizeMB = 5,
    accept = "image/jpeg, image/png, application/pdf",
}: FileUploadCardProps2) {
    const [fileName, setFileName] = useState< string | null>(null);
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

   const handleOnChange = ((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const maxBytes = maxSizeMB * 1024 * 1024;
    if (selected.size > maxBytes) {
        setError(`File too large. Max ${maxSizeMB}MB`)
        setFileName(null);
        return;
    }

    setError("");
    setFileName(selected.name);
    onFileSelect(selected);
    });

    return (
        <span className="flex flex-col mb-5 w-full">
            <label htmlFor={id} className="flex items-center gap-2 text-slate uppercase font-mono text-xs mb-1.5">
                {label} {!optional && <span className="text-clay">*</span>}

                {optional && (
                    <span className="uppercase font-sans bg-[#EDF4EC] text-sage border border-sage/40 rounded px-2 py-0.5 text-[10px] tracking-normal">
                        optional but putting this speeds up your review process
                    </span>
                )}
            </label>

            <button type="button" onClick={() => inputRef.current?.click()} className={`flex flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed py-8 px-4 transition-colors
          ${fileName ? "border-sage bg-sage/10" : "border-line hover:border-slate"}`}>

            {fileName ? (
                <>
                <CheckIcon className="text-sage w-5 h-5"/>
                <span>File Uploaded</span>
                <span>{fileName}</span>
                </>
            ) : (
                <>
                <UploadIcon className="text-slate w-5 h-20"/>
                <span>Tap to upload {label}</span>
                </>
            )}

            <span className="text-xs text-brass font-mono">
                PDF . JPG . PNG - MAX {maxSizeMB} MB
            </span>

            </button>

            <input 
            type="file"
            ref={inputRef}
            id={id}
            accept={accept}
            onChange={handleOnChange}
            className="hidden" />

            {error && <p className="text-clay text-sm mt-1">{error}</p>}
        </span>
    )
}