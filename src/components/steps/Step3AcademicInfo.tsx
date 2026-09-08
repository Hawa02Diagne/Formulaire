import FormField from '../FormField';
import { FormData } from '../../types';

interface Props {
  data: FormData;
  update: (field: string, value: string) => void;
  errors: Record<string, string>;
}

export default function Step3AcademicInfo({ data, update, errors }: Props) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 40 }, (_, i) => String(currentYear - i));

  return (
    <div className="step-content space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-navy-800 mb-1">Parcours académique</h3>
        <p className="text-sm text-gray-500 mb-4">Renseignez votre parcours scolaire et universitaire.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="Dernier diplôme obtenu"
          required
          value={data.dernierDiplome}
          onChange={(e) => update('dernierDiplome', e.target.value)}
          error={errors.dernierDiplome}
          placeholder="Ex: Bac, Licence, Master..."
        />
        <FormField
          label="Établissement d'origine"
          required
          value={data.etablissementOrigine}
          onChange={(e) => update('etablissementOrigine', e.target.value)}
          error={errors.etablissementOrigine}
          placeholder="Ex: Université Cheikh Anta Diop"
        />
        <div>
          <label className="form-label">
            Année d'obtention<span className="text-orange-500 ml-0.5">*</span>
          </label>
          <select
            value={data.anneeObtention}
            onChange={(e) => update('anneeObtention', e.target.value)}
            className="form-input cursor-pointer"
          >
            <option value="">Sélectionnez une année</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          {errors.anneeObtention && <p className="form-error">{errors.anneeObtention}</p>}
        </div>
        <FormField
          label="Moyenne générale"
          value={data.moyenneGenerale}
          onChange={(e) => update('moyenneGenerale', e.target.value)}
          error={errors.moyenneGenerale}
          placeholder="Ex: 14/20"
        />
      </div>
    </div>
  );
}
