import React, { useState, useCallback } from "react";
import { Box, useTheme, useMediaQuery, Tooltip } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VisibilityIcon from '@mui/icons-material/Visibility';

// --- COMPOSANTS UI ---
import Typo from "../../Composants/Typo.jsx";
import DividerMui from "../../Composants/DividerMui.jsx";
import ButtonMui from "../../Composants/ButtonMui.jsx";

// --- COMPOSANTS MÉTIER ---
import RemiseClientRow from "./elements/RemiseClientRow.jsx";
import GeneratedInfoRow from "./elements/GeneratedInfoRow.jsx";
import InfoEquipementRow from "./elements/InfoEquipementRow.jsx";
import LicenceSection from "./elements/LicenceSection.jsx";
import LogicielSection from "./elements/LogicielSection.jsx";
import FinalIdentifiantsSection from "./elements/FinalIdentifiantsSection.jsx";
import CommentaireSection from "./elements/CommentaireSection.jsx";
import RecapitulatifRemise from "./elements/RecapitulatifRemise.jsx";
import SignatureRemise from "./elements/SignatureRemise.jsx";

// --- SERVICES ---
import { generateRemiseDocument } from "../../utils/WordServiceRemise.js";

// --- STYLES ---
import { buttonStyles } from "../FormulaireIdentifiant/styles/buttonStyles";

const generateStrongPassword = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let passwordArray = [];
  for (let i = 0; i < 11; i++) {
    passwordArray.push(chars.charAt(Math.floor(chars.length * Math.random())));
  }
  passwordArray.splice(Math.floor(Math.random() * 12), 0, "@");
  return passwordArray.join("");
};

const getTodayDate = () => new Date().toLocaleDateString('fr-FR');

