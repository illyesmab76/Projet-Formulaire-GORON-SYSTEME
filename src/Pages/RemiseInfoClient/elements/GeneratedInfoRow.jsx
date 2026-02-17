import React from "react";
import { Box, IconButton, InputAdornment, Tooltip } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import InputMui from "../../../Composants/InputMui.jsx";

// Fonction de génération interne pour le bouton Refresh
const generateStrongPassword = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let passwordArray = [];
  for (let i = 0; i < 11; i++) {
    passwordArray.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }
  const randomIndex = Math.floor(Math.random() * 12);
  passwordArray.splice(randomIndex, 0, "@");
  return passwordArray.join("");
};

function GeneratedInfoRow({ password, onChange }) {
  
  const handleRefreshPassword = () => {
    const newPass = generateStrongPassword();
    // On simule un événement pour le onChange du parent
    onChange({ target: { name: "passwordGenere", value: newPass } });
  };

  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: { xs: "column", md: "row" }, 
        gap: 2, 
        width: "100%", 
        mt: 2 
      }}
    >
      {/* Identifiant : Administrateur */}
      <Box sx={{ flex: 1 }}>
        <InputMui
          label="Identifiant"
          value="Administrateur"
          disabled
          fullWidth
        />
      </Box>

      {/* Mot de passe : avec bouton Refresh */}
      <Box sx={{ flex: 1 }}>
        <InputMui
          label="Mot de passe généré"
          name="passwordGenere"
          value={password}
          onChange={onChange}
          fullWidth
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Générer à nouveau">
                  <IconButton onClick={handleRefreshPassword} edge="end" color="primary">
                    <Refresh fontSize="small" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}

export default GeneratedInfoRow;