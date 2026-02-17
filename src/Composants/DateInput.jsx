import { useState } from "react";
import InputMui from "./InputMui";

// Fonction qui ajoute les "/" automatiquement (ex: 12022026 devient 12/02/2026)
const formatDateInput = (value) => {
  let v = value.replace(/\D/g, ""); // Supprime tout ce qui n'est pas un chiffre
  if (v.length > 8) v = v.slice(0, 8);
  
  let day = v.slice(0, 2);
  let month = v.slice(2, 4);
  let year = v.slice(4, 8);

  // Sécurité pour éviter des dates impossibles
  if (day.length === 2 && Number(day) > 31) day = "31";
  if (month.length === 2 && Number(month) > 12) month = "12";
  if (year.length === 4 && Number(year) < 2026) year = "2026";

  // Construit la chaîne avec les barres obliques
  if (v.length >= 5) return `${day}/${month}/${year}`;
  if (v.length >= 3) return `${day}/${month}`;
  return day;
};

function DateInput({ label, name, value, onChange, required, disabled = false }) {
  
  // Gère le changement de texte et applique le formatage
  const handleChange = (e) => {
    const formatted = formatDateInput(e.target.value);

    // Renvoie la valeur formatée au parent
    onChange({
      target: {
        name,
        value: formatted,
      },
    });
  };

  return (
    <InputMui
      label={label}
      name={name}
      value={value}
      onChange={handleChange}
      disabled={disabled} // Désactive le champ si nécessaire
      inputProps={{
        maxLength: 10,
        inputMode: "numeric", // Affiche le clavier numérique sur mobile
        pattern: "\\d{2}/\\d{2}/\\d{4}",
      }}
      // On s'assure ici que le style orange est bien appliqué via sx
      sx={{
        "& label.Mui-focused": {
          color: "#ee773d",
        },
        "& .MuiOutlinedInput-root": {
          "&:hover fieldset": {
            borderColor: "#ee773d",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#ee773d",
          },
        },
      }}
      required={required}
      fullWidth
    />
  );
}

export default DateInput;