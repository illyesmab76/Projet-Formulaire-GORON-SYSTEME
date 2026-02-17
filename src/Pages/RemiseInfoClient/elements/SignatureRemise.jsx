import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import Typo from "../../../Composants/Typo.jsx";
import SignaturePad from "../../../Composants/SignaturePad.jsx";

function SignatureRemise({ signature, onSaveSignature }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mb: 4 }}>
      <Typo variant="h5" fontWeight="bold" color="#ee773d" mb={3} textAlign="center">
        Signature Animateur
      </Typo>

      <Box sx={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: 2,
        alignItems: "center"
      }}>
        <SignaturePad 
          onSave={onSaveSignature} 
          initialSignature={signature} 
        />
      </Box>
    </Box>
  );
}

export default SignatureRemise;