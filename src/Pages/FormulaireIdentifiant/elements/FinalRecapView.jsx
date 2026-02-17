import { Box, Typography, Grid, Paper, Stack } from "@mui/material"; // Retour à l'import standard
import InputMui from "../../../Composants/InputMui";
import DividerMui from "../../../Composants/DividerMui";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

function FinalRecapView({ form }) {
  return (
    <Box sx={{ maxWidth: "100%", overflow: "hidden" }}>
      <Typography variant="h5" sx={{ mb: 3, color: "#9e9e9e", fontWeight: "medium" }}>
        Récapitulatif
      </Typography>
      <DividerMui variant="light" sx={{ mb: 4 }} />

      {/* Section Identifiants */}
      <Typography variant="h6" sx={{ mb: 3, color: "#ee773d", fontWeight: "bold" }}>
        Identifiants
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <InputMui
            label="Adresse email"
            value={form.emailGenere || ""}
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{ readOnly: true }}
          />
          <InputMui
            label="Login TSE et VPN"
            value={form.trigrammeGenere ? `A_${form.trigrammeGenere}` : ""}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputMui
            label="Mot de passe"
            value={form.passwordGenere || ""}
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{ readOnly: true }}
          />
          <InputMui
            label="EBP"
            value={form.trigrammeGenere || ""}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
      </Grid>

      {/* Section Équipements */}
      {form.equipements && form.equipements.length > 0 && (
        <>
          <DividerMui variant="light" sx={{ mt: 4, mb: 3 }} />
          <Typography variant="h6" sx={{ mb: 3, color: "#ee773d", fontWeight: "bold" }}>
            Équipements ajoutés
          </Typography>
          
          {form.equipements.map((equip, index) => (
            <Paper 
              key={index} 
              elevation={0} 
              sx={{ 
                mb: 3, 
                p: 2, 
                border: "1px solid #e0e0e0", 
                borderRadius: 1, 
                borderLeft: "4px solid #ee773d",
                backgroundColor: "#fafafa" 
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 2, color: "#ee773d", fontWeight: "bold" }}>
                Équipement #{index + 1}
              </Typography>
              
              <Stack spacing={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Nom</Typography>
                    <Typography variant="body2" sx={{ fontWeight: "medium" }}>{equip.nom}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Modèle</Typography>
                    <Typography variant="body2">{equip.modele || "-"}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Numéro de série</Typography>
                    <Typography variant="body2" sx={{ fontFamily: "monospace" }}>{equip.sn}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Garantie</Typography>
                    <Typography variant="body2">{equip.garantie || "-"}</Typography>
                  </Grid>
                </Grid>

                {(equip.fichier || equip.fichiers) && (
                  <Box sx={{ mt: 1, pt: 1, borderTop: "1px dashed #e0e0e0" }}>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
                      Pièces jointes :
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {[].concat(equip.fichiers || equip.fichier || []).map((file, fIdx) => (
                        <Box 
                          key={fIdx} 
                          sx={{ 
                            display: "flex", 
                            alignItems: "center", 
                            gap: 1, 
                            backgroundColor: "#fff", 
                            p: "4px 10px", 
                            borderRadius: "4px", 
                            border: "1px solid #ee773d20" 
                          }}
                        >
                          <InsertDriveFileIcon sx={{ fontSize: 16, color: "#ee773d" }} />
                          <Typography variant="caption" sx={{ color: "#555", fontWeight: "bold" }}>
                            {file.name || `Document ${fIdx + 1}`}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </Stack>
            </Paper>
          ))}
        </>
      )}

      <DividerMui variant="strong" sx={{ mt: 4, mb: 3 }} />
    </Box>
  );
}

export default FinalRecapView;