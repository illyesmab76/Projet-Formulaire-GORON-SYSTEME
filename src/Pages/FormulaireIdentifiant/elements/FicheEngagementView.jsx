import React from "react";
import { Box } from "@mui/material";
import InputMui from "../../../Composants/InputMui.jsx";
import Soussigne from "./Soussigne.jsx";
import Engagement from "./Engagement.jsx";
import SignatureBlock from "./SignatureBlock.jsx";

// Vue complète de la fiche d'engagement (section 3 du formulaire)
function FicheEngagementView({ 
  form, 
  handleFormChange, 
  handleSaveSignature, 
  handleSaveNomSignature 
}) {
  return (
    <Box sx={{ maxWidth: "100%", overflow: "hidden" }}>
      {/* Section "Je soussigné" avec le nom de l'utilisateur */}
      <Soussigne label="Je soussigné…" fontWeight="normal">
        <InputMui 
          label="Monsieur..." 
          name="Monsieur" 
          value={form.nom} 
          onChange={handleFormChange} 
          fullWidth 
        />
      </Soussigne>
      
      {/* Carte avec la liste des engagements */}
      <Engagement 
        title="m'engage à :" 
        text={`- Ne jamais diffuser mes identifiants. Ceux-ci sont personnels.
- Respecter la propriété des informations GORON SYSTEME conformément au règlement intérieur et à la charte SI.
- A faire bon usage du matériel informatique
- De ne pas laisser celui-ci dans mon véhicule
- De veiller à ne pas conserver les données de l'entreprise sur des supports non sécurisés
- A respecter la charte des système d'information en annexe
- A respecter le règlement intérieur en annexe

Je reconais avoir reçu les consignes d'utilisation de tous ces équipements avec une présentation des différentes procédures internes.`} 
      />
      
      {/* Section signature (canvas + nom) */}
      <SignatureBlock 
        form={form} 
        handleChange={handleFormChange} 
        onSaveSignature={handleSaveSignature} 
        onSaveNomSignature={handleSaveNomSignature} 
      />
    </Box>
  );
}

export default FicheEngagementView;