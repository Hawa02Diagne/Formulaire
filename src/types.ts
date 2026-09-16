export interface FormData {
  // Étape 1 — Informations personnelles
  nom: string;
  prenom: string;
  dateNaissance: string;
  lieuNaissance: string;
  sexe: string;
  nationalite: string;

  // Étape 2 — Coordonnées
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  pays: string;

  // Étape 3 — Parcours académique
  dernierDiplome: string;
  etablissementOrigine: string;
  anneeObtention: string;
  moyenneGenerale: string;

  // Étape 4 — Formation
  formation: string;
  modeFormation: string;

  // Étape 5 — Motivation
  motivation: string;
  projetProfessionnel: string;

  // Étape 6 — Paiement
  moyenPaiement: string;
  pieceIdentite: File | null;
  justificatifPaiement: File | null;

  // Étape 7 — Confirmation
  confirmation: boolean;
}

export const initialFormData: FormData = {
  nom: '',
  prenom: '',
  dateNaissance: '',
  lieuNaissance: '',
  sexe: '',
  nationalite: '',

  email: '',
  telephone: '',
  adresse: '',
  ville: '',
  pays: '',

  dernierDiplome: '',
  etablissementOrigine: '',
  anneeObtention: '',
  moyenneGenerale: '',

  formation: '',
  modeFormation: '',

  motivation: '',
  projetProfessionnel: '',

  moyenPaiement: '',
  pieceIdentite: null,
  justificatifPaiement: null,

  confirmation: false,
};

export const FORMATION_OPTIONS = [
  'Licence Pro CSPS',
  'Licence Pro LOGDOS',
] as const;

export const MODE_FORMATION_OPTIONS = [
  'Présentiel',
  'En ligne',
  'Hybride',
] as const;

export const MOYEN_PAIEMENT_OPTIONS = [
  'Orange Money',
  'Wave',
] as const;

export const SEXE_OPTIONS = ['Masculin', 'Féminin'] as const;