function RemiseInfoClient({ onBack }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { greyButtonSx, orangeButtonSx, buttonContainerStyle } = buttonStyles(isMobile);

  const [formData, setFormData] = useState({
    numAffaire: "",
    site: "",
    date: getTodayDate(),
    typeMateriel: "", 
    passwordGenere: "",
    equipements: [],
    composants: [],
    licences: [],
    logiciels: [],
    comptesWindows: [],
    comptesLogiciels: [],
    commentaire: "",
    signatureAnimateur: ""
  });

  const [isLocked, setIsLocked] = useState(false);
  const [activeStep, setActiveStep] = useState("identifiants");
  const [showRecap, setShowRecap] = useState(false);
  const [showSignature, setShowSignature] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleValidate = () => {
    setFormData(prev => ({ ...prev, passwordGenere: generateStrongPassword() }));
    setIsLocked(true);
  };

  const handleSaveSignature = (signatureData) => {
    setFormData(prev => ({ ...prev, signatureAnimateur: signatureData }));
  };

  const handleAddLogicielBatch = (nouveaux) => {
    setFormData(prev => ({ ...prev, logiciels: [...prev.logiciels, ...nouveaux] }));
  };

  const handleAddLogicielSingle = (nouveau) => {
    setFormData(prev => ({ ...prev, logiciels: [...prev.logiciels, nouveau] }));
  };

  const handleDeleteLogiciel = (index) => {
    setFormData(prev => ({ ...prev, logiciels: prev.logiciels.filter((_, i) => i !== index) }));
  };

  const handleGenerateDocument = async () => {
    try {
      const result = await generateRemiseDocument(formData);
      if (result.success) {
        alert("Documents générés avec succès !");
      } else {
        alert(`Erreur : ${result.error}`);
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la génération");
    }
  };

  const isAutre = formData.typeMateriel === "Autre";
  const isFicheComplete = formData.signatureAnimateur !== "";

  if (showSignature) {
    return (
      <Box sx={{ minHeight: "100vh", p: isMobile ? 2 : 4 }}>
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          <Typo variant="h3" color="#ee773d" fontWeight="bold" mb={3}>
            Signature de remise
          </Typo>
          <DividerMui variant="strong" sx={{ mb: 2 }} />
          <SignatureRemise
            signature={formData.signatureAnimateur}
            onSaveSignature={handleSaveSignature}
          />
          <DividerMui variant="strong" sx={{ mt: 4, mb: 3 }} />
          <Box sx={{ ...buttonContainerStyle, justifyContent: "space-between" }}>
            <ButtonMui
              sx={greyButtonSx}
              startIcon={<ArrowBackIcon />}
              onClick={() => setShowSignature(false)}
            >
              Retour
            </ButtonMui>
            <Tooltip
              title={!isFicheComplete ? "Veuillez signer avant de générer" : "Générer les documents"}
              arrow
            >
              <span style={{ width: isMobile ? "100%" : "auto" }}>
                              <ButtonMui
                sx={{ ...orangeButtonSx, minWidth: "220px", px: 4 }}
                fullWidth={isMobile}
                disabled={!isFicheComplete}
                onClick={handleGenerateDocument}
              >
                Générer les documents
              </ButtonMui>
              </span>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    );
  }

  if (showRecap) {
    return (
      <Box sx={{ minHeight: "100vh", p: isMobile ? 2 : 4 }}>
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          <Typo variant="h3" color="#ee773d" fontWeight="bold" mb={3}>
            Récapitulatif de remise
          </Typo>
          <DividerMui variant="strong" sx={{ mb: 2 }} />
          <RecapitulatifRemise form={formData} />
          <DividerMui variant="strong" sx={{ mt: 4, mb: 3 }} />
          <Box sx={{ ...buttonContainerStyle, justifyContent: "space-between" }}>
            <ButtonMui
              sx={greyButtonSx}
              startIcon={<ArrowBackIcon />}
              onClick={() => setShowRecap(false)}
            >
              Retour
            </ButtonMui>
            <ButtonMui
              sx={orangeButtonSx}
              fullWidth={isMobile}
              onClick={() => { setShowRecap(false); setShowSignature(true); }}
            >
              Créer la fiche
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
          Remise informatique client
        </Typo>
        <DividerMui variant="strong" sx={{ mb: 2 }} />

        {activeStep === "identifiants" && (
          <>
            <RemiseClientRow
              form={formData}
              onChange={handleChange}
              onValidate={handleValidate}
              disabled={isLocked}
            />
            {!isLocked && (
              <Box sx={{ mt: 4, ...buttonContainerStyle, justifyContent: "flex-start" }}>
                <ButtonMui sx={greyButtonSx} startIcon={<ArrowBackIcon />} onClick={onBack}>
                  Menu principal
                </ButtonMui>
              </Box>
            )}
            {isLocked && (
              <>
                <DividerMui variant="light" sx={{ mt: 4, mb: 3 }} />
                <GeneratedInfoRow password={formData.passwordGenere} onChange={handleChange} />
                <DividerMui variant="strong" sx={{ mt: 4, mb: 3 }} />
                <Box sx={{ ...buttonContainerStyle, justifyContent: "space-between" }}>
                  <ButtonMui sx={greyButtonSx} startIcon={<ArrowBackIcon />} onClick={() => setIsLocked(false)}>
                    Retour
                  </ButtonMui>
                  <ButtonMui sx={orangeButtonSx} endIcon={<ArrowForwardIcon />} onClick={() => setActiveStep("equipements")}>
                    Suivant
                  </ButtonMui>
                </Box>
              </>
            )}
          </>
        )}

        {activeStep === "equipements" && (
          <>
            <InfoEquipementRow
              title="Équipements"
              type="equipement"
              items={formData.equipements}
              onAdd={(item) => setFormData(p => ({ ...p, equipements: [...p.equipements, item] }))}
              onDelete={(idx) => setFormData(p => ({ ...p, equipements: p.equipements.filter((_, i) => i !== idx) }))}
            />
            <DividerMui variant="light" sx={{ my: 4 }} />
            <InfoEquipementRow
              title="Composants"
              type="composant"
              items={formData.composants}
              onAdd={(item) => setFormData(p => ({ ...p, composants: [...p.composants, item] }))}
              onDelete={(idx) => setFormData(p => ({ ...p, composants: p.composants.filter((_, i) => i !== idx) }))}
            />
            <DividerMui variant="strong" sx={{ mt: 4, mb: 3 }} />
            <Box sx={{ ...buttonContainerStyle, justifyContent: "space-between" }}>
              <ButtonMui sx={greyButtonSx} startIcon={<ArrowBackIcon />} onClick={() => setActiveStep("identifiants")}>
                Retour
              </ButtonMui>
              <ButtonMui
                sx={orangeButtonSx}
                endIcon={isAutre ? null : <ArrowForwardIcon />}
                onClick={() => isAutre ? setActiveStep("commentaires") : setActiveStep("licences")}
              >
                {isAutre ? "Commentaires" : "Suivant"}
              </ButtonMui>
            </Box>
          </>
        )}

        {activeStep === "licences" && !isAutre && (
          <>
            <LicenceSection
              items={formData.licences}
              onAdd={(item) => setFormData(p => ({ ...p, licences: [...p.licences, item] }))}
              onDelete={(idx) => setFormData(p => ({ ...p, licences: p.licences.filter((_, i) => i !== idx) }))}
            />
            <DividerMui variant="strong" sx={{ mt: 4, mb: 3 }} />
            <Box sx={{ ...buttonContainerStyle, justifyContent: "space-between" }}>
              <ButtonMui sx={greyButtonSx} startIcon={<ArrowBackIcon />} onClick={() => setActiveStep("equipements")}>
                Retour
              </ButtonMui>
              <ButtonMui sx={orangeButtonSx} endIcon={<ArrowForwardIcon />} onClick={() => setActiveStep("logiciels")}>
                Suivant
              </ButtonMui>
            </Box>
          </>
        )}

        {activeStep === "logiciels" && !isAutre && (
          <>
            <LogicielSection
              items={formData.logiciels}
              onAddBatch={handleAddLogicielBatch}
              onAddSingle={handleAddLogicielSingle}
              onDelete={handleDeleteLogiciel}
            />
            <DividerMui variant="strong" sx={{ mt: 4, mb: 3 }} />
            <Box sx={{ ...buttonContainerStyle, justifyContent: "space-between" }}>
              <ButtonMui sx={greyButtonSx} startIcon={<ArrowBackIcon />} onClick={() => setActiveStep("licences")}>
                Retour
              </ButtonMui>
              <ButtonMui sx={orangeButtonSx} endIcon={<ArrowForwardIcon />} onClick={() => setActiveStep("comptes")}>
                Suivant
              </ButtonMui>
            </Box>
          </>
        )}

        {activeStep === "comptes" && !isAutre && (
          <>
            <FinalIdentifiantsSection
              adminPassword={formData.passwordGenere}
              windowsComptes={formData.comptesWindows}
              logicielComptes={formData.comptesLogiciels}
              onAddWindows={(c) => setFormData(p => ({ ...p, comptesWindows: [...p.comptesWindows, c] }))}
              onDeleteWindows={(idx) => setFormData(p => ({ ...p, comptesWindows: p.comptesWindows.filter((_, i) => i !== idx) }))}
              onAddLogiciel={(c) => setFormData(p => ({ ...p, comptesLogiciels: [...p.comptesLogiciels, c] }))}
              onDeleteLogiciel={(idx) => setFormData(p => ({ ...p, comptesLogiciels: p.comptesLogiciels.filter((_, i) => i !== idx) }))}
            />
            <DividerMui variant="strong" sx={{ mt: 4, mb: 3 }} />
            <Box sx={{ ...buttonContainerStyle, justifyContent: "space-between" }}>
              <ButtonMui sx={greyButtonSx} startIcon={<ArrowBackIcon />} onClick={() => setActiveStep("logiciels")}>
                Retour
              </ButtonMui>
              <ButtonMui sx={orangeButtonSx} endIcon={<ArrowForwardIcon />} onClick={() => setActiveStep("commentaires")}>
                Suivant
              </ButtonMui>
            </Box>
          </>
        )}

        {activeStep === "commentaires" && (
          <>
            <CommentaireSection value={formData.commentaire} onChange={handleChange} />
            <DividerMui variant="strong" sx={{ mt: 4, mb: 3 }} />
            <Box sx={{ ...buttonContainerStyle, justifyContent: "space-between" }}>
              <ButtonMui
                sx={greyButtonSx}
                startIcon={<ArrowBackIcon />}
                onClick={() => setActiveStep(isAutre ? "equipements" : "comptes")}
              >
                Retour
              </ButtonMui>
              <ButtonMui sx={orangeButtonSx} startIcon={<VisibilityIcon />} onClick={() => setShowRecap(true)}>
                Récapitulatif
              </ButtonMui>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default RemiseInfoClient;