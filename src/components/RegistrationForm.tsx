import { useState } from 'react';
import { ChevronLeft, ChevronRight, Send, Loader2, AlertCircle } from 'lucide-react';
import { FormData, initialFormData } from '../types';
import ProgressBar from './ProgressBar';
import SuccessMessage from './SuccessMessage';
import Step1PersonalInfo from './steps/Step1PersonalInfo';
import Step2ContactInfo from './steps/Step2ContactInfo';
import Step3AcademicInfo from './steps/Step3AcademicInfo';
import Step4FormationChoice from './steps/Step4FormationChoice';
import Step5Motivation from './steps/Step5Motivation';
import Step6Payment from './steps/Step6Payment';
import Step7Confirmation from './steps/Step7Confirmation';
import { CONFIG } from '../config';

const STEPS = [
  'Informations personnelles',
  'Coordonnées',
  'Parcours académique',
  'Formation',
  'Motivation',
  'Paiement',
  'Confirmation',
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [submitError, setSubmitError] = useState('');

  const update = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const updateFile = (field: string, value: File | null) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const stepErrors: Record<string, string> = {};

    const required = (val: string, field: string, label: string) => {
      if (!val.trim()) stepErrors[field] = `${label} est obligatoire.`;
    };

    switch (step) {
      case 0:
        required(data.nom, 'nom', 'Le nom');
        required(data.prenom, 'prenom', 'Le prénom');
        required(data.dateNaissance, 'dateNaissance', 'La date de naissance');
        required(data.lieuNaissance, 'lieuNaissance', 'Le lieu de naissance');
        required(data.sexe, 'sexe', 'Le sexe');
        required(data.nationalite, 'nationalite', 'La nationalité');
        break;
      case 1:
        required(data.email, 'email', 'L\'email');
        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
          stepErrors.email = 'L\'email n\'est pas valide.';
        }
        required(data.telephone, 'telephone', 'Le téléphone');
        required(data.adresse, 'adresse', 'L\'adresse');
        required(data.ville, 'ville', 'La ville');
        required(data.pays, 'pays', 'Le pays');
        break;
      case 2:
        required(data.dernierDiplome, 'dernierDiplome', 'Le dernier diplôme');
        required(data.etablissementOrigine, 'etablissementOrigine', 'L\'établissement d\'origine');
        required(data.anneeObtention, 'anneeObtention', 'L\'année d\'obtention');
        break;
      case 3:
        required(data.formation, 'formation', 'La formation');
        required(data.modeFormation, 'modeFormation', 'Le mode de formation');
        break;
      case 4:
        required(data.motivation, 'motivation', 'La lettre de motivation');
        required(data.projetProfessionnel, 'projetProfessionnel', 'Le projet professionnel');
        break;
      case 5:
        required(data.moyenPaiement, 'moyenPaiement', 'Le moyen de paiement');
        if (!data.pieceIdentite) stepErrors.pieceIdentite = 'La pièce d\'identité est obligatoire.';
        if (!data.justificatifPaiement) stepErrors.justificatifPaiement = 'Le justificatif de paiement est obligatoire.';
        break;
      case 6:
        if (!data.confirmation) stepErrors.confirmation = 'Vous devez accepter la déclaration de confirmation.';
        break;
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    if (!validateStep(6)) return;

    setStatus('submitting');
    setSubmitError('');

    try {
      if (!CONFIG.SCRIPT_URL) {
        throw new Error('SCRIPT_URL non configuré. Veuillez configurer l\'URL du Google Apps Script dans src/config.ts.');
      }

      const pieceIdentiteB64 = data.pieceIdentite ? await fileToBase64(data.pieceIdentite) : '';
      const justificatifPaiementB64 = data.justificatifPaiement ? await fileToBase64(data.justificatifPaiement) : '';

      const payload = new URLSearchParams();
      payload.append('data', JSON.stringify({
        nom: data.nom,
        prenom: data.prenom,
        dateNaissance: data.dateNaissance,
        lieuNaissance: data.lieuNaissance,
        sexe: data.sexe,
        nationalite: data.nationalite,
        email: data.email,
        telephone: data.telephone,
        adresse: data.adresse,
        ville: data.ville,
        pays: data.pays,
        dernierDiplome: data.dernierDiplome,
        etablissementOrigine: data.etablissementOrigine,
        anneeObtention: data.anneeObtention,
        moyenneGenerale: data.moyenneGenerale,
        formation: data.formation,
        modeFormation: data.modeFormation,
        motivation: data.motivation,
        projetProfessionnel: data.projetProfessionnel,
        moyenPaiement: data.moyenPaiement,
      }));
      payload.append('pieceIdentite', pieceIdentiteB64);
      payload.append('justificatifPaiement', justificatifPaiementB64);

      const response = await fetch(CONFIG.SCRIPT_URL, {
        method: 'POST',
        body: payload,
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
      } else {
        throw new Error(result.message || 'La soumission a échoué.');
      }
    } catch (err) {
      setStatus('error');
      setSubmitError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la soumission.');
    }
  };

  if (status === 'success') {
    return (
      <SuccessMessage
        nom={data.nom}
        prenom={data.prenom}
        email={data.email}
        formation={data.formation}
      />
    );
  }

  return (
    <div>
      <ProgressBar currentStep={currentStep} totalSteps={STEPS.length} steps={STEPS} />

      <div className="mt-8">
        {currentStep === 0 && <Step1PersonalInfo data={data} update={update} errors={errors} />}
        {currentStep === 1 && <Step2ContactInfo data={data} update={update} errors={errors} />}
        {currentStep === 2 && <Step3AcademicInfo data={data} update={update} errors={errors} />}
        {currentStep === 3 && <Step4FormationChoice data={data} update={update} errors={errors} />}
        {currentStep === 4 && <Step5Motivation data={data} update={update} errors={errors} />}
        {currentStep === 5 && <Step6Payment data={data} update={update} updateFile={updateFile} errors={errors} />}
        {currentStep === 6 && <Step7Confirmation data={data} update={update} errors={errors} />}
      </div>

      {status === 'error' && (
        <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3 animate-fade-in">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-700">Erreur lors de la soumission</p>
            <p className="text-sm text-red-600 mt-0.5">{submitError}</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentStep === 0 || status === 'submitting'}
          className="btn-secondary flex items-center gap-1.5"
        >
          <ChevronLeft className="w-5 h-5" />
          Précédent
        </button>

        {currentStep < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="btn-primary flex items-center gap-1.5"
          >
            Suivant
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={status === 'submitting'}
            className="btn-primary flex items-center gap-2"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Soumettre ma candidature
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
