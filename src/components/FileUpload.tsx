import { useRef, useState } from 'react';
import { Upload, X, FileCheck2 } from 'lucide-react';

interface FileUploadProps {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  required?: boolean;
  accept?: string;
}

export default function FileUpload({
  label,
  file,
  onChange,
  error,
  required,
  accept = 'image/*,.pdf',
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (f: File) => {
    if (f.size > 10 * 1024 * 1024) {
      alert('Le fichier ne doit pas dépasser 10 Mo.');
      return;
    }
    onChange(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  return (
    <div>
      <label className="form-label">
        {label}
        {required && <span className="text-orange-500 ml-0.5">*</span>}
      </label>

      {!file ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-orange-500 bg-orange-50'
              : 'border-gray-300 hover:border-navy-400 hover:bg-gray-50'
          }`}
        >
          <Upload className="w-8 h-8 mx-auto mb-2 text-navy-400" />
          <p className="text-sm text-navy-600">
            Cliquez ou glissez votre fichier ici
          </p>
          <p className="text-xs text-gray-400 mt-1">
            PDF, JPG, PNG — 10 Mo max
          </p>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200 animate-scale-in">
          <div className="flex items-center gap-2 min-w-0">
            <FileCheck2 className="w-5 h-5 text-green-600 shrink-0" />
            <span className="text-sm text-navy-700 truncate">{file.name}</span>
            <span className="text-xs text-gray-400 shrink-0">
              ({(file.size / 1024 / 1024).toFixed(2)} Mo)
            </span>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-gray-400 hover:text-red-500 transition-colors shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
