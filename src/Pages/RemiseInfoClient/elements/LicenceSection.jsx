import React, { useState } from "react";
import { Box, Typography, IconButton, Paper, Stack, Button, useTheme, useMediaQuery } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

import InputMui from "../../../Composants/InputMui.jsx";
import SelectMui from "../../FormulaireIdentifiant/elements/SelectMui.jsx";
import DividerMui from "../../../Composants/DividerMui.jsx";
import UploadButtonMui from "../../../Composants/UploadButtonMui.jsx";

function LicenceSection({ items, onAdd, onDelete }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [newLic, setNewLic] = useState({ type: "Windows", n: "", v: "", m: "", fichiers: [] });
  const [autreLic, setAutreLic] = useState({ type: "", n: "", v: "", m: "", fichiers: [] });

  const optionsLicences = [
    { value: "Windows", label: "Windows" },
    { value: "Vidéo", label: "Vidéo" },
    { value: "Analyse d'image", label: "Analyse d'image" },
    { value: "Intrusion", label: "Intrusion" },
    { value: "Centrale d'accès", label: "Centrale d'accès" },
    { value: "Office", label: "Office" }
  ];

  const handleAddStandard = () => {
    if (newLic.n) {
      onAdd({ ...newLic });
      setNewLic({ type: "Windows", n: "", v: "", m: "", fichiers: [] });
    }
  };

  const handleAddAutre = () => {
    if (autreLic.type && autreLic.n) {
      onAdd({ ...autreLic });
      setAutreLic({ type: "", n: "", v: "", m: "", fichiers: [] });
    }
  };

  const addButtonStyle = {
    backgroundColor: "#ee773d",
    "&:hover": { backgroundColor: "#d66632" },
    height: "56px",
    fontWeight: "bold",
    textTransform: "none",
    color: "white",
    width: "100%",
  };

  const uploadSx = {
    height: "56px",
    width: "100%",
    borderStyle: "dashed",
    borderWidth: "1px",
    borderColor: "#ccc",
    "&:hover": { borderStyle: "dashed" }
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, color: "#ee773d", fontWeight: "bold" }}>
        Licences
      </Typography>

      {/* BLOC 1 */}
      <Box sx={{ display: "flex", gap: 2, flexDirection: "column", mb: 2 }}>
        <Box sx={{ display: "flex", gap: 2, flexDirection: isTablet ? "column" : "row" }}>
          <Box sx={{ flex: 1 }}><SelectMui label="Type de Licence" options={optionsLicences} value={newLic.type} onChange={(e) => setNewLic({...newLic, type: e.target.value})} /></Box>
          <Box sx={{ flex: 1 }}><InputMui label="N° Licence" value={newLic.n} onChange={(e) => setNewLic({...newLic, n: e.target.value})} fullWidth /></Box>
          <Box sx={{ flex: 1 }}><InputMui label="Version" value={newLic.v} onChange={(e) => setNewLic({...newLic, v: e.target.value})} fullWidth /></Box>
          <Box sx={{ flex: 1 }}><InputMui label="Marque" value={newLic.m} onChange={(e) => setNewLic({...newLic, m: e.target.value})} fullWidth /></Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2, flexDirection: isTablet ? "column" : "row" }}>
          <UploadButtonMui label={newLic.fichiers.length > 0 ? `${newLic.fichiers.length} doc(s) joint(s)` : "Joindre des documents"} onFileSelect={(files) => setNewLic({...newLic, fichiers: [...newLic.fichiers, ...files]})} sx={uploadSx} />
          <Button variant="contained" onClick={handleAddStandard} startIcon={<AddCircleIcon />} sx={addButtonStyle}>Ajouter</Button>
        </Box>
      </Box>

      <DividerMui variant="light" sx={{ my: 4 }} />

      {/* BLOC 2 */}
      <Typography variant="h6" sx={{ mb: 2, color: "#ee773d", fontWeight: "bold" }}>Autres Licences</Typography>
      <Box sx={{ display: "flex", gap: 2, flexDirection: "column", mb: 3 }}>
        <Box sx={{ display: "flex", gap: 2, flexDirection: isTablet ? "column" : "row" }}>
          <Box sx={{ flex: 1 }}><InputMui label="Nom Licence" value={autreLic.type} onChange={(e) => setAutreLic({...autreLic, type: e.target.value})} fullWidth /></Box>
          <Box sx={{ flex: 1 }}><InputMui label="N° Licence" value={autreLic.n} onChange={(e) => setAutreLic({...autreLic, n: e.target.value})} fullWidth /></Box>
          <Box sx={{ flex: 1 }}><InputMui label="Version" value={autreLic.v} onChange={(e) => setAutreLic({...autreLic, v: e.target.value})} fullWidth /></Box>
          <Box sx={{ flex: 1 }}><InputMui label="Marque" value={autreLic.m} onChange={(e) => setAutreLic({...autreLic, m: e.target.value})} fullWidth /></Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2, flexDirection: isTablet ? "column" : "row" }}>
          <UploadButtonMui label={autreLic.fichiers.length > 0 ? `${autreLic.fichiers.length} doc(s) joint(s)` : "Joindre des documents"} onFileSelect={(files) => setAutreLic({...autreLic, fichiers: [...autreLic.fichiers, ...files]})} sx={uploadSx} />
          <Button variant="contained" onClick={handleAddAutre} startIcon={<AddCircleIcon />} sx={addButtonStyle}>Ajouter</Button>
        </Box>
      </Box>

      {/* RÉCAPITULATIF SOUS FORME DE LISTE RÉELLE */}
      <Stack spacing={2} sx={{ mt: 2 }}>
        {items.map((item, index) => (
          <Paper 
            key={index} 
            elevation={0} 
            sx={{ 
              p: 2, 
              border: "1px solid #eee", 
              borderLeft: "6px solid #ee773d", 
              display: "flex", 
              flexDirection: "row", // Toujours row pour garder l'icône à gauche et poubelle à droite
              justifyContent: "space-between", 
              alignItems: "flex-start" 
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <VerifiedUserIcon sx={{ color: "#ee773d", mt: 0.3 }} />
              
              {/* ICI : FORÇAGE DE LA LISTE VERTICALE */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#333", lineHeight: 1.2 }}>
                  {item.type}
                </Typography>
                
                <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none" }}>
                   <Typography component="li" variant="body2"><strong>N° :</strong> {item.n}</Typography>
                   <Typography component="li" variant="body2"><strong>Version :</strong> {item.v || "N/A"}</Typography>
                   <Typography component="li" variant="body2"><strong>Marque :</strong> {item.m || "N/A"}</Typography>
                   {item.fichiers?.length > 0 && (
                     <Typography component="li" variant="caption" sx={{ color: "#666", fontStyle: "italic", mt: 0.5 }}>
                       📄 {item.fichiers.length} document(s) joint(s)
                     </Typography>
                   )}
                </Box>
              </Box>
            </Box>
            
            <IconButton onClick={() => onDelete(index)} sx={{ color: "#ee773d", ml: 1 }}>
              <DeleteIcon />
            </IconButton>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

export default LicenceSection;