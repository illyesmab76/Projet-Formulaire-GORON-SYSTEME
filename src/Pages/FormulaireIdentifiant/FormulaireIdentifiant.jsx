import React, { useEffect } from "react";
import { Box, useTheme, useMediaQuery, Tooltip, Grid } from "@mui/material"; 

// Icônes
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DescriptionIcon from '@mui/icons-material/Description';
import SaveIcon from '@mui/icons-material/Save';

// --- COMPOSANTS UI (Génériques) ---
import Typo from "../../Composants/Typo.jsx";
import DividerMui from "../../Composants/DividerMui.jsx";
import ButtonMui from "../../Composants/ButtonMui.jsx"; 

// --- COMPOSANTS MÉTIER ---
import IdentityRow from "./elements/IdentityRow.jsx";
import ModelValidationRow from "./elements/ModelValidationRow.jsx";
import GeneratedEmailRow from "./elements/GenerationRow.jsx";
import InfoEquipementRow from "./elements/InfoEquipementRow.jsx";
import FinalRecapView from "./elements/FinalRecapView.jsx";
import FicheEngagementView from "./elements/FicheEngagementView.jsx";

// --- LOGIQUE ---
import { useIdentifiantForm } from "../../hooks/useIdentifiantForm.jsx";
import ValidationChamps from "../../hooks/ValidationChamps.jsx";

// --- STYLES ---
import { buttonStyles } from "./styles/buttonStyles";

