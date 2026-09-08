import SelectField from '../SelectField';
import { FormData, FORMATION_OPTIONS, MODE_FORMATION_OPTIONS } from '../../types';

interface Props {
  data: FormData;
  update: (field: string, value: string) => void;
  errors: Record<string, string>;
}

export default function Step4FormationChoice({ data, update, errors }: Props) {
  return (
    <div className="step-content space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-navy-800 mb-1">Choix de formation</h3>
        <p className="text-sm text-gray-500 mb-4">Sélectionnez la formation et le mode qui vous conviennent.</p>
      </div>

      <div className="space-y-4">
        <SelectField
          label="Formation souhaitée"
          required
          value={data.formation}
          onChange={(v) => update('formation', v)}
          options={FORMATION_OPTIONS}
          error={errors.formation}
          placeholder="Choisissez une formation..."
        />

        <div>
          <label className="form-label">
            Mode de formation<span className="text-orange-500 ml-0.5">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
            {MODE_FORMATION_OPTIONS.map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => update('modeFormation', mode)}
                className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                  data.modeFormation === mode
                    ? 'border-orange-500 bg-orange-50 text-navy-800'
                    : 'border-gray-200 hover:border-navy-300 text-navy-600'
                }`}
              >
                <span className="font-medium">{mode}</span>
              </button>
            ))}
          </div>
          {errors.modeFormation && <p className="form-error">{errors.modeFormation}</p>}
        </div>
      </div>
    </div>
  );
}
