import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import ImageModule from "docxtemplater-image-module-free";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import html2pdf from "html2pdf.js";

// Fonction pour convertir les fichiers uploadés en format compréhensible par le PDF
const fileToArrayBuffer = (file) => {
  return new Promise((resolve) => {
    if (!(file instanceof File) && !(file instanceof Blob)) return resolve(null);
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => resolve(null);
    reader.readAsArrayBuffer(file);
  });
};

export const generateRemiseDocument = async (formData) => {
  try {
    // --- 1. GÉNÉRATION DU WORD ---
    const wordResp = await fetch("/template_remise.docx");
    const wordBuffer = await wordResp.arrayBuffer();
    const zip = new PizZip(wordBuffer);
    const doc = new Docxtemplater(zip, {
      modules: [new ImageModule({
        centered: false,
        getImage: (tag) => {
          const b64 = tag.split(",")[1];
          const bin = window.atob(b64);
          const bytes = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
          return bytes.buffer;
        },
        getSize: () => [150, 60],
      })],
      paragraphLoop: true,
      linebreaks: true,
    });
    doc.render(formData);
    const docxBlob = doc.getZip().generate({ type: "blob" });
    saveAs(docxBlob, `Remise_${formData.numAffaire}.docx`);

    // --- 2. GÉNÉRATION DU PDF DYNAMIQUE (POUR VOIR LE TEXTE DES PJ) ---
    const container = document.createElement("div");
    container.innerHTML = `
      <div style="font-family: Arial; padding: 20mm;">
        <h1 style="text-align: center; text-decoration: underline;">FICHE DE REMISE INFORMATIQUE</h1>
        <p><strong>Affaire :</strong> ${formData.numAffaire}</p>
        <p><strong>Site :</strong> ${formData.site}</p>

        <h3>ÉQUIPEMENTS & PIÈCES JOINTES</h3>
        ${formData.equipements?.map(eq => `
          <div style="margin-bottom: 10px;">
            <strong>${eq.f1}</strong> - S/N: ${eq.f3}<br/>
            <span style="color: blue; font-size: 0.9em;">
               Fichiers inclus : ${eq.fichiers?.map(f => f.name).join(', ') || "Aucun"}
            </span>
          </div>
        `).join('')}

        <div style="margin-top: 50px;">
          <strong>Signature :</strong><br/>
          ${formData.signatureAnimateur ? `<img src="${formData.signatureAnimateur}" style="width: 150px;"/>` : "__________"}
        </div>
      </div>
    `;

    const opt = { margin: 10, filename: 'temp.pdf', html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a4' } };
    const pdfBlob = await html2pdf().set(opt).from(container).output('blob');
    
    // --- 3. ATTACHEMENT RÉEL DES FICHIERS DANS LE PDF (L'ONGLET TROMBONE) ---
    const pdfDoc = await PDFDocument.load(await pdfBlob.arrayBuffer());

    // On parcourt les équipements, composants et licences pour extraire les fichiers
    const sources = [...(formData.equipements || []), ...(formData.composants || []), ...(formData.licences || [])];
    
    for (const item of sources) {
      if (item.fichiers && item.fichiers.length > 0) {
        for (const file of item.fichiers) {
          const data = await fileToArrayBuffer(file);
          if (data) {
            // C'est ici qu'on injecte le fichier dans le PDF
            await pdfDoc.attach(data, file.name, {
              mimeType: file.type,
              description: `Pièce jointe de l'élément : ${item.f1 || item.type || 'Matériel'}`,
              creationDate: new Date(),
            });
          }
        }
      }
    }

    const pdfFinalBytes = await pdfDoc.save();
    saveAs(new Blob([pdfFinalBytes], { type: 'application/pdf' }), `Remise_${formData.numAffaire}.pdf`);

    return { success: true };
  } catch (error) {
    console.error("Erreur PJ:", error);
    return { success: false, error: error.message };
  }
};