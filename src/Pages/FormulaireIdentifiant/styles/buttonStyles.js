export const buttonStyles = (isMobile) => {
  // Styles partagés par tous les boutons (taille, police, etc.)
  const commonStyles = {
    // Largeur automatique sur mobile, 200px sur PC
    width: isMobile ? "100%" : "200px",
    height: 55,
    textTransform: "uppercase",
    fontWeight: "bold",
  };

  return {
    // Style du bouton orange (Principal / Valider)
    orangeButtonSx: {
      ...commonStyles,
      backgroundColor: "#ee773d",
      color: "white",
      "&:hover": { backgroundColor: "#d96532" },
      "&.Mui-disabled": { 
        backgroundColor: "rgba(0, 0, 0, 0.12)", 
        color: "rgba(0, 0, 0, 0.26)" 
      },
    },

    // Style du bouton gris (Retour / Annuler)
    greyButtonSx: {
      ...commonStyles,
      backgroundColor: "#6c757d",
      color: "white",
      "&:hover": { backgroundColor: "#5a6268" },
    },

    // Conteneur des boutons en bas de page
    buttonContainerStyle: {
      display: "flex",
      // Empilés sur mobile, côte à côte sur PC
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between", 
      alignItems: "center",
      gap: 2,
      mt: 3,
      width: "100%"
    }
  };
};