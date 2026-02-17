import { Box, Typography } from "@mui/material";
import Typo from "../../../Composants/Typo";

// Affiche une carte avec un titre et du texte (utilisé pour les engagements)
function Engagement({ title, text }) {
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mb: 4 }}>
      {/* Titre de la section */}
      <Typo variant="body1" fontWeight="normal" sx={{ textAlign: "left", mb: 1 }}>
        {title}
      </Typo>

      {/* Carte avec bordure contenant le texte */}
      <Box
        sx={{
          border: "1px solid rgba(0,0,0,0.3)",
          borderRadius: 2,
          p: 2,
          backgroundColor: "#fafafa",
        }}
      >
        {/* Texte avec sauts de ligne préservés */}
        <Typography variant="body2" sx={{ lineHeight: 1.6, whiteSpace: "pre-line" }}>
          {text}
        </Typography>
      </Box>
    </Box>
  );
}

export default Engagement;