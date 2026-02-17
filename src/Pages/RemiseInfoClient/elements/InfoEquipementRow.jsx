import React, { useState } from "react";
import { Box, Typography, Paper, IconButton, useTheme, useMediaQuery, Button, Stack } from "@mui/material";
import InputMui from "../../../Composants/InputMui.jsx";
import DatePickerMui from "../../FormulaireIdentifiant/elements/DatePickerMui.jsx";
import UploadButtonMui from "../../../Composants/UploadButtonMui.jsx"; 
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';

function InfoEquipementRow({ title, type, items, onAdd, onDelete }) {
  const [local, setLocal] = useState({ f1: "", f2: "", f3: "", garantie: "", fichiers: [] });
  const theme = useTheme();
  // On utilise md ou sm selon ta préférence, ici sm pour le format téléphone
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const labels = type === "equipement" 
    ? { f1: "Nom de l'équipement", f2: "Modèle", f3: "Numéro de série" }
    : { f1: "Référence", f2: "Modèle", f3: "Numéro de série" };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocal(prev => ({ ...prev, [name]: value }));
  };

  const handleFilesSelected = (newFiles) => {
    setLocal(prev => ({ ...prev, fichiers: [...prev.fichiers, ...newFiles] }));
  };

  const removeFile = (indexToRemove) => {
    setLocal(prev => ({
      ...prev,
      fichiers: prev.fichiers.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleAdd = () => {
    if (!local.f1 || !local.f3) return alert("Veuillez remplir les champs obligatoires");
    onAdd(local);
    setLocal({ f1: "", f2: "", f3: "", garantie: "", fichiers: [] });
  };

  const addButtonStyle = {
    backgroundColor: "#ee773d",
    "&:hover": { backgroundColor: "#d66632" },
    height: "56px",
    fontWeight: "bold",
    textTransform: "none",
    boxShadow: "none",
    color: "white",
    width: "100%" 
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, color: "#ee773d", fontWeight: "bold" }}>{title}</Typography>
      
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* LIGNE 1 : LES 4 INPUTS */}
        <Box sx={{ display: "flex", flexDirection: isTablet ? "column" : "row", gap: 2 }}>
          <Box sx={{ flex: 1 }}><InputMui label={labels.f1} name="f1" fullWidth value={local.f1} onChange={handleChange} /></Box>
          <Box sx={{ flex: 1 }}><InputMui label={labels.f2} name="f2" fullWidth value={local.f2} onChange={handleChange} /></Box>
          <Box sx={{ flex: 1 }}><InputMui label={labels.f3} name="f3" fullWidth value={local.f3} onChange={handleChange} /></Box>
          <Box sx={{ flex: 1 }}><DatePickerMui label="Garantie" name="garantie" value={local.garantie} onChange={handleChange} /></Box>
        </Box>

        {/* LIGNE 2 : PJ ET BOUTON AJOUTER */}
        <Box sx={{ 
          display: "flex", 
          flexDirection: isTablet ? "column" : "row", 
          gap: 2, 
          width: "100%" 
        }}>
          <Box sx={{ flex: 1 }}>
            <UploadButtonMui 
              label={local.fichiers.length > 0 ? `${local.fichiers.length} doc(s) joint(s)` : "Joindre des documents"}
              onFileSelect={handleFilesSelected}
              sx={{
                height: "56px",
                width: "100%",
                borderStyle: "dashed",
                borderWidth: "1px",
                borderColor: "#ccc",
                "&:hover": { borderStyle: "dashed" }
              }}
            />
            
            <Stack spacing={0.5} sx={{ mt: 1 }}>
              {local.fichiers.map((f, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#fdfdfd', px: 2, py: 0.5, borderRadius: 1, border: '1px solid #eee' }}>
                  <Typography variant="caption" noWrap>{f.name}</Typography>
                  <IconButton size="small" onClick={() => removeFile(i)} sx={{ color: '#d32f2f' }}><CloseIcon fontSize="inherit" /></IconButton>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Button variant="contained" onClick={handleAdd} startIcon={<AddCircleIcon />} sx={addButtonStyle}>
              Ajouter {title.toLowerCase()}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* LISTE DES ELEMENTS : MODIFIÉ POUR LE MOBILE */}
      <Box sx={{ mt: 3 }}>
        {items.map((item, index) => (
          <Paper 
            key={index} 
            elevation={0} 
            sx={{ 
              p: 2, 
              mb: 1, 
              border: "1px solid #eee", 
              borderLeft: "5px solid #ee773d", 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row', // Passage en colonne sur mobile
              justifyContent: 'space-between', 
              alignItems: isMobile ? 'flex-start' : 'center',
              gap: isMobile ? 2 : 0
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
              <InsertDriveFileIcon sx={{ color: "#ee773d", mt: 0.5 }} />
              <Box>
                {/* On utilise des blocs différents sur mobile pour un effet "Liste" */}
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                  <strong>{labels.f1} :</strong> {item.f1}
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                  <strong>Modèle :</strong> {item.f2 || "N/A"}
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                  <strong>S/N :</strong> {item.f3}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                  <strong>Garantie :</strong> {item.garantie || "N/A"} 
                  {item.fichiers?.length > 0 && ` | 📄 ${item.fichiers.length} fichier(s)`}
                </Typography>
              </Box>
            </Box>

            {/* Bouton supprimer aligné à droite sur PC, mais en bas à droite sur mobile */}
            <Box sx={{ width: isMobile ? "100%" : "auto", display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={() => onDelete(index)} sx={{ color: "#ee773d" }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default InfoEquipementRow;