function FormulaireIdentifiant({ onBack, onHome, initialData }) { // <--- Ajout de onHome
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    form,
    isLocked,
    showInfoEquip,
    showFinalRecap,
    showFiche,
    isFicheComplete,
    setForm,
    setIsLocked,
    setShowInfoEquip,
    setShowFinalRecap,
    setShowFiche,
    handleFormChange,
    handleValidate,
    handleAddEquipement,
    handleDeleteEquipement,
    handleSaveSignature,
    handleSaveNomSignature,
    handleCreateFiche,
  } = useIdentifiantForm();

  const { isValid } = ValidationChamps(form);

  useEffect(() => {
    if (initialData && typeof setForm === 'function') {
      setForm(initialData);
      setIsLocked(true);
      setShowFiche(true); 
    }
  }, [initialData, setForm, setIsLocked, setShowFiche]);

  useEffect(() => {
    if (form.nom && form.Monsieur !== form.nom) {
      handleFormChange({
        target: { name: "Monsieur", value: form.nom }
      });
    }
  }, [form.nom, handleFormChange, form.Monsieur]);

  const { orangeButtonSx, greyButtonSx, buttonContainerStyle } = 
    buttonStyles(isMobile);

  const handleSaveForm = () => {
    const storageKey = `formulaire_${form.nom}_${form.prenom}_${Date.now()}`;
    localStorage.setItem(storageKey, JSON.stringify(form));
    
    const formData = JSON.stringify(form, null, 2);
    const blob = new Blob([formData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `formulaire_${form.nom}_${form.prenom}_${new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')}.json`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert('Formulaire enregistré avec succès !');
    if (onHome) onHome(); // <--- Retour à la page "Choisir un formulaire"
  };

  const handleCreateAndNavigate = async () => {
    const success = await handleCreateFiche();
    if (success) {
      if (onHome) onHome(); // <--- Retour à la page "Choisir un formulaire"
    }
  };

  const saveButtonSx = {
    ...orangeButtonSx,
    backgroundColor: "#4caf50",
    "&:hover": { 
      backgroundColor: "#45a049" 
    },
  };

  if (showFiche) {
    return (
      <Box sx={{ minHeight: "100vh", p: isMobile ? 2 : 4 }}>
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          <Typo variant="h3" color="#ee773d" fontWeight="bold" mb={3}>
            Identifiants et remise informatique
          </Typo>
          <DividerMui variant="strong" sx={{ mb: 2 }} />

          <FicheEngagementView 
            form={form}
            handleFormChange={handleFormChange}
            handleSaveSignature={handleSaveSignature}
            handleSaveNomSignature={handleSaveNomSignature}
          />

          <DividerMui variant="strong" sx={{ mt: 4, mb: 3 }} />

          <Box sx={{
            ...buttonContainerStyle,
            justifyContent: "space-between",
          }}>
            <ButtonMui 
              sx={greyButtonSx} 
              startIcon={<ArrowBackIcon />} 
              onClick={() => setShowFiche(false)}
            >
              Retour
            </ButtonMui>
            
            <Box sx={{ 
              display: "flex", 
              gap: 2, 
              flexDirection: isMobile ? "column" : "row",
              width: isMobile ? "100%" : "auto"
            }}>
              <ButtonMui 
                sx={saveButtonSx}
                startIcon={<SaveIcon />}
                onClick={handleSaveForm}
                fullWidth={isMobile}
              >
                Enregistrer
              </ButtonMui>
              
              <Tooltip 
                title={!isFicheComplete ? "Veuillez remplir tous les champs requis" : "Générer le document Word"} 
                arrow
              >
                <span style={{ width: isMobile ? "100%" : "auto" }}>
                  <ButtonMui 
                    sx={orangeButtonSx} 
                    onClick={handleCreateAndNavigate}
                    fullWidth={isMobile}
                    disabled={!isFicheComplete}
                  >
                    Créer la fiche
                  </ButtonMui>
                </span>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  if (showFinalRecap) {
    return (
      <Box sx={{ minHeight: "100vh", p: isMobile ? 2 : 4 }}>
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          <Typo variant="h3" color="#ee773d" fontWeight="bold" mb={3}>
            Identifiants et remise informatique
          </Typo>
          <DividerMui variant="strong" sx={{ mb: 2 }} />

          <FinalRecapView form={form} />

          <Box sx={buttonContainerStyle}>
            <ButtonMui 
              sx={greyButtonSx} 
              startIcon={<ArrowBackIcon />} 
              onClick={() => setShowFinalRecap(false)}
            >
              Retour
            </ButtonMui>
            
            <ButtonMui 
              sx={orangeButtonSx} 
              startIcon={<DescriptionIcon />} 
              onClick={() => setShowFiche(true)}
            >
              Fiche d'engagement
            </ButtonMui>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", p: isMobile ? 2 : 4 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        
        <Typo variant="h3" color="#ee773d" fontWeight="bold" mb={3}>
          Identifiants et remise informatique
        </Typo>
        <DividerMui variant="strong" sx={{ mb: 2 }} />

        <IdentityRow 
          form={form} 
          onChange={handleFormChange} 
          disabled={isLocked}
        />

        {!isLocked ? (
          <>
            <ModelValidationRow 
              value={form.modele} 
              onChange={handleFormChange} 
              onValidate={handleValidate}
              disabled={!isValid}
            />
            <DividerMui variant="strong" sx={{ mt: 4, mb: 3 }} /> 
            
            <Box sx={{ ...buttonContainerStyle, justifyContent: "flex-start" }}>
              <ButtonMui 
                sx={greyButtonSx} 
                startIcon={<ArrowBackIcon />}
                onClick={onBack} // Reste vers AccueilFormulaire ici car c'est un retour manuel
              >
                Retour
              </ButtonMui>
            </Box>
          </>
        ) : (
          <>
            {!showInfoEquip ? (
              <>
                <DividerMui variant="light" sx={{ mt: 4, mb: 3 }} />
                <GeneratedEmailRow 
                  email={form.emailGenere} 
                  password={form.passwordGenere} 
                  trigramme={form.trigrammeGenere} 
                  onChange={handleFormChange} 
                />
                <DividerMui variant="strong" sx={{ mt: 4, mb: 3 }} />
                <Box sx={buttonContainerStyle}>
                  <ButtonMui 
                    sx={greyButtonSx} 
                    startIcon={<ArrowBackIcon />} 
                    onClick={() => setIsLocked(false)}
                  >
                    Retour
                  </ButtonMui>
                  <ButtonMui 
                    sx={orangeButtonSx} 
                    onClick={() => setShowInfoEquip(true)}
                  >
                    Ajouter équipement
                  </ButtonMui>
                </Box>
              </>
            ) : (
              <>
                <DividerMui variant="light" sx={{ mt: 4, mb: 3 }} />
                <InfoEquipementRow 
                  equipements={form.equipements}
                  onAdd={handleAddEquipement}
                  onDelete={handleDeleteEquipement}
                />
                <DividerMui variant="strong" sx={{ mt: 4, mb: 3 }} />
                <Box sx={buttonContainerStyle}>
                  <ButtonMui 
                    sx={greyButtonSx} 
                    startIcon={<ArrowBackIcon />} 
                    onClick={() => setShowInfoEquip(false)}
                  >
                    Retour
                  </ButtonMui>
                  <ButtonMui 
                    sx={orangeButtonSx} 
                    onClick={() => setShowFinalRecap(true)}
                  >
                    Récapitulatif
                  </ButtonMui>
                </Box>
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default FormulaireIdentifiant;