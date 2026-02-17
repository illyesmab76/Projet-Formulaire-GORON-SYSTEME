import React from "react";
import { Box, Typography, Paper, Stack, Grid, useTheme, useMediaQuery } from "@mui/material";
import DividerMui from "../../../Composants/DividerMui.jsx";

// Icônes
import ComputerIcon from '@mui/icons-material/Computer';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import GavelIcon from '@mui/icons-material/Gavel';
import AppsIcon from '@mui/icons-material/Apps';
import BadgeIcon from '@mui/icons-material/Badge';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import LabelIcon from '@mui/icons-material/Label';
import CommentIcon from '@mui/icons-material/Comment';

const SectionTitle = ({ title, icon: Icon }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 3, mb: 1.5 }}>
    <Icon sx={{ color: "#ee773d" }} />
    <Typography variant="h6" sx={{ color: "#ee773d", fontWeight: "bold", textTransform: "uppercase", fontSize: "1rem" }}>
      {title}
    </Typography>
  </Box>
);

const FileChips = ({ fichiers }) => {
  if (!fichiers || fichiers.length === 0) return null;
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
      {fichiers.map((f, i) => (
        <Box key={i} sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f5f5f5', px: 1, py: 0.2, borderRadius: 1, border: '1px solid #e0e0e0' }}>
          <AttachFileIcon sx={{ fontSize: 14, mr: 0.5, color: '#666' }} />
          <Typography variant="caption" sx={{ color: '#666' }}>{f.name || (typeof f === 'string' ? f : "Fichier joint")}</Typography>
        </Box>
      ))}
    </Box>
  );
};

const DataBox = ({ label, value }) => (
  <Box sx={{ mb: 1 }}>
    <Typography variant="caption" color="text.secondary" display="block">{label}</Typography>
    <Typography variant="body2" sx={{ fontWeight: 500 }}>{value || "—"}</Typography>
  </Box>
);

