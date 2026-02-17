import { Box } from "@mui/material";
import Typo from "../../../Composants/Typo";

function Soussigne({ label, children }) {
  return (
    /* Conteneur principal centré avec une largeur max de 900px */
    <Box sx={{ width: "100%", maxWidth: 900, mx: "auto", mb: 3, display: "flex", flexDirection: "column" }}>
      
      {/* Texte d'introduction (ex: "Je soussigné...") */}
      <Typo 
        variant="body1" 
        fontWeight={500} 
        sx={{ textAlign: "left", mb: 2 }} // Espace sous le texte
      >
        {label}
      </Typo>

      {/* Contenu dynamique (généralement le champ de saisie du nom) */}
      {children}
      
    </Box>
  );
}

export default Soussigne;