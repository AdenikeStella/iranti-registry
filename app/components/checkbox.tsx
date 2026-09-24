interface CheckboxProps {
  id: string;
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
}

export function Checkbox({ id, label, checked, onChange, required = false }: CheckboxProps) {
  return (
    <label htmlFor={id} className="flex items-start gap-2.5 cursor-pointer select-none">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required={required}
        className="peer sr-only"
      />
      <span
        className="flex-shrink-0 mt-0.5 h-5 w-5 rounded border border-line bg-white
          flex items-center justify-center
          peer-checked:bg-ink peer-checked:border-ink
          peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-ink
          transition-colors"
      >
        {checked && (
          <svg
            className="h-3.5 w-3.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <span className="text-sm text-ink">
        {label} {required && <span className="text-clay">*</span>}
      </span>
    </label>
  );
}