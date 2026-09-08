import { forwardRef } from 'react';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, required, className, ...props }, ref) => {
    return (
      <div className={className}>
        <label className="form-label">
          {label}
          {required && <span className="text-orange-500 ml-0.5">*</span>}
        </label>
        <input ref={ref} className="form-input" {...props} />
        {error && <p className="form-error">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;
