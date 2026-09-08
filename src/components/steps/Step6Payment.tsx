import FileUpload from '../FileUpload';
import { FormData, MOYEN_PAIEMENT_OPTIONS } from '../../types';
import { CONFIG } from '../../config';
import { Smartphone, CreditCard } from 'lucide-react';

interface Props {
  data: FormData;
  update: (field: string, value: string) => void;
  updateFile: (field: string, value: File | null) => void;
  errors: Record<string, string>;
}

export default function Step6Payment({ data, update, updateFile, errors }: Props) {
  return (
    <div className="step-content space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-navy-800 mb-1">Paiement et documents</h3>
        <p className="text-sm text-gray-500 mb-4">
          Choisissez votre moyen de paiement et ajoutez vos documents.
        </p>
      </div>

      {/* Frais d'inscription */}
      <div className="bg-navy-50 rounded-lg p-4 border border-navy-100">
        <p className="text-sm text-navy-700">
          <span className="font-semibold">Frais d'inscription :</span>{' '}
          {CONFIG.FRAIS_INSCRIPTION}
        </p>
      </div>

      {/* Moyen de paiement */}
      <div>
        <label className="form-label">
          Moyen de paiement<span className="text-orange-500 ml-0.5">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
          {MOYEN_PAIEMENT_OPTIONS.map((moyen) => (
            <button
              key={moyen}
              type="button"
              onClick={() => update('moyenPaiement', moyen)}
              className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 ${
                data.moyenPaiement === moyen
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-navy-300'
              }`}
            >
              {moyen === 'Orange Money' ? (
                <Smartphone className="w-6 h-6 text-orange-500" />
              ) : (
                <CreditCard className="w-6 h-6 text-navy-500" />
              )}
              <span className="font-medium text-navy-800">{moyen}</span>
            </button>
          ))}
        </div>
        {errors.moyenPaiement && <p className="form-error">{errors.moyenPaiement}</p>}
      </div>

      {/* Numéros de paiement */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
        <p className="text-sm font-medium text-navy-700 mb-2">
          Effectuez le paiement des frais d'inscription au numéro suivant :
        </p>
        <div className="flex items-center gap-2 text-sm text-navy-600">
          <span className="inline-block w-3 h-3 rounded-full bg-orange-500"></span>
          <span className="font-medium">Orange Money :</span> {CONFIG.ORANGE_MONEY_NUMBER}
        </div>
        <div className="flex items-center gap-2 text-sm text-navy-600">
          <span className="inline-block w-3 h-3 rounded-full bg-navy-500"></span>
          <span className="font-medium">Wave :</span> {CONFIG.WAVE_NUMBER}
        </div>
      </div>

      {/* Uploads */}
      <FileUpload
        label="Pièce d'identité (CNI, passeport ou permis)"
        required
        file={data.pieceIdentite}
        onChange={(f) => updateFile('pieceIdentite', f)}
        error={errors.pieceIdentite}
        accept="image/*,.pdf"
      />

      <FileUpload
        label="Justificatif de paiement (capture ou reçu)"
        required
        file={data.justificatifPaiement}
        onChange={(f) => updateFile('justificatifPaiement', f)}
        error={errors.justificatifPaiement}
        accept="image/*,.pdf"
      />
    </div>
  );
}
