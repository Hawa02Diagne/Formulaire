# SBS School — Formulaire d'inscription en ligne

Guide d'installation et de configuration complet.

---

## 1. Structure du projet

```
├── index.html                          # Page HTML principale
├── src/
│   ├── App.tsx                          # Application (en-tête, formulaire, pied de page)
│   ├── config.ts                         # Configuration (URL Apps Script, frais, numéros)
│   ├── types.ts                          # Types de données du formulaire
│   ├── index.css                         # Styles globaux (Tailwind + thème SBS)
│   ├── components/
│   │   ├── RegistrationForm.tsx          # Formulaire multi-étapes + soumission
│   │   ├── FormField.tsx                 # Champ de texte réutilisable
│   │   ├── SelectField.tsx              # Liste déroulante réutilisable
│   │   ├── TextAreaField.tsx            # Zone de texte réutilisable
│   │   ├── FileUpload.tsx               # Téléversement de fichiers (glisser-déposer)
│   │   ├── ProgressBar.tsx             # Barre de progression des étapes
│   │   ├── SuccessMessage.tsx           # Message de confirmation
│   │   └── steps/
│   │       ├── Step1PersonalInfo.tsx     # Étape 1 : Informations personnelles
│   │       ├── Step2ContactInfo.tsx      # Étape 2 : Coordonnées
│   │       ├── Step3AcademicInfo.tsx    # Étape 3 : Parcours académique
│   │       ├── Step4FormationChoice.tsx # Étape 4 : Choix de formation
│   │       ├── Step5Motivation.tsx       # Étape 5 : Motivation et projet
│   │       ├── Step6Payment.tsx          # Étape 6 : Paiement et documents
│   │       └── Step7Confirmation.tsx     # Étape 7 : Vérification et confirmation
├── public/
│   └── google-apps-script/
│       └── Code.gs                       # Code Google Apps Script (backend)
```

---

## 2. Configuration de Google Sheets

