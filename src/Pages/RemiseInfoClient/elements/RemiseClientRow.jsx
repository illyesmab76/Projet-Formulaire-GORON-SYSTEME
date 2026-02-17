import React from "react";
import { Box } from "@mui/material";
import InputMui from "../../../Composants/InputMui.jsx";
import SelectMui from "../../FormulaireIdentifiant/elements/SelectMui.jsx"; 
import ButtonMui from "../../../Composants/ButtonMui.jsx";
import DatePickerMui from "../../FormulaireIdentifiant/elements/DatePickerMui.jsx";

function RemiseClientRow({ form, onChange, onValidate, disabled }) {
  const isComplete = form.numAffaire && form.site && form.date && form.typeMateriel;

  const disabledTextStyle = {
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#C0C0C0", 
      color: "#C0C0C0",
    }
  };

  // Style commun pour que chaque élément prenne 1/3 sur PC et 100% sur Mobile
  const itemStyle = {
    flex: { xs: "1 1 100%", md: "0 1 calc(33.33% - 11px)" }, // 11px = compensation du gap
    width: "100%"
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      {/* Première ligne : N° Affaire, Site, Date */}
      <Box sx={{ 
        display: "flex", 
        flexDirection: { xs: "column", md: "row" }, 
        gap: 2, 
        flexWrap: "wrap",
        mb: 2 
      }}>
        <Box sx={itemStyle}>
          <InputMui 
            label="N° Affaire" 
            name="numAffaire" 
            value={form.numAffaire} 
            onChange={onChange} 
            disabled={disabled} 
            sx={disabled ? disabledTextStyle : {}} 
            fullWidth 
          />
        </Box>
        <Box sx={itemStyle}>
          <InputMui 
            label="Site" 
            name="site" 
            value={form.site} 
            onChange={onChange} 
            disabled={disabled} 
            sx={disabled ? disabledTextStyle : {}} 
            fullWidth 
          />
        </Box>
        <Box sx={itemStyle}>
          <DatePickerMui 
            label="Date de remise" 
            name="date" 
            value={form.date} 
            onChange={onChange} 
            disabled={disabled} 
            sx={disabled ? disabledTextStyle : {}} 
          />
        </Box>
      </Box>

      {/* Deuxième ligne : Select et Bouton */}
      {!disabled && (
        <Box sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" }, 
          gap: 2, 
          flexWrap: "wrap",
          alignItems: "flex-start" 
        }}>
          <Box sx={itemStyle}>
            <SelectMui
              label="Type de Matériel"
              name="typeMateriel"
              value={form.typeMateriel}
              onChange={onChange}
              options={[
                {value:"serveur", label:"Serveur"}, 
                {value:"PC", label:"PC"}, 
                {value:"Autre", label:"Autre"}
              ]}
              fullWidth
            />
          </Box>

          <Box sx={itemStyle}>
            <ButtonMui 
              onClick={onValidate} 
              disabled={!isComplete} 
              fullWidth 
              sx={{ 
                height: "56px", 
                backgroundColor: "#ee773d", 
                color: "white",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#d96830" }
              }}
            >
              Valider
            </ButtonMui>
          </Box>
          
          {/* Box vide pour combler le 3ème emplacement sur PC */}
          <Box sx={{ ...itemStyle, display: { xs: "none", md: "block" } }} />
        </Box>
      )}
    </Box>
  );
}

export default RemiseClientRow;