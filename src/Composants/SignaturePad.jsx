// ─── Importation des composants ──────────────────────────────────────────────
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";

// ─── Composant principal : SignaturePad ──────────────────────────────────────
function SignaturePad({ onSave, initialSignature }) {
  const sigRef = useRef(null);
  const containerRef = useRef(null);
  const isLoadingRef = useRef(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // ─── useEffect : ajuster la résolution du canvas ──
  useEffect(() => {
    const adjustCanvas = () => {
      if (!sigRef.current || !containerRef.current) return;
      
      const canvas = sigRef.current.getCanvas();
      const container = containerRef.current;
      
      // Obtenir les dimensions réelles
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = 150;
      
      // Sauvegarder les données existantes
      const data = sigRef.current.isEmpty() ? null : sigRef.current.toDataURL();
      
      // Sur mobile uniquement, utiliser le devicePixelRatio
      if (isMobile) {
        const ratio = window.devicePixelRatio || 1;
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        
        const ctx = canvas.getContext('2d');
        ctx.scale(ratio, ratio);
      } else {
        // Sur PC, pas de ratio
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
      
      // Restaurer les données
      if (data) {
        sigRef.current.fromDataURL(data);
      }
    };

    const timer = setTimeout(adjustCanvas, 0);
    window.addEventListener('resize', adjustCanvas);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', adjustCanvas);
    };
  }, [isMobile]);

  // ─── useEffect : recharger la signature existante UNE SEULE FOIS ─────
  useEffect(() => {
    if (initialSignature && sigRef.current) {
      isLoadingRef.current = true;
      
      const timer = setTimeout(() => {
        if (sigRef.current) {
          sigRef.current.fromDataURL(initialSignature);
          isLoadingRef.current = false;
        }
      }, 150);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // ─── Fonction : appelée quand l'utilisateur termine un trait ──
  const handleEnd = () => {
    if (isLoadingRef.current) return;
    
    if (sigRef.current && !sigRef.current.isEmpty()) {
      const image = sigRef.current.toDataURL("image/png");
      onSave(image);
    }
  };

  // ─── Fonction : effacer la signature ─────────────────────────────────────
  const handleClear = () => {
    if (sigRef.current) {
      sigRef.current.clear();
      onSave(null);
    }
  };

  // ─── Rendu du composant ──────────────────────────────────────────────────
  return (
    <Box ref={containerRef} sx={{ width: "100%" }}>
      {/* ── Zone de dessin ────────────────────────────────────────────────── */}
      <SignatureCanvas
        ref={sigRef}
        penColor="black"
        onEnd={handleEnd}
        canvasProps={{
          style: {
            width: "100%",
            height: "150px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#fff",
            touchAction: "none",
            cursor: "crosshair",
            display: "block",
          },
        }}
      />

      {/* ── Bouton "Effacer" ────────────────────────────────────────────── */}
      <Box sx={{ textAlign: "right", mt: 1 }}>
        <Button 
          size="small" 
          onClick={handleClear}
          sx={{ 
            color: "#ee773d",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "rgba(238, 119, 61, 0.08)",
            }
          }}
        >
          Effacer
        </Button>
      </Box>
    </Box>
  );
}

export default SignaturePad;