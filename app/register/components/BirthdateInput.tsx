"use client";
import React from "react";
import {
  TextField,
  Grid,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

interface BirthdateInputProps {
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  onDayChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
}

const BirthdateInput: React.FC<BirthdateInputProps> = ({
  birthDay,
  birthMonth,
  birthYear,
  onDayChange,
  onMonthChange,
  onYearChange,
}) => {
  return (
    <div className="form-group">
      <FormControl fullWidth variant="outlined">
        <div className="birthdate-inputs">
          <TextField
            label="Gün"
            type="text"
            placeholder="Doğum Günü"
            onChange={(e) => onDayChange(e.target.value)}
           
          />
          <TextField
            label="Ay"
            type="text"
            placeholder="Ay"
            onChange={(e) => onMonthChange(e.target.value)}
          />
          <TextField
            label="Yıl"
            type="text"
            placeholder="Yıl"
            onChange={(e) => onYearChange(e.target.value)}
          />
        </div>
      </FormControl>
    </div>
  );
};

export default BirthdateInput;