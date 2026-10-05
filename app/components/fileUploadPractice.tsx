import { Upload } from "lucide-react";
import { useRef, useState } from "react";

interface FileUploadCardProps {
    id: string;
    label: string;
    onFileSelect: (file: File) => void;
    maxSizeMB?: number;
    accept?: string;
    optional?: boolean;
}

export function FileUploadCardPractice ({
    label, 
    id, 
    maxSizeMB = 5, 
    accept = "image/jpeg, image/png, application/pdf", 
    onFileSelect, 
    optional = false,
}: FileUploadCardProps ) {
    const [fileName, setFileName] = useState<string | null>(null);
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if(!selected) return;

        const maxBytes = maxSizeMB * 1024 * 1024;
        if (selected.size > maxBytes) {
            setError(`File too large. Max ${maxSizeMB}MB`)
            setFileName(null);
            return
        }

        setError(" ")
        setFileName(selected.name);
        onFileSelect(selected);
    }

    
    return (
        <span className="flex flex-col mb-5 w-full">
            <label htmlFor={id} className="uppercase items-center gap-2 text-slate font-mono text-xs mb-1.5">
                {label} {!optional && <span className="text-clay">*</span>}
                {optional && (
                    <span className="border border-sage bg-sage/20 text-sage text-[10px] px-2 py-0.5 font-sans lowercase tracking normal">
                        optional but putting this speeds up your review process
                    </span>
                )}
            </label>

            <button
            type="button" 
            className={`flex flex-col border border-dashed border-slate items-center justify-center gap-3 w-full px-4 py-8 transition-colors ${fileName ? "border-sage bg-sage/20" : "border-line hover:bg-slate/20"}`}
            onClick={() => inputRef.current?.click()}>
                <Upload className="w-5 h-5"/>
                <span>Tap to Upload {label}</span>
                <span className="text-clay">
                    pdf . jpg . png . max {maxSizeMB}MB 
                </span>

            </button>

            <input
            ref={inputRef}
            type="file"
            onChange={handleChange}
            id={id}
            className="hidden"
            accept={accept}/>

            {error && <span className="text-clay text-xs mt-1">{error}</span>}
        </span>
    )
}