import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FormHelperText } from "@mui/material";

interface IRadioButtonProps {
  title: String;
  radioGroup: string[];
  handleChange?: (value: string) => void;
  error?: string;
  defaultChecked?: string;
}

export default function RadioButtonGroup({
  title,
  radioGroup,
  handleChange,
  error,
  defaultChecked,
}: IRadioButtonProps) {
  return (
    <FormControl error={error ? true : false}>
      <FormLabel id="demo-row-radio-buttons-group-label" style={{ textTransform: "capitalize" }}>
        {title}
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name={"row-radio-buttons-group"}
        onChange={(e) => handleChange && handleChange(e.target.value)}
        defaultValue={defaultChecked}
      >
        {radioGroup.map((r, index) => (
          <FormControlLabel key={index.toString()} value={r} control={<Radio />} label={r} />
        ))}
      </RadioGroup>
      <FormHelperText color="error" id="select-class">
        {error}
      </FormHelperText>
    </FormControl>
  );
}
