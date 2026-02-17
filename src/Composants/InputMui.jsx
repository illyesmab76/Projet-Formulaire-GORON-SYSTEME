import TextField from "@mui/material/TextField";

function InputMui({
  label, name, value, onChange, type = "text",
  error = false, helperText = "", required = false,
  fullWidth = true, disabled = false, sx = {}, ...props
}) {
  return (
    <TextField
      {...props}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      error={error}
      helperText={helperText}
      required={required}
      fullWidth={fullWidth}
      disabled={disabled}
      variant="outlined"
      sx={{
        // Couleur du label au repos (optionnel, si tu veux aussi qu'il soit orange par défaut)
        // "& .MuiInputLabel-root": { color: "rgba(0, 0, 0, 0.6)" },

        // 1. Couleur du label quand on clique dessus (Focus)
        "& label.Mui-focused": {
          color: "#ee773d !important",
        },

        // 2. Styles de la bordure
        "& .MuiOutlinedInput-root": {
          // Couleur au survol (Hover)
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ee773d !important",
          },
          // Couleur quand activé (Focus)
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ee773d !important",
            borderWidth: "2px",
          },

          // 3. FORCE TOUTES LES ICÔNES (Adornments) EN ORANGE
          "& .MuiInputAdornment-root .MuiSvgIcon-root": {
            color: "#ee773d",
          },
          // Si c'est un bouton (IconButton) à l'intérieur de l'input
          "& .MuiIconButton-root": {
            color: "#ee773d",
          }
        },
        
        // Fusion avec les styles spécifiques passés en props
        ...sx, 
      }}
    />
  );
}

export default InputMui;