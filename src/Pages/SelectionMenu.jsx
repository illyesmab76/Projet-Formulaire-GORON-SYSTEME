import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
// Correction des chemins : un seul "../" suffit pour remonter de Pages vers src
import Typo from "../Composants/Typo.jsx";
import ButtonMui from "../Composants/ButtonMui.jsx";
import DividerMui from "../Composants/DividerMui.jsx";

function SelectionMenu({ onSelect }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      p: isMobile ? 2 : 4,
      display: "flex",
      flexDirection: "column"
    }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", width: "100%" }}>
        
        {/* Titre centré */}
        <Typo variant="h3" color="#ee773d" fontWeight="bold" mb={3} textAlign="center">
          Choisir un formulaire
        </Typo>
        
        {/* Ligne sous le titre */}
        <DividerMui variant="strong" sx={{ mb: 6 }} />

        {/* Conteneur des boutons à gauche */}
        <Box sx={{ 
          display: "flex", 
          flexDirection: isMobile ? "column" : "row", 
          gap: 3,
          justifyContent: "flex-start"
        }}>
          <ButtonMui 
            onClick={() => onSelect("identifiant-accueil")}
            sx={{ 
              backgroundColor: "#ee773d",
              color: "white",
              height: "56px",
              fontSize: "0.95rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              "&:hover": {
                backgroundColor: "#d96830"
              }
            }}
          >
            Identifiant et remise
          </ButtonMui>

          <ButtonMui 
            onClick={() => onSelect("remise")}
            sx={{ 
              backgroundColor: "#ee773d",
              color: "white", 
              height: "56px",
              fontSize: "0.95rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              "&:hover": {
                backgroundColor: "#d96830"
              }
            }}
          >
            Remise info client
          </ButtonMui>
        </Box>

        <Box sx={{ mt: 6 }}>
           <DividerMui variant="strong" />
        </Box>
      </Box>
    </Box>
  );
}

export default SelectionMenu;