interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
  maxLength?: number;
}

export default function TextAreaField({
  label,
  value,
  onChange,
  error,
  required,
  rows = 4,
  placeholder,
  maxLength,
}: TextAreaFieldProps) {
  return (
    <div>
      <label className="form-label">
        {label}
        {required && <span className="text-orange-500 ml-0.5">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
        className="form-input resize-none"
      />
      <div className="flex justify-between items-center mt-1">
        {error ? (
          <p className="form-error">{error}</p>
        ) : (
          <span />
        )}
        {maxLength && (
          <span className="text-xs text-gray-400">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
