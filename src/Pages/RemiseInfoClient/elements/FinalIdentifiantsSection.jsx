import React, { useState } from "react";
import { 
  Box, Typography, Paper, IconButton, InputAdornment, 
  Stack, useTheme, useMediaQuery 
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Refresh } from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';
import ComputerIcon from '@mui/icons-material/Computer';

import InputMui from "../../../Composants/InputMui.jsx";
import SelectMui from "../../FormulaireIdentifiant/elements/SelectMui.jsx";
import ButtonMui from "../../../Composants/ButtonMui.jsx";
import DividerMui from "../../../Composants/DividerMui.jsx";

const generatePass = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let passwordArray = [];
  for (let i = 0; i < 11; i++) {
    passwordArray.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }
  passwordArray.splice(Math.floor(Math.random() * 12), 0, "@");
  return passwordArray.join("");
};

function FinalIdentifiantsSection({ adminPassword, windowsComptes, logicielComptes, onAddWindows, onDeleteWindows, onAddLogiciel, onDeleteLogiciel }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [win, setWin] = useState({ id: "", mdp: generatePass(), type: "Utilisateur" });
  const [log, setLog] = useState({ nom: "", id: "", mdp: generatePass() });

  const handleAddWin = () => {
    if (win.id) { onAddWindows(win); setWin({ id: "", mdp: generatePass(), type: "Utilisateur" }); }
  };

  const handleAddLog = () => {
    if (log.nom && log.id) { onAddLogiciel(log); setLog({ nom: "", id: "", mdp: generatePass() }); }
  };

  const bigButtonStyle = {
    height: "56px",
    bgcolor: "#ee773d",
    color: "white",
    fontWeight: "bold",
    width: "100%",
    "&:hover": { bgcolor: "#d66632" }
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, color: "#ee773d", fontWeight: "bold" }}>Identifiants</Typography>

      {/* --- SECTION WINDOWS --- */}
      <Typography variant="h6" sx={{ color: "#ee773d", mb: 2 }}>Identifiants Windows</Typography>
      
      {/* Admin Principal */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexDirection: isTablet ? "column" : "row" }}>
        <Box sx={{ flex: 1 }}><InputMui label="Identifiant" value="Administrateur" disabled fullWidth /></Box>
        <Box sx={{ flex: 1 }}><InputMui label="Mot de passe" value={adminPassword} disabled fullWidth /></Box>
      </Box>

      {/* Ajout Windows */}
      <Stack spacing={2} sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", gap: 2, flexDirection: isTablet ? "column" : "row" }}>
          <Box sx={{ flex: 1.5 }}><InputMui label="Identifiant" value={win.id} onChange={(e) => setWin({...win, id: e.target.value})} fullWidth /></Box>
          <Box sx={{ flex: 1.5 }}>
            <InputMui label="Mot de passe" value={win.mdp} onChange={(e) => setWin({...win, mdp: e.target.value})} fullWidth
              InputProps={{ endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setWin({...win, mdp: generatePass()})}><Refresh fontSize="small" sx={{ color: "#ee773d" }} /></IconButton>
                </InputAdornment>
              )}}
            />
          </Box>
          <Box sx={{ flex: 1 }}><SelectMui label="Type" options={[{value:"Admin", label:"Admin"}, {value:"Utilisateur", label:"Utilisateur"}]} value={win.type} onChange={(e) => setWin({...win, type: e.target.value})} /></Box>
        </Box>
        <ButtonMui onClick={handleAddWin} startIcon={<AddCircleIcon />} sx={bigButtonStyle}>Ajouter compte Windows</ButtonMui>
      </Stack>

      {/* Liste Windows Format Colonne */}
      <Stack spacing={1} sx={{ mb: 3 }}>
        {windowsComptes.map((item, idx) => (
          <Paper key={idx} elevation={0} sx={{ p: 2, border: "1px solid #eee", borderLeft: "5px solid #ee773d", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <PersonIcon sx={{ color: "#ee773d", mt: 0.5 }} />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>Compte Windows</Typography>
                <Typography variant="body2"><strong>ID :</strong> {item.id}</Typography>
                <Typography variant="body2"><strong>MDP :</strong> {item.mdp}</Typography>
                <Typography variant="body2"><strong>Type :</strong> {item.type}</Typography>
              </Box>
            </Box>
            <IconButton onClick={() => onDeleteWindows(idx)} sx={{ color: "#ee773d" }}><DeleteIcon /></IconButton>
          </Paper>
        ))}
      </Stack>

      <DividerMui variant="light" sx={{ my: 4 }} />

      {/* --- SECTION LOGICIELS --- */}
      <Typography variant="h6" sx={{ color: "#ee773d", mb: 2 }}>Identifiants Logiciels</Typography>
      
      <Stack spacing={2} sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", gap: 2, flexDirection: isTablet ? "column" : "row" }}>
          <Box sx={{ flex: 1 }}><InputMui label="Nom du logiciel" value={log.nom} onChange={(e) => setLog({...log, nom: e.target.value})} fullWidth /></Box>
          <Box sx={{ flex: 1 }}><InputMui label="Identifiant" value={log.id} onChange={(e) => setLog({...log, id: e.target.value})} fullWidth /></Box>
          <Box sx={{ flex: 1 }}>
            <InputMui label="Mot de passe" value={log.mdp} onChange={(e) => setLog({...log, mdp: e.target.value})} fullWidth
              InputProps={{ endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setLog({...log, mdp: generatePass()})}><Refresh fontSize="small" sx={{ color: "#ee773d" }} /></IconButton>
                </InputAdornment>
              )}}
            />
          </Box>
        </Box>
        <ButtonMui onClick={handleAddLog} startIcon={<AddCircleIcon />} sx={bigButtonStyle}>Ajouter compte logiciel</ButtonMui>
      </Stack>

      {/* Liste Logiciels Format Colonne */}
      <Stack spacing={1}>
        {logicielComptes.map((item, idx) => (
          <Paper key={idx} elevation={0} sx={{ p: 2, border: "1px solid #eee", borderLeft: "5px solid #ee773d", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <ComputerIcon sx={{ color: "#ee773d", mt: 0.5 }} />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#ee773d" }}>{item.nom}</Typography>
                <Typography variant="body2"><strong>ID :</strong> {item.id}</Typography>
                <Typography variant="body2"><strong>MDP :</strong> {item.mdp}</Typography>
              </Box>
            </Box>
            <IconButton onClick={() => onDeleteLogiciel(idx)} sx={{ color: "#ee773d" }}><DeleteIcon /></IconButton>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

export default FinalIdentifiantsSection;