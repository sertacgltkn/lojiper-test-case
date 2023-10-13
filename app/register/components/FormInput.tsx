"use client";
import React from "react";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  options?: { value: string; label: string }[];
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="form-group">
      <FormControl fullWidth variant="outlined">
        <InputLabel>{label}</InputLabel>
        {type === "select" ? (
          <Select
            value={value}
            onChange={(e) => onChange(e.target.value as string)}
            label={label}
          >
            {options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <TextField
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            label={label}
          />
        )}
      </FormControl>
    </div>
  );
};

export default FormInput;