1. Ouvrez [Google Sheets](https://sheets.google.com) et créez un nouveau classeur.
2. Renommez l'onglet principal en **« Candidatures »**.
3. Dans Extensions > Apps Script, supprimez le code par défaut.
4. Ouvrez le fichier `public/google-apps-script/Code.gs` de ce projet.
5. Copiez tout le contenu et collez-le dans l'éditeur Apps Script.
6. Enregistrez le projet (Ctrl+S).

### Créer les en-têtes du tableau

Dans l'éditeur Apps Script :
1. Sélectionnez la fonction **`setupSheet`** dans la liste déroulante.
2. Cliquez sur **Exécuter**.
3. Autorisez les permissions demandées.

Les en-têtes suivantes seront créées automatiquement :

| Colonne | En-tête |
|---------|---------|
| A | Date |
| B | Nom |
| C | Prénom |
| D | Date de naissance |
| E | Lieu de naissance |
| F | Sexe |
| G | Nationalité |
| H | Email |
| I | Téléphone |
| J | Adresse |
| K | Ville |
| L | Pays |
| M | Dernier diplôme |
| N | Établissement d'origine |
| O | Année d'obtention |
| P | Moyenne générale |
| Q | Formation |
| R | Mode de formation |
| S | Motivation |
| T | Projet professionnel |
| U | Moyen de paiement |
| V | Pièce d'identité (lien) |
| W | Justificatif de paiement (lien) |

---

## 3. Configuration de Google Drive

1. Ouvrez [Google Drive](https://drive.google.com).
2. Créez un nouveau dossier (ex: « SBS School - Documents »).
3. Ouvrez le dossier et regardez l'URL :
   ```
   https://drive.google.com/drive/folders/XXXXXXXXXXXXXXXXX
   ```
4. Copiez l'ID du dossier (la partie `XXXXXXXXXXXXXXXXX`).
5. Dans l'éditeur Apps Script, remplacez la ligne :
   ```
   var DOSSIER_DOCUMENTS_ID = 'REMPLACER_PAR_L_ID_DU_DOSSIER';
   ```
   par votre ID de dossier :
   ```
   var DOSSIER_DOCUMENTS_ID = 'votre_id_dossier_ici';
   ```
6. Enregistrez.

---

## 4. Déploiement du Google Apps Script

1. Dans l'éditeur Apps Script, cliquez sur **Déployer** > **Nouveau déploiement**.
2. Cliquez sur l'icône engrenage et choisissez **Application Web**.
3. Remplissez :
   - **Description** : `Formulaire SBS School`
   - **Exécuter en tant que** : `Moi (votre compte Google)`
   - **Accès** : `Tout le monde`
4. Cliquez sur **Déployer**.
5. Autorisez les permissions (accès à Sheets, Drive, Gmail).
6. Copiez l'**URL de l'application Web** qui s'affiche.

---

## 5. Connexion du formulaire à Google Sheets

1. Ouvrez le fichier `src/config.ts` dans le projet.
2. Remplacez la valeur de `SCRIPT_URL` par l'URL copiée à l'étape précédente :
   ```typescript
   export const CONFIG = {
     SCRIPT_URL: 'https://script.google.com/macros/s/AKfyc.../exec',
     FRAIS_INSCRIPTION: '[Montant à confirmer par SBS]',
     ORANGE_MONEY_NUMBER: '[Numéro à confirmer par SBS]',
     WAVE_NUMBER: '[Numéro à confirmer par SBS]',
   };
   ```
3. Enregistrez le fichier.

---

## 6. Informations à confirmer avec SBS School

Avant de mettre le formulaire en production, complétez les champs suivants dans `src/config.ts` :

| Champ | Description |
|-------|-------------|
| `FRAIS_INSCRIPTION` | Montant des frais d'inscription (ex: « 25 000 FCFA ») |
| `ORANGE_MONEY_NUMBER` | Numéro Orange Money pour le paiement |
| `WAVE_NUMBER` | Numéro Wave pour le paiement |

---

## 7. Tester le formulaire

### En local

1. Ouvrez un terminal dans le dossier du projet.
2. Installez les dépendances :
   ```
   npm install
   ```
3. Lancez le serveur de développement :
   ```
   npm run dev
   ```
4. Ouvrez l'URL affichée dans le terminal (généralement `http://localhost:5173`).
5. Parcourez les 7 étapes du formulaire et remplissez tous les champs.
6. Soumettez la candidature.
7. Vérifiez que :
   - Les données apparaissent dans Google Sheets (onglet « Candidatures »).
   - Les fichiers (pièce d'identité, justificatif) sont dans le dossier Google Drive.
   - Les liens des fichiers sont dans les colonnes V et W du Google Sheet.
   - Un email de confirmation a été envoyé au candidat.

### Test sans Google Apps Script

Si vous n'avez pas encore configuré Google Apps Script, le formulaire affichera un message d'erreur lors de la soumission. C'est normal — les données ne seront pas enregistrées tant que l'URL du script n'est pas configurée.

---

## 8. Mettre le formulaire en ligne

### Option A : Déploiement avec Bolt

Le projet est hébergé sur Bolt. Cliquez sur **Déployer** dans l'interface Bolt pour obtenir un lien public.

### Option B : Déploiement manuel

1. Compilez le projet :
   ```
   npm run build
   ```
2. Le dossier `dist/` contient les fichiers prêts à être hébergés.
3. Déployez sur n'importe quel hébergeur statique :
   - **Netlify** : glissez le dossier `dist/` sur [netlify.com/drop](https://app.netlify.com/drop)
   - **Vercel** : `npx vercel --prod`
   - **GitHub Pages** : poussez le contenu de `dist/` sur la branche `gh-pages`

---

## 9. Suivi des candidatures (côté administration)

### Consulter les candidatures
- Ouvrez le Google Sheet « Candidatures ».
- Chaque soumission apparaît sur une nouvelle ligne avec la date de soumission.

### Rechercher et filtrer
- Utilisez les filtres de Google Sheets (Données > Créer un filtre).
- Filtrez par formation, mode de formation, moyen de paiement, etc.

### Vérifier les preuves de paiement
- Les colonnes **V** et **W** contiennent les liens vers les documents.
- Cliquez sur un lien pour ouvrir le fichier dans Google Drive.
- Vérifiez la pièce d'identité et le justificatif de paiement.

### Suivi
- Ajoutez une colonne **« Statut »** (ex: En attente, Validé, Refusé) pour suivre le traitement.
- Utilisez des couleurs conditionnelles pour visualiser rapidement les statuts.

---

## 10. Personnalisation

### Couleurs
Les couleurs du thème SBS School sont définies dans `tailwind.config.js` :
- **Bleu nuit** : `navy` (du clair au foncé : `navy-50` à `navy-900`)
- **Orange** : `orange` (du clair au foncé : `orange-50` à `orange-900`)
- **Gris clair** : `gray` (classes Tailwind standard)
- **Blanc** : `white`

### Formations proposées
Modifiez la liste dans `src/types.ts` (variable `FORMATION_OPTIONS`) :
```typescript
export const FORMATION_OPTIONS = [
  'Licence en Gestion',
  'Licence en Marketing Digital',
  // Ajoutez ou modifiez les formations ici...
] as const;
```

### Email de confirmation
Modifiez le modèle dans `public/google-apps-script/Code.gs` (fonction `sendConfirmationEmail`).

---

## 11. Dépannage

| Problème | Solution |
|----------|----------|
| « SCRIPT_URL non configuré » | Ajoutez l'URL du script dans `src/config.ts` |
| Les données n'apparaissent pas dans Sheets | Vérifiez que l'onglet s'appelle « Candidatures » |
| Les fichiers ne s'uploadent pas | Vérifiez l'ID du dossier Drive dans `Code.gs` |
| Erreur d'autorisation | Redéployez le script avec les bonnes permissions |
| Le formulaire ne s'affiche pas | Vérifiez que `npm install` a été exécuté |
| CORS error | Vérifiez que le script est déployé avec accès « Tout le monde » |

---

## 12. Technologies utilisées

- **HTML** — Structure de la page
- **CSS / Tailwind CSS** — Mise en forme et design responsive
- **JavaScript / TypeScript / React** — Logique du formulaire
- **Google Apps Script** — Backend (traitement des soumissions)
- **Google Sheets** — Stockage des données des candidatures
- **Google Drive** — Stockage des documents (pièce d'identité, justificatif)
- **Gmail** — Envoi des emails de confirmation

Aucune base de données traditionnelle n'est utilisée (pas de MySQL, Firebase, Supabase, MongoDB ou PostgreSQL).
