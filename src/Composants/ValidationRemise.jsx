// ─── Fonction utilitaire 1 : valider le format d'une date française ─────────
// Même fonction qu'on a déjà vue dans useFormValidation.
// Elle vérifie que la date respecte le format JJ/MM/AAAA avec une regex.
export const isValidDateFR = (date) =>
  /^\d{2}\/\d{2}\/\d{4}$/.test(date);

// ─── Fonction utilitaire 2 : vérifier qu'une valeur n'est pas vide ──────────
// Même fonction qu'on a déjà vue dans useFormValidation.
// Elle vérifie que la valeur n'est pas undefined, null, ou un texte vide.
export const isFilled = (value) =>
  value !== undefined &&
  value !== null &&
  value.toString().trim() !== "";

// ─── Fonction de validation : ValidationRemise ──────────────────────────────
// Elle fonctionne exactement comme useFormValidation qu'on a déjà vu,
// mais elle ne valide qu'un sous-ensemble de champs.
// Elle est utilisée probablement pour un formulaire plus simple,
// comme une page de "remise" qui ne demande que les infos de base
// + la signature (pas tous les identifiants/mots de passe).
//
// Props reçues :
//   - form → objet contenant les valeurs du formulaire
const ValidationRemise = (form) => {
  const isValid =
    // ── Informations personnelles ──────────────────────────────────────
    isFilled(form.nom) &&                // ← Le nom est rempli ?
    isFilled(form.prenom) &&             // ← Le prénom est rempli ?
    isValidDateFR(form.date) &&          // ← La date est au bon format ?

    // ── Informations de signature ──────────────────────────────────────
    isFilled(form.Monsieur) &&           // ← Le nom du signataire est rempli ?
    isValidDateFR(form.DateSignature) && // ← La date de signature est valide ?
    isFilled(form.signatureImage) &&     // ← La signature a été dessinée ?
    isFilled(form.NomSignature);         // ← La signature du nom est présente ?

  return { isValid };
};

// ─── Export du composant ─────────────────────────────────────────────────────
export default ValidationRemise;