import { Box } from "@mui/material";

/**
 * Composant pour créer un conteneur flexible avec un alignement personnalisable
 */
function BoxLabel({ children, width = "100%", align = "flex-start" }) {
  return (
    <Box
      sx={{
        width,               // Définit la largeur (100% par défaut)
        display: "flex",     // Active le mode Flexbox
        alignItems: align,   // Aligne les éléments (en haut par défaut)
      }}
    >
      {/* Affiche le contenu mis à l'intérieur du composant */}
      {children}
    </Box>
  );
}

export default BoxLabel;