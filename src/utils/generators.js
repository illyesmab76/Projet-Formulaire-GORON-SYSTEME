// Fonction pour créer un mot de passe sécurisé avec un "@" inséré au hasard
export const generateStrongPassword = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let passwordArray = [];

  // Génère 11 caractères aléatoires (lettres et chiffres)
  for (let i = 0; i < 11; i++) {
    passwordArray.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }

  // Choisit une place au hasard (index 0 à 11) pour ajouter le caractère "@"
  const randomIndex = Math.floor(Math.random() * 12);
  passwordArray.splice(randomIndex, 0, "@");

  return passwordArray.join("");
};

/**
 * Génère le trigramme de l'agent
 * Règle : 1ère lettre du prénom + 2 premières lettres du nom
 * Exemple: Pierre DUPONT → PDU
 */
export const generateTrigramme = (prenom, nom) => {
  if (!prenom || !nom) return "";
  
  // Prend la première lettre du prénom en majuscule
  const p = String(prenom).trim().charAt(0).toUpperCase();
  
  // Prend les deux premières lettres du nom en majuscule
  const n = String(nom).trim().slice(0, 2).toUpperCase();
  
  return `${p}${n}`;
};