import { useState, useCallback } from "react";
import { generateStrongPassword, generateTrigramme } from "../utils/generators";
import { generateWordDocument } from "../utils/WordService";

// ─── HELPERS ──────────────────────────────────────────────────────────────
const getTodayFR = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
};

// ─── HOOK PRINCIPAL ───────────────────────────────────────────────────────
export const useIdentifiantForm = () => {
  // ─── États de navigation ────────────────────────────────────────────────
  const [isLocked, setIsLocked] = useState(false);
  const [showInfoEquip, setShowInfoEquip] = useState(false);
  const [showFinalRecap, setShowFinalRecap] = useState(false);
  const [showFiche, setShowFiche] = useState(false);

  // ─── État du formulaire ─────────────────────────────────────────────────
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    date: getTodayFR(),
    modele: "",
    emailGenere: "",
    passwordGenere: "",
    trigrammeGenere: "",
    equipements: [],
    Monsieur: "",
    signature: null,
    nomSignature: null,
    DateSignature: getTodayFR(),
  });

  // ─── Handlers de formulaire ────────────────────────────────────────────
  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSaveSignature = useCallback((sig) => {
    setForm(prev => ({ ...prev, signature: sig }));
  }, []);

  const handleSaveNomSignature = useCallback((sig) => {
    setForm(prev => ({ ...prev, nomSignature: sig }));
  }, []);

  // ─── Validation et génération ───────────────────────────────────────────
  const handleValidate = useCallback(() => {
    const cleanNom = form.nom.trim().toLowerCase().replace(/\s+/g, "");
    const cleanPrenom = form.prenom.trim().toLowerCase();
    
    setForm((prev) => ({
      ...prev,
      emailGenere: `${cleanPrenom[0] || ""}.${cleanNom}@goron-systemes.fr`,
      passwordGenere: generateStrongPassword(),
      trigrammeGenere: generateTrigramme(prev.prenom, prev.nom),
    }));
    setIsLocked(true);
  }, [form.nom, form.prenom]);

  // ─── Gestion des équipements ────────────────────────────────────────────
  const handleAddEquipement = useCallback((newEquip) => {
    setForm(prev => ({
      ...prev,
      equipements: [...prev.equipements, newEquip]
    }));
  }, []);

  const handleDeleteEquipement = useCallback((index) => {
    setForm(prev => ({
      ...prev,
      equipements: prev.equipements.filter((_, i) => i !== index)
    }));
  }, []);

  // ─── Génération du document Word ────────────────────────────────────────
  const handleCreateFiche = useCallback(async () => {
    const data = {
      nom: form.nom,
      prenom: form.prenom,
      monsieur: form.Monsieur, 
      date: form.date,
      email: form.emailGenere,
      trigramme: form.trigrammeGenere,
      password: form.passwordGenere,
      dateSignature: form.DateSignature,
      signature: form.signature,
      signatureAnimateur: form.nomSignature,
      equipements: form.equipements || []
    };

    const result = await generateWordDocument("/template.docx", data);
    
    if (result.success) {
      alert("Fiche créée avec succès !");
      return true;
    } else {
      alert("Erreur lors de la génération. Vérifiez le fichier template.docx");
      return false;
    }
  }, [form]);

  // ─── Validation de complétude ───────────────────────────────────────────
  const isFicheComplete = Boolean(
    form.Monsieur && 
    form.DateSignature && 
    form.signature &&
    form.nomSignature
  );

  // ─── Retour de toutes les méthodes et états ────────────────────────────
  return {
    // États
    form,
    isLocked,
    showInfoEquip,
    showFinalRecap,
    showFiche,
    isFicheComplete,
    
    // Setters
    setForm, // <--- AJOUTÉ : Crucial pour le chargement des fiches existantes
    setIsLocked,
    setShowInfoEquip,
    setShowFinalRecap,
    setShowFiche,
    
    // Handlers
    handleFormChange,
    handleValidate,
    handleAddEquipement,
    handleDeleteEquipement,
    handleSaveSignature,
    handleSaveNomSignature,
    handleCreateFiche,
  };
};