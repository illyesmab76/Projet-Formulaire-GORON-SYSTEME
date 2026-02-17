import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { fr } from "date-fns/locale/fr";
import "react-datepicker/dist/react-datepicker.css";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

// Enregistrer la locale française
registerLocale("fr", fr);

function DatePickerMui({ label, value, onChange, disabled, name }) {
  const [isOpen, setIsOpen] = useState(false);

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

  const handleChange = (date) => {
    onChange({
      target: {
        name: name,
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
      
      <DatePicker
        selected={parseDate(value)}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        locale="fr"
        disabled={disabled}
        open={isOpen}
        onClickOutside={() => setIsOpen(false)}
        customInput={
          <TextField
            label={label}
            value={value}
            fullWidth
            variant="outlined"
            disabled={disabled}
            onClick={() => !disabled && setIsOpen(true)}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => !disabled && setIsOpen(true)} edge="end">
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
    </>
  );
}

export default DatePickerMui;