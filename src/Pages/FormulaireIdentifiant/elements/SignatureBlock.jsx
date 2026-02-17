import React, { useState } from "react";
import { Box, useTheme, useMediaQuery, TextField, InputAdornment, IconButton } from "@mui/material";
import DatePicker, { registerLocale } from "react-datepicker";
import { fr } from "date-fns/locale/fr";
import "react-datepicker/dist/react-datepicker.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import SelectMui from "../../FormulaireIdentifiant/elements/SelectMui.jsx";
import Typo from "../../../Composants/Typo.jsx";
import SignaturePad from "../../../Composants/SignaturePad.jsx";

// Enregistrer la locale française
registerLocale("fr", fr);

function SignatureBlock({
  form,
  handleChange,
  onSaveSignature,
  onSaveNomSignature,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isOpen, setIsOpen] = useState(false);

  // Options pour le choix de la ville
  const optionsVilles = [
    { value: "ST ETIENNE DU ROUVRAY", label: "ST ETIENNE DU ROUVRAY" },
    { value: "DUNKERQUE", label: "DUNKERQUE" }
  ];

  // Convertir DD/MM/YYYY vers Date object
  const parseDate = (dateStr) => {
    if (!dateStr || dateStr.length !== 10) return null;
    const [day, month, year] = dateStr.split("/");
    return new Date(year, month - 1, day);
  };

  // Convertir Date object vers DD/MM/YYYY
  const formatDate = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (date) => {
    handleChange({
      target: {
        name: "DateSignature",
        value: formatDate(date),
      },
    });
    setIsOpen(false);
  };

  return (
    <>
      <style>
        {`
          .react-datepicker-wrapper {
            width: 100%;
          }
          
          .react-datepicker-popper {
            z-index: 9999;
          }
          
          .react-datepicker {
            font-family: 'Roboto', sans-serif;
            border: none;
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
            border-radius: 12px;
          }
          
          .react-datepicker__header {
            background-color: #ee773d;
            border-bottom: none;
            border-radius: 12px 12px 0 0;
            padding-top: 16px;
          }
          
          .react-datepicker__current-month,
          .react-datepicker__day-name {
            color: white;
            font-weight: 600;
          }
          
          .react-datepicker__day {
            color: #333;
            border-radius: 50%;
            margin: 4px;
          }
          
          .react-datepicker__day:hover {
            background-color: #ffe0cc;
            border-radius: 50%;
          }
          
          .react-datepicker__day--selected,
          .react-datepicker__day--keyboard-selected {
            background-color: #ee773d;
            color: white;
            font-weight: bold;
            border-radius: 50%;
          }
          
          .react-datepicker__day--today {
            font-weight: bold;
            border: 2px solid #ee773d;
            border-radius: 50%;
          }
          
          .react-datepicker__navigation-icon::before {
            border-color: white;
          }
          
          .react-datepicker__navigation:hover *::before {
            border-color: white;
          }
        `}
      </style>
      
      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          mt: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* SECTION DATE & LIEU */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
          }}
        >
          {/* Calendrier avec react-datepicker */}
          <Box sx={{ flex: 1, order: 1 }}>
            <DatePicker
              selected={parseDate(form.DateSignature)}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              locale="fr"
              open={isOpen}
              onClickOutside={() => setIsOpen(false)}
              customInput={
                <TextField
                  label="Date de signature"
                  value={form.DateSignature || ""}
                  fullWidth
                  variant="outlined"
                  onClick={() => setIsOpen(true)}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setIsOpen(true)} edge="end">
                          <CalendarTodayIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& label.Mui-focused": {
                      color: "#ee773d !important",
                    },
                    "& .MuiOutlinedInput-root": {
                      height: "56px",
                      backgroundColor: "#fff",
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ee773d !important",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ee773d !important",
                        borderWidth: "2px",
                      },
                    },
                  }}
                />
              }
            />
          </Box>

          {/* Sélecteur de Ville */}
          <Box sx={{ flex: 1, order: 2 }}>
            <SelectMui
              label="À"
              name="VilleSignature"
              value={form.VilleSignature || "ST ETIENNE DU ROUVRAY"}
              options={optionsVilles}
              onChange={handleChange}
              fullWidth
            />
          </Box>
        </Box>

        {/* SECTION SIGNATURES */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 3,
          }}
        >
          {/* Zone de signature de l'agent */}
          <Box 
            sx={{ 
              flex: 1, 
              display: "flex", 
              flexDirection: "column", 
              gap: 1, 
              order: isMobile ? 3 : 1,
            }}
          >
            <Typo sx={{ textAlign: "left", fontWeight: 500 }}>Signature</Typo>
            <SignaturePad 
              onSave={onSaveSignature} 
              initialSignature={form.signature} 
            />
          </Box>

          {/* Zone de signature de l'animateur (responsable) */}
          <Box 
            sx={{ 
              flex: 1, 
              display: "flex", 
              flexDirection: "column", 
              gap: 1, 
              order: isMobile ? 4 : 2,
            }}
          >
            <Typo sx={{ textAlign: "left", fontWeight: 500 }}>
              Nom et signature de l'animateur
            </Typo>
            <SignaturePad 
              onSave={onSaveNomSignature} 
              initialSignature={form.nomSignature} 
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default SignatureBlock;