import { FormData } from '../../types';
import { Check } from 'lucide-react';

interface Props {
  data: FormData;
  update: (field: string, value: string) => void;
  errors: Record<string, string>;
}

export default function Step7Confirmation({ data, update, errors }: Props) {
  const summarySections = [
    {
      title: 'Informations personnelles',
      items: [
        ['Nom', `${data.prenom} ${data.nom}`],
        ['Date de naissance', data.dateNaissance],
        ['Nationalité', data.nationalite],
      ],
    },
    {
      title: 'Coordonnées',
      items: [
        ['Email', data.email],
        ['Téléphone', data.telephone],
        ['Ville', `${data.ville}, ${data.pays}`],
      ],
    },
    {
      title: 'Formation',
      items: [
        ['Formation', data.formation],
        ['Mode', data.modeFormation],
        ['Moyen de paiement', data.moyenPaiement],
      ],
    },
  ];

  return (
    <div className="step-content space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-navy-800 mb-1">Vérification et confirmation</h3>
        <p className="text-sm text-gray-500 mb-4">
          Vérifiez vos informations avant de soumettre votre candidature.
        </p>
      </div>

      {summarySections.map((section) => (
        <div key={section.title} className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-navy-700 mb-3">{section.title}</h4>
          <dl className="space-y-2">
            {section.items.map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <dt className="text-gray-500">{label}</dt>
                <dd className="font-medium text-navy-800 text-right">{value || '—'}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-navy-700 mb-2">Documents</h4>
        <ul className="space-y-1.5 text-sm">
          <li className="flex items-center gap-2">
            <Check className={`w-4 h-4 ${data.pieceIdentite ? 'text-green-600' : 'text-gray-300'}`} />
            <span className={data.pieceIdentite ? 'text-navy-700' : 'text-gray-400'}>
              Pièce d'identité {data.pieceIdentite ? `(${data.pieceIdentite.name})` : '(non fournie)'}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Check className={`w-4 h-4 ${data.justificatifPaiement ? 'text-green-600' : 'text-gray-300'}`} />
            <span className={data.justificatifPaiement ? 'text-navy-700' : 'text-gray-400'}>
              Justificatif de paiement {data.justificatifPaiement ? `(${data.justificatifPaiement.name})` : '(non fourni)'}
            </span>
          </li>
        </ul>
      </div>

      <label
        className={`flex items-start gap-3 cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 ${
          data.confirmation ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:bg-gray-50'
        }`}
      >
        <input
          type="checkbox"
          checked={data.confirmation}
          onChange={(e) => update('confirmation', e.target.checked ? 'true' : 'false')}
          className="mt-0.5 w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
        />
        <span className="text-sm text-navy-600">
          J'atteste sur l'honneur que les informations fournies dans ce formulaire sont exactes et complètes.
          J'accepte que SBS School traite ces données dans le cadre de mon inscription.
        </span>
      </label>
      {errors.confirmation && <p className="form-error">{errors.confirmation}</p>}
    </div>
  );
}
