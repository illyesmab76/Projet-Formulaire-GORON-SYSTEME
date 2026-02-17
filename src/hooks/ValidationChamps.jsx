const isFilled = (v) => v && v.toString().trim() !== "";
const isValidDateFR = (d) => /^\d{2}\/\d{2}\/\d{4}$/.test(d);

export default function ValidationChamps(form) {
  const isValid = 
    isFilled(form.nom) && 
    isFilled(form.prenom) && 
    isValidDateFR(form.date) && 
    isFilled(form.modele);

  const isValidPC = 
    isFilled(form.nomMachine) && 
    isFilled(form.marque) && 
    isFilled(form.numeroSerie) && 
    isFilled(form.garantie);

  // Validation pour l'étape Téléphone (ajuste les champs selon tes besoins)
  const isValidTel = 
    isFilled(form.marqueTel) && 
    isFilled(form.modeleTel) && 
    isFilled(form.imei);

  return { isValid, isValidPC, isValidTel };
}