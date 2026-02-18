import { saveAs } from "file-saver";

// Fonction pour convertir File en base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]); // On enlève "data:...;base64,"
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Préparer les données avec fichiers en base64
const prepareDataWithFiles = async (formData) => {
  const equipementsWithFiles = await Promise.all(
    (formData.equipements || []).map(async (eq) => ({
      ...eq,
      fichiers: await Promise.all(
        (eq.fichiers || []).map(async (file) => ({
          name: file.name,
          data: await fileToBase64(file),
          type: file.type
        }))
      )
    }))
  );

  const composantsWithFiles = await Promise.all(
    (formData.composants || []).map(async (comp) => ({
      ...comp,
      fichiers: await Promise.all(
        (comp.fichiers || []).map(async (file) => ({
          name: file.name,
          data: await fileToBase64(file),
          type: file.type
        }))
      )
    }))
  );

  const licencesWithFiles = await Promise.all(
    (formData.licences || []).map(async (lic) => ({
      ...lic,
      fichiers: await Promise.all(
        (lic.fichiers || []).map(async (file) => ({
          name: file.name,
          data: await fileToBase64(file),
          type: file.type
        }))
      )
    }))
  );

  return {
    ...formData,
    equipements: equipementsWithFiles,
    composants: composantsWithFiles,
    licences: licencesWithFiles
  };
};

export const generateRemiseDocument = async (formData) => {
  try {
    console.log("🚀 REACT : Préparation des fichiers...");
    
    // Convertir les fichiers en base64
    const dataWithFiles = await prepareDataWithFiles(formData);
    
    console.log("📤 REACT : Envoi vers Django...");
    
    const response = await fetch('http://localhost:8000/api/generate-pdf/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataWithFiles)
    });
    
    if (!response.ok) {
      console.error("❌ REACT : Erreur HTTP", response.status);
      throw new Error(`Erreur ${response.status}`);
    }
    
    const blob = await response.blob();
    console.log("📄 REACT : PDF reçu, taille:", blob.size, "bytes");
    
    saveAs(blob, `Remise_${formData.numAffaire}_AVEC_PJ.pdf`);
    
    console.log("✅ REACT : Téléchargement lancé");
    return { success: true };
    
  } catch (error) {
    console.error("❌ REACT : Erreur -", error);
    return { success: false, error: error.message };
  }
};