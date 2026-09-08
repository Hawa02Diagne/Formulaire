import FormField from '../FormField';
import { FormData } from '../../types';

interface Props {
  data: FormData;
  update: (field: string, value: string) => void;
  errors: Record<string, string>;
}

export default function Step2ContactInfo({ data, update, errors }: Props) {
  return (
    <div className="step-content space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-navy-800 mb-1">Coordonnées</h3>
        <p className="text-sm text-gray-500 mb-4">Comment pouvons-nous vous contacter ?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="Email"
          required
          type="email"
          value={data.email}
          onChange={(e) => update('email', e.target.value)}
          error={errors.email}
          placeholder="ex: aminata.diop@email.com"
        />
        <FormField
          label="Téléphone"
          required
          type="tel"
          value={data.telephone}
          onChange={(e) => update('telephone', e.target.value)}
          error={errors.telephone}
          placeholder="Ex: +221 77 123 45 67"
        />
        <FormField
          label="Adresse"
          required
          value={data.adresse}
          onChange={(e) => update('adresse', e.target.value)}
          error={errors.adresse}
          placeholder="Ex: Rue 12, Médina"
          className="sm:col-span-2"
        />
        <FormField
          label="Ville"
          required
          value={data.ville}
          onChange={(e) => update('ville', e.target.value)}
          error={errors.ville}
          placeholder="Ex: Dakar"
        />
        <FormField
          label="Pays"
          required
          value={data.pays}
          onChange={(e) => update('pays', e.target.value)}
          error={errors.pays}
          placeholder="Ex: Sénégal"
        />
      </div>
    </div>
  );
}
