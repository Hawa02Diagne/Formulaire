/**
 * ============================================================================
 * SBS School — Formulaire d'inscription en ligne
 * Google Apps Script — Backend (Google Sheets + Google Drive)
 * ============================================================================
 *
 * INSTRUCTIONS D'INSTALLATION :
 *
 * 1. Créez un nouveau Google Sheet.
 *    - Renommez l'onglet principal en "Candidatures".
 *    - Ajoutez les en-têtes suivants dans la ligne 1 (colonnes A à T) :
 *
 *      Date | Nom | Prénom | Date de naissance | Lieu de naissance |
 *      Sexe | Nationalité | Email | Téléphone | Adresse | Ville | Pays |
 *      Dernier diplôme | Établissement d'origine | Année d'obtention |
 *      Moyenne générale | Formation | Mode de formation | Motivation |
 *      Projet professionnel | Moyen de paiement | Pièce d'identité (lien) |
 *      Justificatif de paiement (lien)
 *
 * 2. Dans Google Sheets, allez dans Extensions > Apps Script.
 *    - Supprimez le code existant, collez tout ce fichier.
 *    - Enregistrez le projet (Ctrl+S).
 *
 * 3. Créez un dossier dans Google Drive pour stocker les documents.
 *    - Copiez l'ID du dossier (présent dans l'URL du dossier).
 *    - Remplacez la valeur de DOSSIER_DOCUMENTS_ID ci-dessous.
 *
 * 4. Déployez comme application Web :
 *    - Cliquez sur Déployer > Nouveau déploiement.
 *    - Type : Application Web.
 *    - Exécuter en tant que : Moi (votre compte Google).
 *    - Accès : Tout le monde.
 *    - Cliquez sur Déployer.
 *    - Copiez l'URL de l'application Web.
 *
 * 5. Collez cette URL dans src/config.ts du projet (SCRIPT_URL).
 *
 * 6. Autorisez les permissions demandées lors du premier déploiement.
 *
 * ============================================================================
 */

// === CONFIGURATION ==========================================================

// ID du dossier Google Drive où stocker les documents
// Remplacez par l'ID de votre dossier (visible dans l'URL du dossier)
var DOSSIER_DOCUMENTS_ID = 'REMPLACER_PAR_L_ID_DU_DOSSIER';

// === FONCTION PRINCIPALE =====================================================

function doPost(e) {
  var corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    // Gérer les requêtes OPTIONS (CORS preflight)
    if (e.parameter.method === 'OPTIONS' || (e.postData && e.postData.type === '')) {
      return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var data;
    var files = {};

    // Analyser les données multipart ou JSON
    if (e.postData && e.postData.type === 'application/json') {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter.data) {
      data = JSON.parse(e.parameter.data);
      // Les fichiers sont passés dans e.parameters
      if (e.parameters.pieceIdentite) {
        files.pieceIdentite = e.parameters.pieceIdentite[0];
      }
      if (e.parameters.justificatifPaiement) {
        files.justificatifPaiement = e.parameters.justificatifPaiement[0];
      }
    } else {
      data = e.parameter;
    }

    // Valider les données requises
    if (!data.nom || !data.prenom || !data.email) {
      return jsonResponse({
        success: false,
        message: 'Données incomplètes : nom, prénom et email sont obligatoires.',
      }, corsHeaders);
    }

    // Enregistrer les fichiers dans Google Drive
    var pieceIdentiteUrl = '';
    var justificatifPaiementUrl = '';

    if (files.pieceIdentite) {
      pieceIdentiteUrl = saveFileToDrive(files.pieceIdentite, data.nom + '_' + data.prenom + '_piece_identite');
    }

    if (files.justificatifPaiement) {
      justificatifPaiementUrl = saveFileToDrive(files.justificatifPaiement, data.nom + '_' + data.prenom + '_justificatif_paiement');
    }

    // Enregistrer les données dans Google Sheets
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Candidatures');
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      sheet.setName('Candidatures');
    }

    var timestamp = new Date().toLocaleString('fr-FR');

    sheet.appendRow([
      timestamp,
      data.nom || '',
      data.prenom || '',
      data.dateNaissance || '',
      data.lieuNaissance || '',
      data.sexe || '',
      data.nationalite || '',
      data.email || '',
      data.telephone || '',
      data.adresse || '',
      data.ville || '',
      data.pays || '',
      data.dernierDiplome || '',
      data.etablissementOrigine || '',
      data.anneeObtention || '',
      data.moyenneGenerale || '',
      data.formation || '',
      data.modeFormation || '',
      data.motivation || '',
      data.projetProfessionnel || '',
      data.moyenPaiement || '',
      pieceIdentiteUrl,
      justificatifPaiementUrl,
    ]);

    // Envoyer un email de confirmation (optionnel)
    if (data.email) {
      try {
        sendConfirmationEmail(data);
      } catch (emailErr) {
        // L'envoi d'email a échoué mais on ne bloque pas l'inscription
        Logger.log('Erreur envoi email: ' + emailErr);
      }
    }

    return jsonResponse({
      success: true,
      message: 'Votre candidature a été enregistrée avec succès. Vous recevrez une confirmation par email.',
    }, corsHeaders);

  } catch (error) {
    Logger.log('Erreur: ' + error.toString());
    return jsonResponse({
      success: false,
      message: 'Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer ou contacter SBS School.',
    }, corsHeaders);
  }
}

