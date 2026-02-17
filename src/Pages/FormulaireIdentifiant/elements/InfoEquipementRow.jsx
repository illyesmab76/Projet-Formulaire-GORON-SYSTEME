import { useState } from "react";
import { Box, Button, Typography, Paper, IconButton, Stack, useTheme, useMediaQuery } from "@mui/material";
import InputMui from "../../../Composants/InputMui";
import DatePickerMui from "./DatePickerMui";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';

// Liste des extensions autorisées
const ALLOWED_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'];

function InfoEquipementRow({ equipements, onAdd, onDelete }) {
  const [local, setLocal] = useState({ nom: "", modele: "", sn: "", garantie: "", fichiers: [] });
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocal(prev => ({ ...prev, [name]: value }));
  };

  const handleFiles = (e) => {
    const filesArray = Array.from(e.target.files);
    
    // Filtrage des fichiers par extension
    const validFiles = filesArray.filter(file => {
      const extension = file.name.split('.').pop().toLowerCase();
      const isValid = ALLOWED_EXTENSIONS.includes(extension);
      if (!isValid) {
        alert(`Le fichier "${file.name}" n'est pas autorisé. (Extensions valides : PDF, JPG, PNG, DOCX)`);
      }
      return isValid;
    });

    setLocal(prev => ({ ...prev, fichiers: [...prev.fichiers, ...validFiles] }));
    e.target.value = null; // Reset pour pouvoir re-sélectionner le même fichier
  };

  const removeFile = (indexToRemove) => {
    setLocal(prev => ({
      ...prev,
      fichiers: prev.fichiers.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleAdd = () => {
    if (!local.nom || !local.sn) return alert("Veuillez remplir au moins le nom et le numéro de série");
    onAdd(local);
    setLocal({ nom: "", modele: "", sn: "", garantie: "", fichiers: [] });
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, color: "#ee773d", fontWeight: "bold" }}>
        Équipements
      </Typography>
      
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        
        {/* LIGNE 1 : INPUTS */}
        <Box sx={{ 
          display: "flex", 
          flexDirection: isMobile ? "column" : "row", 
          gap: 2 
          }}>
          <Box sx={{ flex: isMobile ? "1 1 100%" : "1 1 25%" }}><InputMui label="Nom de l'équipement" name="nom" fullWidth value={local.nom} onChange={handleChange} /></Box>
          <Box sx={{ flex: isMobile ? "1 1 100%" : "1 1 25%" }}><InputMui label="Modèle" name="modele" fullWidth value={local.modele} onChange={handleChange} /></Box>
          <Box sx={{ flex: isMobile ? "1 1 100%" : "1 1 25%" }}><InputMui label="Numéro de série" name="sn" fullWidth value={local.sn} onChange={handleChange} /></Box>
          <Box sx={{ flex: isMobile ? "1 1 100%" : "1 1 25%" }}><DatePickerMui label="Garantie" name="garantie" value={local.garantie} onChange={handleChange} showTodayButton={false} /></Box>
        </Box>

        {/* LIGNE 2 : BOUTONS */}
        <Box sx={{ 
          display: "flex", 
          flexDirection: isMobile ? "column" : "row", 
          gap: 2,
          alignItems: "flex-start"
        }}>
          <Box sx={{ flex: isMobile ? "1 1 100%" : "1 1 50%", width: "100%" }}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              fullWidth
              sx={{ 
                height: "56px", 
                borderColor: "rgba(0, 0, 0, 0.23)", 
                color: "#ee773d",
                textTransform: "none",
                borderStyle: "dashed"
              }}
            >
              Joindre des documents
              {/* Ajout de l'attribut accept pour filtrage natif */}
              <input 
                type="file" 
                hidden 
                multiple 
                onChange={handleFiles} 
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
            </Button>
            
            <Stack spacing={0.5} sx={{ mt: 1 }}>
              {local.fichiers.map((f, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#fdfdfd', px: 2, py: 0.5, borderRadius: 1, border: '1px solid #eee' }}>
                  <Typography variant="caption" noWrap>{f.name}</Typography>
                  <IconButton size="small" onClick={() => removeFile(i)} sx={{ color: '#d32f2f' }}><CloseIcon fontSize="inherit" /></IconButton>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box sx={{ flex: isMobile ? "1 1 100%" : "1 1 50%", width: "100%" }}>
            <Button
              variant="contained"
              onClick={handleAdd}
              startIcon={<AddCircleIcon />}
              fullWidth
              sx={{ 
                backgroundColor: "#ee773d", 
                "&:hover": { backgroundColor: "#d66632" },
                height: "56px", 
                fontWeight: "bold",
                textTransform: "none"
              }}
            >
              Ajouter l'équipement à la liste
            </Button>
          </Box>
        </Box>

      </Box>

      {/* --- LISTE DES ÉQUIPEMENTS --- */}
      <Box sx={{ mt: 4 }}>
        {equipements.map((item, index) => (
          <Paper key={index} elevation={0} sx={{ p: 2, mb: 1, border: "1px solid #eee", borderLeft: "5px solid #ee773d" }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <InsertDriveFileIcon sx={{ color: "#ee773d" }} />
                <Box>
                  <Typography variant="body2">
                    <strong>Nom :</strong> {item.nom} | <strong>Modèle :</strong> {item.modele} | <strong>Numéro de série :</strong> {item.sn}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    <strong>Garantie :</strong> {item.garantie || "N/A"} 
                    {item.fichiers?.length > 0 && <> | <strong>Documents :</strong> {item.fichiers.length}</>}
                  </Typography>
                </Box>
              </Box>
              <IconButton onClick={() => onDelete(index)} sx={{ color: "#ee773d" }}><DeleteIcon /></IconButton>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default InfoEquipementRow;