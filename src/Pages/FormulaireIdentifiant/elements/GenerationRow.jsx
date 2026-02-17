import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import InputMui from "../../../Composants/InputMui";
import InputPasswordMui from "./InputPasswordMui.jsx";

function GeneratedEmailRow({ email, password, trigramme, onChange }) {
  const theme = useTheme();
  // Détecte le passage sur mobile (breakpoints standard MUI)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box 
      sx={{ 
        display: "flex", 
        // Ligne sur PC, Colonne sur téléphone
        flexDirection: isMobile ? "column" : "row", 
        gap: 2, 
        width: "100%", 
        alignItems: "flex-start",
        boxSizing: "border-box"
      }}
    >
      {/* Input Email */}
      <Box sx={{ 
        flex: isMobile ? "1 1 100%" : "0 0 calc(33.33% - 11px)", 
        maxWidth: isMobile ? "100%" : "calc(33.33% - 11px)",
        width: "100%"
      }}>
        <InputMui 
          label="Adresse email générée" 
          name="emailGenere" 
          value={email} 
          onChange={onChange}
          fullWidth
        />
      </Box>

      {/* Input Password */}
      <Box sx={{ 
        flex: isMobile ? "1 1 100%" : "0 0 calc(33.33% - 11px)", 
        maxWidth: isMobile ? "100%" : "calc(33.33% - 11px)",
        width: "100%"
      }}>
        <InputPasswordMui 
          label="Mot de passe généré" 
          name="passwordGenere" 
          value={password} 
          onChange={onChange}
          fullWidth
        />
      </Box>

      {/* Input Trigramme */}
      <Box sx={{ 
        flex: isMobile ? "1 1 100%" : "0 0 calc(33.34% - 11px)", 
        maxWidth: isMobile ? "100%" : "calc(33.34% - 11px)",
        width: "100%"
      }}>
        <InputMui 
          label="Trigramme" 
          name="trigrammeGenere" 
          value={trigramme} 
          onChange={onChange}
          inputProps={{ style: { textTransform: 'uppercase' }, maxLength: 3 }}
          fullWidth
        />
      </Box>
    </Box>
  );
}

export default GeneratedEmailRow;