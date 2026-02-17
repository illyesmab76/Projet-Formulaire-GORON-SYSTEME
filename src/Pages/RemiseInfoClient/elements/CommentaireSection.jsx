import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import Typo from "../../../Composants/Typo.jsx";
import { TextField } from "@mui/material";

function CommentaireSection({ value, onChange }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mb: 4 }}>
      <Typo variant="h5" fontWeight="bold" color="#ee773d" mb={3}>
        Commentaires
      </Typo>

      <TextField
        label="Ajouter un commentaire (optionnel)"
        name="commentaire"
        value={value || ""}
        onChange={onChange}
        multiline
        rows={6}
        fullWidth
        variant="outlined"
        placeholder="Ajoutez ici toute information complémentaire..."
        sx={{
          "& label.Mui-focused": {
            color: "#ee773d !important",
          },
          "& .MuiOutlinedInput-root": {
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
    </Box>
  );
}

export default CommentaireSection;