// Gérer les requêtes GET (test de connexion)
function doGet() {
  return jsonResponse({
    success: true,
    message: 'SBS School - API d\'inscription en ligne. Utilisez POST pour soumettre une candidature.',
  }, {
    'Access-Control-Allow-Origin': '*',
  });
}

// Gérer les requêtes OPTIONS (CORS preflight)
function doOptions() {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON);
}

// === FONCTIONS UTILITAIRES ===================================================

/**
 * Enregistre un fichier dans Google Drive et retourne le lien de partage.
 */
function saveFileToDrive(fileData, fileName) {
  var folder = DriveApp.getFolderById(DOSSIER_DOCUMENTS_ID);

  // Le fichier est envoyé en base64
  var decodedData = Utilities.base64Decode(fileData);

  var blob = Utilities.newBlob(decodedData);
  blob.setName(fileName);

  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  return file.getUrl();
}

/**
 * Envoie un email de confirmation au candidat.
 */
function sendConfirmationEmail(data) {
  var subject = 'Confirmation de votre inscription - SBS School';
  var body = 'Bonjour ' + data.prenom + ' ' + data.nom + ',\n\n' +
    'Nous avons bien reçu votre candidature pour la formation : ' + data.formation + '.\n\n' +
    'Voici un récapitulatif de vos informations :\n' +
    '- Nom : ' + data.nom + '\n' +
    '- Prénom : ' + data.prenom + '\n' +
    '- Email : ' + data.email + '\n' +
    '- Téléphone : ' + data.telephone + '\n' +
    '- Formation : ' + data.formation + '\n' +
    '- Mode de formation : ' + data.modeFormation + '\n' +
    '- Moyen de paiement : ' + data.moyenPaiement + '\n\n' +
    'Notre équipe va examiner votre candidature et vous contactera prochainement.\n\n' +
    'Cordialement,\n' +
    'L\'équipe SBS School';

  MailApp.sendEmail(data.email, subject, body);
}

/**
 * Retourne une réponse JSON avec les en-têtes CORS.
 */
function jsonResponse(data, corsHeaders) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);

  // Google Apps Script ne permet pas de définir des en-têtes personnalisés
  // directement, mais le ContentService gère le CORS côté client
  return output;
}

/**
 * Crée les en-têtes du Google Sheet si la feuille est vide.
 * À exécuter manuellement une fois depuis l'éditeur Apps Script.
 */
function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Candidatures');
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.setName('Candidatures');
  }

  if (sheet.getLastRow() === 0) {
    var headers = [
      'Date',
      'Nom',
      'Prénom',
      'Date de naissance',
      'Lieu de naissance',
      'Sexe',
      'Nationalité',
      'Email',
      'Téléphone',
      'Adresse',
      'Ville',
      'Pays',
      'Dernier diplôme',
      'Établissement d\'origine',
      'Année d\'obtention',
      'Moyenne générale',
      'Formation',
      'Mode de formation',
      'Motivation',
      'Projet professionnel',
      'Moyen de paiement',
      'Pièce d\'identité (lien)',
      'Justificatif de paiement (lien)',
    ];

    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    // Mettre en forme les en-têtes
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground('#0a1e3f')
      .setFontColor('#ffffff')
      .setFontWeight('bold')
      .setFontSize(11);

    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  }
}
