import FormField from '../FormField';
import SelectField from '../SelectField';
import { FormData, SEXE_OPTIONS } from '../../types';

interface Props {
  data: FormData;
  update: (field: string, value: string) => void;
  errors: Record<string, string>;
}

export default function Step1PersonalInfo({ data, update, errors }: Props) {
  return (
    <div className="step-content space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-navy-800 mb-1">Informations personnelles</h3>
        <p className="text-sm text-gray-500 mb-4">Renseignez vos informations personnelles de base.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="Nom"
          required
          value={data.nom}
          onChange={(e) => update('nom', e.target.value)}
          error={errors.nom}
          placeholder="Ex: Diop"
        />
        <FormField
          label="Prénom"
          required
          value={data.prenom}
          onChange={(e) => update('prenom', e.target.value)}
          error={errors.prenom}
          placeholder="Ex: Aminata"
        />
        <FormField
          label="Date de naissance"
          required
          type="date"
          value={data.dateNaissance}
          onChange={(e) => update('dateNaissance', e.target.value)}
          error={errors.dateNaissance}
        />
        <FormField
          label="Lieu de naissance"
          required
          value={data.lieuNaissance}
          onChange={(e) => update('lieuNaissance', e.target.value)}
          error={errors.lieuNaissance}
          placeholder="Ex: Dakar"
        />
        <SelectField
          label="Sexe"
          required
          value={data.sexe}
          onChange={(v) => update('sexe', v)}
          options={SEXE_OPTIONS}
          error={errors.sexe}
        />
        <FormField
          label="Nationalité"
          required
          value={data.nationalite}
          onChange={(e) => update('nationalite', e.target.value)}
          error={errors.nationalite}
          placeholder="Ex: Sénégalaise"
        />
      </div>
    </div>
  );
}
