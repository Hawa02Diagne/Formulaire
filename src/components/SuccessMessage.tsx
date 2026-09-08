import { CheckCircle2, Mail, Phone } from 'lucide-react';

interface SuccessMessageProps {
  nom: string;
  prenom: string;
  email: string;
  formation: string;
}

export default function SuccessMessage({ nom, prenom, email, formation }: SuccessMessageProps) {
  return (
    <div className="text-center py-8 px-4 animate-scale-in">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
        <CheckCircle2 className="w-12 h-12 text-green-600" />
      </div>

      <h2 className="text-2xl font-bold text-navy-800 mb-3">
        Candidature envoyée avec succès !
      </h2>

      <p className="text-navy-600 mb-6 max-w-md mx-auto">
        Bonjour <span className="font-semibold">{prenom} {nom}</span>, votre inscription pour la formation
        <span className="font-semibold"> {formation}</span> a bien été enregistrée.
      </p>

      <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto mb-6 text-left">
        <div className="flex items-center gap-3 mb-3">
          <Mail className="w-5 h-5 text-orange-500 shrink-0" />
          <span className="text-sm text-navy-600">
            Un email de confirmation a été envoyé à <span className="font-medium">{email}</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-orange-500 shrink-0" />
          <span className="text-sm text-navy-600">
            Notre équipe vous contactera prochainement.
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-400">
        Merci de votre confiance. L'équipe SBS School.
      </p>
    </div>
  );
}
