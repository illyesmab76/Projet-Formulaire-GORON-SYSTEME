import { Box } from "@mui/material";
import InputMui from "../../../Composants/InputMui";
import DatePickerMui from "./DatePickerMui";

function IdentityRow({ form, onChange, disabled }) {
  return (
    <Box 
      sx={{ 
        display: "flex",
        // Colonne sur mobile, Ligne sur PC
        flexDirection: { xs: "column", md: "row" },
        gap: 2, 
        mt: 2,
        width: "100%",
        alignItems: "flex-start",
        boxSizing: "border-box"
      }}
    >
      {/* Input Nom */}
      <Box sx={{ 
        flex: { xs: "1 1 100%", md: "0 0 calc(33.33% - 11px)" }, 
        maxWidth: { xs: "100%", md: "calc(33.33% - 11px)" },
        width: "100%"
      }}>
        <InputMui
          label="Nom"
          name="nom"
          value={form.nom}
          onChange={onChange}
          disabled={disabled}
          fullWidth
        />
      </Box>

      {/* Input Prénom */}
      <Box sx={{ 
        flex: { xs: "1 1 100%", md: "0 0 calc(33.33% - 11px)" }, 
        maxWidth: { xs: "100%", md: "calc(33.33% - 11px)" },
        width: "100%"
      }}>
        <InputMui
          label="Prénom"
          name="prenom"
          value={form.prenom}
          onChange={onChange}
          disabled={disabled}
          fullWidth
        />
      </Box>

      {/* Input Date de création */}
      <Box sx={{ 
        flex: { xs: "1 1 100%", md: "0 0 calc(33.34% - 11px)" }, 
        maxWidth: { xs: "100%", md: "calc(33.34% - 11px)" },
        width: "100%"
      }}>
        <DatePickerMui
          label="Date"
          name="date"
          value={form.date}
          onChange={onChange}
          disabled={disabled}
        />
      </Box>
    </Box>
  );
}

export default IdentityRow;