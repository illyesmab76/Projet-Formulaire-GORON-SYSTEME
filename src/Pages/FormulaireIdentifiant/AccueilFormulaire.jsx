import React, { useState } from "react";
import { Box, useTheme, useMediaQuery, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typo from "../../Composants/Typo.jsx";
import DividerMui from "../../Composants/DividerMui.jsx";
import ButtonMui from "../../Composants/ButtonMui.jsx";
import InputMui from "../../Composants/InputMui.jsx";

function AccueilFormulaire({ onCreateNew, onLoadExisting, onBack }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [mode, setMode] = useState(null);
  const [searchTrigramme, setSearchTrigramme] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Styles de boutons uniformisés
  const buttonCommonStyle = {
    height: "56px",
    width: isMobile ? "100%" : "250px", 
    fontSize: "0.95rem",
    fontWeight: "bold",
    textTransform: "uppercase"
  };

  const orangeButtonStyle = {
    ...buttonCommonStyle,
    backgroundColor: "#ee773d",
    color: "white",
    "&:hover": {
      backgroundColor: "#d96830",
    }
  };

  const greenButtonStyle = {
    ...buttonCommonStyle,
    backgroundColor: "#4caf50",
    color: "white",
    "&:hover": {
      backgroundColor: "#45a049",
    }
  };

  const greyButtonStyle = {
    height: "56px",
    width: isMobile ? "100%" : "250px",
    fontSize: "0.95rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    backgroundColor: "#6c757d",
    color: "white",
    "&:hover": {
      backgroundColor: "#5a6268"
    }
  };

  const handleSearch = () => {
    if (!searchTrigramme.trim()) {
      alert("Veuillez renseigner le trigramme");
      return;
    }

    const allKeys = Object.keys(localStorage);
    const ficheKeys = allKeys.filter(key => key.startsWith('formulaire_'));
    
    const results = [];
    ficheKeys.forEach(key => {
      try {
        const data = JSON.parse(localStorage.getItem(key));
        const trigrammeMatch = data.trigrammeGenere?.toLowerCase() === searchTrigramme.toLowerCase();
        
        if (trigrammeMatch) {
          results.push({
            id: key,
            nom: data.nom,
            prenom: data.prenom,
            trigramme: data.trigrammeGenere,
            date: data.DateSignature || new Date().toLocaleDateString('fr-FR'),
            data: data
          });
        }
      } catch (e) {
        console.error('Erreur lors de la lecture de la fiche:', e);
      }
    });

    if (results.length === 0) {
      alert("Aucune fiche trouvée pour ce trigramme");
    }
    
    setSearchResults(results);
  };

  const handleSelectFiche = (fiche) => {
    onLoadExisting(fiche.data);
  };

  // ═════════════════════════════════════════════════════════════════════
  // PAGE RECHERCHE
  // ═════════════════════════════════════════════════════════════════════
  if (mode === 'search') {
    return (
      <Box sx={{ 
        minHeight: "100vh", 
        p: isMobile ? 2 : 4,
        display: "flex",
        flexDirection: "column"
      }}>
        <Box sx={{ maxWidth: 1200, mx: "auto", width: "100%" }}>
          
          <Typo variant="h3" color="#ee773d" fontWeight="bold" mb={3} textAlign="center">
            Rechercher une fiche
          </Typo>
          
          <DividerMui variant="strong" sx={{ mb: 6 }} />

          <Box sx={{ 
            maxWidth: 600, 
            mx: "auto", 
            display: "flex", 
            flexDirection: "column", 
            gap: 3, 
            mb: 4 
          }}>
            <InputMui
              label="Trigramme"
              value={searchTrigramme}
              onChange={(e) => setSearchTrigramme(e.target.value.toUpperCase())}
              placeholder="Ex: ABC"
              fullWidth
              inputProps={{
                maxLength: 3,
                style: { textTransform: "uppercase" }
              }}
            />
          </Box>

          <Box sx={{ 
            display: "flex",
            justifyContent: "center",
            mb: 4
          }}>
            <ButtonMui
              sx={{
                height: "56px",
                width: isMobile ? "100%" : "400px",
                maxWidth: "600px",
                fontSize: "0.95rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                backgroundColor: "#ee773d",
                color: "white",
                "&:hover": {
                  backgroundColor: "#d96830",
                }
              }}
              startIcon={<SearchIcon />}
              onClick={handleSearch}
            >
              Rechercher
            </ButtonMui>
          </Box>

          {searchResults.length > 0 && (
            <Box sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
              <Typo variant="h6" fontWeight="bold" mb={2}>
                Fiches trouvées : {searchResults.length}
              </Typo>
              <List sx={{ 
                border: "1px solid #ddd", 
                borderRadius: "8px",
                backgroundColor: "#fafafa" 
              }}>
                {searchResults.map((fiche) => (
                  <ListItem key={fiche.id} disablePadding>
                    <ListItemButton 
                      onClick={() => handleSelectFiche(fiche)}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#ffe0cc"
                        }
                      }}
                    >
                      <ListItemText
                        primary={`${fiche.prenom} ${fiche.nom} (${fiche.trigramme})`}
                        secondary={`Date : ${fiche.date}`}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          <Box sx={{ mt: 6 }}>
            <DividerMui variant="strong" />
          </Box>

          <Box sx={{ 
            mt: 3,
            display: "flex", 
            justifyContent: isMobile ? "center" : "flex-start" 
          }}>
            <ButtonMui
              sx={greyButtonStyle}
              startIcon={<ArrowBackIcon />}
              onClick={() => {
                setMode(null);
                setSearchResults([]);
                setSearchTrigramme("");
              }}
              fullWidth={isMobile}
            >
              Retour
            </ButtonMui>
          </Box>
        </Box>
      </Box>
    );
  }

  // ═════════════════════════════════════════════════════════════════════
  // PAGE ACCUEIL (DEUX BOUTONS)
  // ═════════════════════════════════════════════════════════════════════
  return (
    <Box sx={{ 
      minHeight: "100vh", 
      p: isMobile ? 2 : 4,
      display: "flex",
      flexDirection: "column"
    }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", width: "100%" }}>
        
        <Typo variant="h3" color="#ee773d" fontWeight="bold" mb={3} textAlign="center">
          Identifiants et remise informatique
        </Typo>
        
        <DividerMui variant="strong" sx={{ mb: 6 }} />

        <Box sx={{ 
          display: "flex", 
          flexDirection: isMobile ? "column" : "row",
          gap: 3,
          justifyContent: isMobile ? "center" : "flex-start"
        }}>
          <ButtonMui
            sx={greenButtonStyle}
            startIcon={<SearchIcon />}
            onClick={() => setMode('search')}
            fullWidth={isMobile}
          >
            Rechercher une fiche
          </ButtonMui>

          <ButtonMui
            sx={orangeButtonStyle}
            startIcon={<AddIcon />}
            onClick={onCreateNew}
            fullWidth={isMobile}
          >
            Créer une fiche
          </ButtonMui>
        </Box>

        <Box sx={{ mt: 6 }}>
          <DividerMui variant="strong" />
        </Box>

        <Box sx={{ 
          mt: 3,
          display: "flex", 
          justifyContent: isMobile ? "center" : "flex-start" 
        }}>
          <ButtonMui
            sx={greyButtonStyle}
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
            fullWidth={isMobile}
          >
            Retour
          </ButtonMui>
        </Box>
      </Box>
    </Box>
  );
}

export default AccueilFormulaire;