import { Box, Tooltip } from "@mui/material";
import ButtonMui from "../../../Composants/ButtonMui";

function SubmitButtonWithTooltip({ disabled, tooltip, children, sx }) {
  return (
    /* Affiche une bulle d'aide (tooltip) seulement si le bouton est désactivé */
    <Tooltip title={disabled ? tooltip : ""} arrow placement="top">
      {/* Box conteneur pour permettre au Tooltip de fonctionner même si le bouton est disabled */}
      <Box sx={{ display: "inline-block", ...sx }}>
        <ButtonMui 
          type="submit" 
          disabled={disabled}
          sx={{ 
            width: "100%",
            height: "100%",
            backgroundColor: sx?.backgroundColor,
            color: sx?.color,
            "&:hover": sx?.["&:hover"]
          }}
        >
          {/* Texte ou icône à l'intérieur du bouton */}
          {children}
        </ButtonMui>
      </Box>
    </Tooltip>
  );
}

export default SubmitButtonWithTooltip;