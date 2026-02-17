import Typography from "@mui/material/Typography";

/**
 * Composant de texte personnalisé pour uniformiser les titres et labels
 */
function Typo({
  children,
  variant = "body1",
  color = "#ee773d", // Orange par défaut
  align = "left",
  mb = 2,
  fontWeight = "bold",
  sx = {},            // On récupère sx à part pour mieux fusionner
  ...props
}) {
  return (
    <Typography
      variant={variant}
      sx={{
        color,
        textAlign: align,
        fontWeight,
        mb,
        ...sx,        // Fusionne les styles par défaut avec ceux du parent
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}

export default Typo;