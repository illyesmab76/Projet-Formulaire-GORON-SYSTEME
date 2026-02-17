import { Button } from "@mui/material";

function ButtonMui({
  children,
  onClick,
  variant = "contained",
  disabled = false,
  fullWidth = false,
  startIcon,
  sx = {},
  ...props
}) {
  return (
    <Button
      {...props}
      onClick={onClick}       // Action au clic
      variant={variant}       // Style du bouton (rempli, contour, etc.)
      disabled={disabled}     // Désactive le bouton si besoin
      fullWidth={fullWidth}   // Prend toute la largeur si vrai
      startIcon={startIcon}   // Ajoute une icône au début (ex: flèche retour)
      sx={{
        textTransform: "uppercase", // Texte en majuscules
        fontWeight: "bold",         // Texte en gras
        whiteSpace: "nowrap",       // Empêche le texte de revenir à la ligne
        ...sx                       // Permet d'ajouter des styles personnalisés
      }}
    >
      {/* Texte ou contenu affiché dans le bouton */}
      {children}
    </Button>
  );
}

export default ButtonMui;