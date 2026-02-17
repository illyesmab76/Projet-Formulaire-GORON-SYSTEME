import DateInput from "../Composants/DateInput";

/**
 * Wrapper pour DateInput - utilisé pour les dates initialisées à "aujourd'hui"
 */
function DateTodayInput({ name, value, onChange, label, required = false, disabled = false }) {
  return (
    <DateInput
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      // On force le style ici au cas où les composants enfants bloqueraient l'héritage
      sx={{
        // 1. Force la couleur du label quand on clique (focus)
        "& label.Mui-focused": {
          color: "#ee773d !important",
        },
        // 2. Cible la racine de l'input
        "& .MuiOutlinedInput-root": {
          // Au survol
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ee773d !important",
          },
          // Quand on écrit (Focus)
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ee773d !important",
          },
        },
      }}
    />
  );
}

export default DateTodayInput;