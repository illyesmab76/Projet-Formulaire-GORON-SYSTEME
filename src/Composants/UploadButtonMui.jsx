import React from 'react';
import { Button } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';

/**
 * Composant de bouton d'upload réutilisable
 * @param {Function} onFileSelect - Callback qui reçoit le tableau des fichiers sélectionnés
 * @param {string} label - Texte du bouton
 * @param {object} sx - Styles MUI supplémentaires
 */
const UploadButtonMui = ({ onFileSelect, label = "Ajouter PJ", sx = {} }) => {
  // Restriction des types demandés : PDF, DOC, DOCX, PNG, JPG, JPEG
  const acceptedTypes = ".pdf, .doc, .docx, .png, .jpg, .jpeg";

  const handleInternalChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      // Transformation de la FileList en tableau simple pour manipulation facile
      const newFiles = Array.from(e.target.files);
      
      // On envoie les fichiers au composant parent
      onFileSelect(newFiles);
      
      // Reset de la valeur de l'input pour permettre de sélectionner 
      // à nouveau les mêmes fichiers si l'utilisateur les avait supprimés
      e.target.value = "";
    }
  };

  return (
    <Button
      component="label"
      variant="outlined"
      startIcon={<AttachFileIcon />}
      sx={{ 
        color: "#ee773d", 
        borderColor: "#ee773d",
        textTransform: "none", // Garde le texte tel quel (pas tout en majuscules)
        "&:hover": { 
          borderColor: "#ee773d", 
          bgcolor: "rgba(238, 119, 61, 0.04)",
          borderWidth: "1px"
        },
        ...sx 
      }}
    >
      {label}
      <input
        type="file"
        hidden
        multiple // <-- Permet la sélection multiple (Ctrl + Clic ou Shift + Clic)
        accept={acceptedTypes} // <-- Restreint l'explorateur de fichiers
        onChange={handleInternalChange}
      />
    </Button>
  );
};

export default UploadButtonMui;