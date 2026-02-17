import React from "react";
import { IconButton, InputAdornment, Tooltip } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import InputMui from "../../../Composants/InputMui";

// Logique pour générer un mot de passe aléatoire avec un "@"
const generateCustomPassword = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let passwordArray = [];
  for (let i = 0; i < 11; i++) {
    passwordArray.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }
  const randomIndex = Math.floor(Math.random() * 12);
  passwordArray.splice(randomIndex, 0, "@");
  return passwordArray.join("");
};

function InputPasswordMui({ label, name, value, onChange, disabled, sx }) {
  
  // Fonction pour mettre à jour le champ avec un nouveau mot de passe
  const handleGenerate = () => {
    const newPassword = generateCustomPassword();
    onChange({ target: { name: name, value: newPassword } });
  };

  return (
    <InputMui
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      type="text"
      sx={sx}
      // Ajout du bouton de régénération à la fin de l'input
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title="Générer">
              <IconButton onClick={handleGenerate} edge="end" disabled={disabled}>
                <Refresh fontSize="small" color="primary" />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default InputPasswordMui;