import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import ImageModule from "docxtemplater-image-module-free";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import html2pdf from "html2pdf.js";

export const generateWordDocument = async (templatePath, data, pdfElementId = 'pdf-capture-area') => {
  try {
    console.log("Début de la génération - Données reçues:", data);

    // 🔍 LOGS DE DEBUG
    console.log("EQUIPEMENTS BRUTS:", data.equipements);
    console.log("NOMBRE EQUIPEMENTS:", data.equipements?.length);
    data.equipements?.forEach((eq, i) => {
      console.log(`EQ[${i}]:`, eq);
      console.log(`EQ[${i}].fichiers:`, eq.fichiers);
      console.log(`EQ[${i}].fichiers length:`, eq.fichiers?.length);
      eq.fichiers?.forEach((f, j) => {
        console.log(`EQ[${i}].fichiers[${j}]:`, f);
        console.log(`Type:`, typeof f);
        console.log(`Est un File:`, f instanceof File);
        console.log(`Est un Blob:`, f instanceof Blob);
        console.log(`Nom:`, f?.name);
        console.log(`Taille:`, f?.size);
      });
    });

    // 1. Préparer les données pour le Word
    const dataForWord = {
      ...data,
      equipements: (data.equipements || []).map((eq, index) => ({
        ...eq,
        numero: index + 1,
        listeNomsFichiers: (eq.fichiers || []).map(f => f.name).join(', ') || 'Aucun',
        nbFichiers: (eq.fichiers || []).length,
        dossierPJ: eq.fichiers && eq.fichiers.length > 0
          ? `Pieces_Jointes/${index + 1}_Equipement_${(eq.nom || 'inconnu').replace(/[/\\?%*:|"<>]/g, '_')}/`
          : 'Aucune pièce jointe'
      })),
    };

    console.log("DATA FOR WORD:", dataForWord);

    // 2. Récupération du fichier template
    const response = await fetch(templatePath);
    if (!response.ok) throw new Error(`Template introuvable à l'adresse: ${templatePath}`);
    
    const arrayBuffer = await response.arrayBuffer();
    const zip = new PizZip(arrayBuffer);

    // 3. Configuration pour gérer les signatures
    const imageOptions = {
      centered: false,
      getImage: (tagValue) => {
        if (!tagValue) return null;
        try {
          const base64String = tagValue.split(",")[1];
          const binaryString = window.atob(base64String);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          return bytes.buffer;
        } catch (e) {
          console.error("Erreur décodage image signature:", e);
          return null;
        }
      },
      getSize: () => [150, 60],
    };

    // 4. Initialisation et rendu du document Word
    const doc = new Docxtemplater(zip, {
      modules: [new ImageModule(imageOptions)],
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render(dataForWord);

    // 5. Génération du blob Word
    const docxBlob = doc.getZip().generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    // 6. Génération du PDF
    console.log("Capture du PDF en cours...");
    const element = document.getElementById(pdfElementId);
    let pdfBlob = null;

    if (element) {
      await new Promise(resolve => setTimeout(resolve, 500));

      const opt = {
        margin: [10, 10],
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      try {
        pdfBlob = await html2pdf().set(opt).from(element).output('blob');
        console.log("PDF généré avec succès");
      } catch (pdfErr) {
        console.error("Erreur capture PDF:", pdfErr);
      }
    } else {
      console.warn(`Élément PDF introuvable : #${pdfElementId}`);
    }

    // 7. Création du ZIP final
    console.log("Création du ZIP final...");
    const finalZip = new JSZip();
    const baseFileName = `Fiche_Identifiant_${data.nom || "Client"}`;

    finalZip.file(`${baseFileName}.docx`, docxBlob);

    if (pdfBlob) {
      finalZip.file(`${baseFileName}.pdf`, pdfBlob);
    }

    // 8. Ajout des pièces jointes
    const hasPJ = (data.equipements || []).some(eq => eq.fichiers && eq.fichiers.length > 0);
    console.log("A des PJ:", hasPJ);

    if (hasPJ) {
      const pjFolder = finalZip.folder("Pieces_Jointes");

      (data.equipements || []).forEach((eq, idx) => {
        console.log(`Traitement EQ[${idx}], fichiers:`, eq.fichiers);
        
        if (eq.fichiers && eq.fichiers.length > 0) {
          const nomDossier = `${idx + 1}_Equipement_${(eq.nom || 'inconnu').replace(/[/\\?%*:|"<>]/g, '_')}`;
          const subFolder = pjFolder.folder(nomDossier);

          eq.fichiers.forEach((file, fIdx) => {
            console.log(`Ajout fichier[${fIdx}]:`, file, "instanceof File:", file instanceof File);
            if (file instanceof File || file instanceof Blob) {
              subFolder.file(file.name, file);
              console.log(`✅ Fichier ajouté: ${file.name}`);
            } else {
              console.error(`❌ Fichier invalide:`, file);
            }
          });
        }
      });
    }

    // 9. Génération et téléchargement du ZIP
    const zipBlob = await finalZip.generateAsync({ type: "blob" });
    saveAs(zipBlob, `${baseFileName}_Complete.zip`);

    console.log("✅ ZIP généré avec succès !");
    return { success: true };

  } catch (error) {
    console.error("❌ Erreur générale WordService:", error);
    return { success: false, error: error.message };
  }
};