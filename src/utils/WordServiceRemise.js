import { saveAs } from "file-saver";

export const generateRemiseDocument = async (formData) => {
  try {
    console.log("🚀 REACT : Envoi vers Django...");
    
    const response = await fetch('http://localhost:8000/api/generate-pdf/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      console.error("❌ REACT : Erreur HTTP", response.status);
      throw new Error(`Erreur ${response.status}`);
    }
    
    const blob = await response.blob();
    console.log("📄 REACT : PDF reçu, taille:", blob.size, "bytes");
    
    saveAs(blob, `Remise_${formData.numAffaire}_DJANGO.pdf`);
    
    console.log("✅ REACT : Téléchargement lancé");
    return { success: true };
    
  } catch (error) {
    console.error("❌ REACT : Erreur -", error);
    return { success: false, error: error.message };
  }
};