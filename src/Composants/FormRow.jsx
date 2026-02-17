import { Box } from "@mui/material";
import TypoLabel from "./TypoLabel";
import BoxLabel from "./BoxLabel";

/**
 * Composant pour créer une ligne alignée avec un label et un ou deux champs
 */
function FormRow({ label, input1, input2 }) {
  return (
    <Box
      sx={{
        display: "flex",          // Aligne les éléments sur une ligne
        alignItems: "flex-start", // Aligne tout vers le haut
        gap: 2,                   // Espace de 16px entre les colonnes
        mb: 2,                    // Marge de 16px sous la ligne
      }}
    >
      {/* Colonne de gauche : Le titre du champ */}
      <BoxLabel>
        <TypoLabel>{label}</TypoLabel>
      </BoxLabel>

      {/* Colonne centrale : Premier champ de saisie */}
      <BoxLabel>{input1}</BoxLabel>

      {/* Colonne de droite : Deuxième champ (optionnel) */}
      <BoxLabel>{input2}</BoxLabel>
    </Box>
  );
}

export default FormRow;