import { Box } from "@mui/material";
import SelectMui from "./SelectMui";
import ButtonMui from "../../../Composants/ButtonMui";

function ModelValidationRow({ value, onChange, onValidate, disabled }) {
  return (
    <Box sx={{ mt: 3 }}>
      <Box 
        sx={{ 
          display: "flex", 
          // Colonne sur mobile, Ligne sur PC
          flexDirection: { xs: "column", md: "row" }, 
          gap: 2, 
          width: "100%", 
          alignItems: "flex-start",
          boxSizing: "border-box"
        }}
      >
        {/* Menu déroulant pour choisir le modèle */}
        <Box sx={{ 
          flex: { xs: "1 1 100%", md: "0 0 calc(33.33% - 11px)" }, 
          maxWidth: { xs: "100%", md: "calc(33.33% - 11px)" },
          width: "100%" 
        }}>
          <SelectMui
            label="Modèle"
            name="modele"
            value={value}
            onChange={onChange}
            options={[
              { value: "technicien", label: "Modèle technicien" },
              { value: "direction", label: "Modèle direction" },
              { value: "admin", label: "Modèle admin" }
            ]}
            fullWidth
          />
        </Box>
        
        {/* Bouton pour valider et verrouiller le choix */}
        <Box sx={{ 
          flex: { xs: "1 1 100%", md: "0 0 calc(16.665% - 5.5px)" }, 
          maxWidth: { xs: "100%", md: "calc(16.665% - 5.5px)" },
          width: "100%" 
        }}>
          <ButtonMui
            onClick={onValidate}
            disabled={disabled}
            variant="contained"
            fullWidth
            sx={{ 
              height: "56px",
              backgroundColor: "#ee773d",
              "&:hover": {
                backgroundColor: "#d66835"
              }
            }}
          >
            VALIDER
          </ButtonMui>
        </Box>
        
        {/* Espace vide pour l'alignement sur PC */}
        <Box sx={{ 
          display: { xs: "none", md: "block" },
          flex: "0 0 calc(50% - 16.5px)", 
          maxWidth: "calc(50% - 16.5px)" 
        }} />
      </Box>
    </Box>
  );
}

export default ModelValidationRow;