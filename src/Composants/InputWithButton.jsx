import { useState } from "react";
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

/**
 * Composant : Un champ de saisie avec bouton pour créer une liste dynamique
 */
function InputWithButton({ 
  label = "Label", 
  inputLabel = "Nom de l'équipement",
  buttonText = "AJOUTER",
  inputWidth = "350px",
  buttonWidth = "150px"
}) {
  // États locaux pour gérer le texte de l'input et le tableau d'équipements
  const [inputValue, setInputValue] = useState("");
  const [equipements, setEquipements] = useState([]);

  // Ajoute le texte de l'input dans la liste
  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      setEquipements([...equipements, inputValue]);
      setInputValue(""); // Vide le champ après l'ajout
    }
  };

  // Supprime un élément de la liste via son index
  const handleDelete = (index) => {
    setEquipements(equipements.filter((_, i) => i !== index));
  };

  // Permet de valider avec la touche "Entrée"
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <Box sx={{ mb: 2 }}>
      {/* Titre au-dessus du bloc */}
      <Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary" }}>
        {label}
      </Typography>

      {/* Barre de saisie : Input + Bouton */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "fit-content" }}>
        <TextField
          label={inputLabel}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          variant="outlined"
          sx={{ width: inputWidth }}
        />

        <Button
          variant="contained"
          onClick={handleAdd}
          sx={{
            backgroundColor: "#ee773d",
            "&:hover": { backgroundColor: "#d96532" },
            fontWeight: "bold",
            width: buttonWidth,
            height: "56px"
          }}
        >
          {buttonText}
        </Button>
      </Box>

      {/* Affichage de la liste si elle contient des éléments */}
      {equipements.length > 0 && (
        <Box sx={{ mt: 2, width: "fit-content" }}>
          <List sx={{ bgcolor: "background.paper", border: "1px solid #e0e0e0", borderRadius: 1 }}>
            {equipements.map((equipement, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton 
                    edge="end" 
                    onClick={() => handleDelete(index)}
                    sx={{ color: "#ee773d" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={`${index + 1}. ${equipement}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}

export default InputWithButton;