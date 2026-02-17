import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function SelectMui({ 
  label, 
  name, 
  value, 
  onChange, 
  options = [], 
  error = false, 
  required = false,
  fullWidth = true, 
  disabled = false,
  sx = {},
  ...props 
}) {
  return (
    <FormControl 
      fullWidth={fullWidth} 
      error={error} 
      required={required} 
      disabled={disabled}
      sx={{ 
        ...sx,
        minWidth: "100%",
        // Couleur du label au focus
        "& label.Mui-focused": {
          color: "#ee773d",
        },
      }}
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      
      <Select
        {...props}
        labelId={`${name}-label`}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        sx={{
          height: "56px",
          // Style de la bordure (fieldset)
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ee773d",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ee773d",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectMui;