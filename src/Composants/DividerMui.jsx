import Divider from "@mui/material/Divider";

// Définition des différents styles de lignes (épaisseur et couleur)
const variants = {
  soft: { 
    borderColor: "grey.300", 
    borderBottomWidth: 1, 
  },
  medium: { 
    borderColor: "grey.400", 
    borderBottomWidth: 1.5, 
  },
  strong: { 
    borderColor: "grey.600", 
    borderBottomWidth: 2, 
  },
};

function DividerMui({ variant = "medium", sx, ...props }) {
  return (
    <Divider
      sx={{
        mb: 4,                  // Espace de 32px en dessous de la ligne
        ...variants[variant],   // Applique le style choisi (soft, medium ou strong)
        ...sx,                  // Permet d'ajouter ou d'écraser des styles si besoin
      }}
      {...props}
    />
  );
}

export default DividerMui;