function RecapitulatifRemise({ form = {} }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Extraction sécurisée des données
  const {
    numAffaire = "—",
    site = "—",
    date = "—",
    typeMateriel = "—",
    equipements = [],
    composants = [],
    logiciels = [],
    autresLogiciels = [],
    licences = [],
    comptesWindows = [],
    comptesLogiciels = [],
    passwordGenere = "Non généré",
    commentaire = ""
  } = form;

  // Style pour les lignes de texte en colonne sur mobile
  const textRowStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? 0.5 : 1.5,
    mb: isMobile ? 1 : 0
  };

  return (
    <Paper elevation={0} sx={{ p: isMobile ? 2 : 3, border: "1px solid #eee", bgcolor: "#fafafa" }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", textAlign: "center", color: "#333", fontSize: isMobile ? "1.2rem" : "1.5rem" }}>
        RÉCAPITULATIF DE LA SAISIE
      </Typography>

      {/* --- INFOS GÉNÉRALES --- */}
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}><DataBox label="N° Affaire" value={numAffaire} /></Grid>
        <Grid item xs={6} md={3}><DataBox label="Site" value={site} /></Grid>
        <Grid item xs={6} md={3}><DataBox label="Date" value={date} /></Grid>
        <Grid item xs={6} md={3}><DataBox label="Modèle" value={typeMateriel} /></Grid>
      </Grid>

      <DividerMui variant="strong" sx={{ my: 2 }} />

      {/* --- ÉQUIPEMENTS --- */}
      <SectionTitle title="Équipements" icon={ComputerIcon} />
      <Stack spacing={1}>
        {equipements.length > 0 ? equipements.map((item, i) => (
          <Paper key={i} variant="outlined" sx={{ p: 1.5, borderLeft: "4px solid #ee773d" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography variant="body2"><strong>Nom:</strong> {item.f1}</Typography>
              <Typography variant="body2"><strong>Modèle:</strong> {item.f2}</Typography>
              <Typography variant="body2"><strong>S/N:</strong> {item.f3}</Typography>
              <Typography variant="body2"><strong>Garantie:</strong> {item.garantie}</Typography>
            </Box>
            <FileChips fichiers={item.fichiers} />
          </Paper>
        )) : <Typography variant="caption" sx={{ fontStyle: 'italic', ml: 2 }}>Aucun équipement</Typography>}
      </Stack>

      {/* --- COMPOSANTS --- */}
      <SectionTitle title="Composants" icon={SettingsInputComponentIcon} />
      <Stack spacing={1}>
        {composants.length > 0 ? composants.map((item, i) => (
          <Paper key={i} variant="outlined" sx={{ p: 1.5, borderLeft: "4px solid #ee773d" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography variant="body2"><strong>Nom:</strong> {item.f1}</Typography>
              <Typography variant="body2"><strong>Modèle:</strong> {item.f2}</Typography>
              <Typography variant="body2"><strong>S/N:</strong> {item.f3}</Typography>
              <Typography variant="body2"><strong>Garantie:</strong> {item.garantie}</Typography>
            </Box>
            <FileChips fichiers={item.fichiers} />
          </Paper>
        )) : <Typography variant="caption" sx={{ fontStyle: 'italic', ml: 2 }}>Aucun composant</Typography>}
      </Stack>

      {/* --- LOGICIELS --- */}
      <SectionTitle title="Logiciels" icon={AppsIcon} />
      <Stack spacing={1}>
        {[...logiciels, ...autresLogiciels].length > 0 ? [...logiciels, ...autresLogiciels].map((item, i) => (
          <Paper key={i} variant="outlined" sx={{ p: 1.5, borderLeft: "4px solid #ee773d" }}>
            <Typography variant="body2"><strong>{item.nom || item}</strong></Typography>
            {item.version && <Typography variant="body2">Version: {item.version}</Typography>}
            <FileChips fichiers={item.fichiers} />
          </Paper>
        )) : <Typography variant="caption" sx={{ fontStyle: 'italic', ml: 2 }}>Aucun logiciel</Typography>}
      </Stack>

      {/* --- LICENCES --- */}
      <SectionTitle title="Licences" icon={GavelIcon} />
      <Stack spacing={1}>
        {licences.length > 0 ? licences.map((item, i) => (
          <Paper key={i} variant="outlined" sx={{ p: 1.5, borderLeft: "4px solid #ee773d" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography variant="body2" sx={{ color: "#ee773d", fontWeight: "bold" }}>{item.type}</Typography>
              <Typography variant="body2"><strong>N°:</strong> {item.n}</Typography>
              <Typography variant="body2"><strong>Version:</strong> {item.v}</Typography>
              <Typography variant="body2"><strong>Marque:</strong> {item.m}</Typography>
            </Box>
            <FileChips fichiers={item.fichiers} />
          </Paper>
        )) : <Typography variant="caption" sx={{ fontStyle: 'italic', ml: 2 }}>Aucune licence</Typography>}
      </Stack>

      <DividerMui variant="strong" sx={{ my: 4 }} />

      {/* --- SECTION IDENTIFIANTS --- */}
      <SectionTitle title="Identifiants & Comptes" icon={BadgeIcon} />
      
      <Stack spacing={3}>
        {/* ADMIN GÉNÉRÉ */}
        <Box sx={{ p: 2, bgcolor: "#fff3e0", borderRadius: 1, border: "1px solid #ffe0b2", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 1 : 3 }}>
          <AdminPanelSettingsIcon sx={{ color: "#e65100", fontSize: 30 }} />
          <Box>
            <Typography variant="caption" sx={{ color: "#e65100", fontWeight: "bold" }}>ADMIN PAR DÉFAUT</Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold", fontFamily: "monospace", display: "block" }}>
              Utilisateur : Administrateur
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold", fontFamily: "monospace", display: "block" }}>
              MDP : {passwordGenere}
            </Typography>
          </Box>
        </Box>

        {/* WINDOWS EN COLONNES SUR MOBILE */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold", color: "#555", display: "flex", alignItems: "center", gap: 1 }}>
            <div style={{ width: 4, height: 18, backgroundColor: "#ee773d" }} /> Comptes Windows
          </Typography>
          <Stack spacing={1}>
            {comptesWindows.length > 0 ? comptesWindows.map((c, i) => (
              <Paper key={i} variant="outlined" sx={{ p: 2, display: "flex", flexDirection: "column", gap: 0.5, bgcolor: "white" }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                   {c.type === "Admin" ? <AdminPanelSettingsIcon sx={{ fontSize: 18, color: "#ee773d" }} /> : <PersonIcon sx={{ fontSize: 18, color: "#ee773d" }} />}
                   <Typography variant="body2" sx={{ fontWeight: "bold", color: "#ee773d" }}>{c.type}</Typography>
                </Box>
                <Typography variant="body2"><strong>Utilisateur :</strong> {c.id || "—"}</Typography>
                <Typography variant="body2"><strong>Mot de passe :</strong> <span style={{ fontFamily: "monospace", color: "#d32f2f", fontWeight: "bold" }}>{c.mdp || "—"}</span></Typography>
              </Paper>
            )) : <Typography variant="caption" sx={{ fontStyle: 'italic', ml: 2 }}>Aucun compte Windows</Typography>}
          </Stack>
        </Box>

        {/* LOGICIELS EN COLONNES SUR MOBILE */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold", color: "#555", display: "flex", alignItems: "center", gap: 1 }}>
            <div style={{ width: 4, height: 18, backgroundColor: "#ee773d" }} /> Comptes Logiciels
          </Typography>
          <Stack spacing={1}>
            {comptesLogiciels.length > 0 ? comptesLogiciels.map((c, i) => (
              <Paper key={i} variant="outlined" sx={{ p: 2, display: "flex", flexDirection: "column", gap: 0.5, bgcolor: "white" }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                   <LabelIcon sx={{ fontSize: 18, color: "#ee773d" }} />
                   <Typography variant="body2" sx={{ fontWeight: "bold", color: "#ee773d" }}>{c.nom || "—"}</Typography>
                </Box>
                <Typography variant="body2"><strong>ID :</strong> {c.id || "—"}</Typography>
                <Typography variant="body2"><strong>Mot de passe :</strong> <span style={{ fontFamily: "monospace", color: "#d32f2f", fontWeight: "bold" }}>{c.mdp || "—"}</span></Typography>
              </Paper>
            )) : <Typography variant="caption" sx={{ fontStyle: 'italic', ml: 2 }}>Aucun identifiant logiciel</Typography>}
          </Stack>
        </Box>
      </Stack>

      {/* --- COMMENTAIRES (NOUVELLE SECTION) --- */}
      {commentaire && (
        <>
          <DividerMui variant="strong" sx={{ my: 4 }} />
          <SectionTitle title="Commentaires" icon={CommentIcon} />
          <Paper 
            variant="outlined" 
            sx={{ 
              p: isMobile ? 2 : 3, 
              bgcolor: "white",
              borderLeft: "4px solid #ee773d"
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                whiteSpace: "pre-wrap",
                lineHeight: 1.6,
                color: "#333"
              }}
            >
              {commentaire}
            </Typography>
          </Paper>
        </>
      )}
    </Paper>
  );
}

export default RecapitulatifRemise;