import React, { useState } from "react";
import { 
  Box, Typography, Paper, IconButton, Stack, Checkbox, 
  ListItemText, MenuItem, OutlinedInput, Select, InputLabel, FormControl,
  useTheme, useMediaQuery
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AppsIcon from '@mui/icons-material/Apps';

import InputMui from "../../../Composants/InputMui.jsx";
import ButtonMui from "../../../Composants/ButtonMui.jsx";

const listeLogicielsDisponibles = [
  "Milestone", "VLC", "Office 365", "Chrome", 
  "Adobe Reader", "WinRAR", "AnyDesk", "FileZilla"
];

function LogicielSection({ items = [], onAddBatch, onAddSingle, onDelete }) {
  const [selectedLogiciels, setSelectedLogiciels] = useState([]);
  const [autreLogiciel, setAutreLogiciel] = useState("");
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleSelectChange = (event) => {
    const { target: { value } } = event;
    setSelectedLogiciels(typeof value === 'string' ? value.split(',') : value);
  };

  const handleAddBatch = () => {
    if (selectedLogiciels.length === 0) return;
    if (typeof onAddBatch !== "function") return;

    const nouveaux = selectedLogiciels.map(nom => ({ nom: nom }));
    onAddBatch(nouveaux);
    setSelectedLogiciels([]);
  };

  const handleAddAutre = () => {
    if (!autreLogiciel.trim()) return;
    if (typeof onAddSingle !== "function") return;

    onAddSingle({ nom: autreLogiciel });
    setAutreLogiciel("");
  };

  // STYLE HARMONISÉ : 56px de haut, même épaisseur que les inputs
  const sameHeightButtonStyle = {
    height: "56px", 
    backgroundColor: "#ee773d",
    fontWeight: "bold",
    fontSize: "0.95rem",
    textTransform: "uppercase",
    width: "100%", // Prend toute la largeur de son conteneur
    "&:hover": { backgroundColor: "#d96830" }
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, color: "#ee773d", fontWeight: "bold" }}>
        Logiciels
      </Typography>

      <Stack spacing={3}>
        {/* --- BLOC SÉLECTION MULTIPLE --- */}
        <Box sx={{ 
          display: "flex", 
          gap: 2, 
          flexDirection: isTablet ? "column" : "row",
          alignItems: "center" 
        }}>
          <FormControl sx={{ flex: 2, width: "100%" }}>
            <InputLabel id="label-multi-logiciels" sx={{ "&.Mui-focused": { color: "#ee773d" } }}>
              Choisir les logiciels
            </InputLabel>
            <Select
              labelId="label-multi-logiciels"
              multiple
              value={selectedLogiciels}
              onChange={handleSelectChange}
              input={<OutlinedInput label="Choisir les logiciels" />}
              renderValue={(selected) => selected.join(', ')}
              sx={{
                height: "56px", // Exactement 56px comme l'input
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#ee773d" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ee773d" },
              }}
            >
              {listeLogicielsDisponibles.map((nom) => (
                <MenuItem key={nom} value={nom}>
                  <Checkbox 
                    checked={selectedLogiciels.indexOf(nom) > -1} 
                    sx={{ color: "#ee773d", "&.Mui-checked": { color: "#ee773d" } }}
                  />
                  <ListItemText primary={nom} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ flex: 1, width: "100%" }}>
            <ButtonMui 
              onClick={handleAddBatch} 
              startIcon={<AddCircleIcon />} 
              sx={sameHeightButtonStyle}
            >
              Ajouter
            </ButtonMui>
          </Box>
        </Box>

        {/* --- BLOC AUTRE LOGICIEL --- */}
        <Box sx={{ 
          display: "flex", 
          gap: 2, 
          flexDirection: isTablet ? "column" : "row",
          alignItems: "center" 
        }}>
          <Box sx={{ flex: 2, width: "100%" }}>
            <InputMui 
              label="Autre logiciel" 
              value={autreLogiciel} 
              onChange={(e) => setAutreLogiciel(e.target.value)}
              fullWidth
            />
          </Box>
          <Box sx={{ flex: 1, width: "100%" }}>
            <ButtonMui 
              onClick={handleAddAutre} 
              startIcon={<AddCircleIcon />} 
              sx={sameHeightButtonStyle}
            >
              Ajouter
            </ButtonMui>
          </Box>
        </Box>
      </Stack>

      {/* --- LISTE DES AJOUTS --- */}
      <Stack spacing={1} sx={{ mt: 4 }}>
        {(items || []).map((item, index) => (
          <Paper 
            key={index} 
            elevation={0} 
            sx={{ 
              p: 2, 
              border: "1px solid #eee", 
              borderLeft: "5px solid #ee773d",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <AppsIcon sx={{ color: "#ee773d" }} />
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {item.nom}
              </Typography>
            </Box>
            <IconButton onClick={() => onDelete(index)} sx={{ color: "#ee773d" }}>
              <DeleteIcon />
            </IconButton>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

export default LogicielSection;