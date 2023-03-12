import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import { FormHelperText, FormLabel } from "@mui/material";

interface ICheckboxProps {
  handleChange?: (value: string) => void;
  error?: string;
  subjects: { [key: string]: boolean };
}

export default function CheckboxLabels({ handleChange, error, subjects }: ICheckboxProps) {
  const [state, setState] = React.useState(subjects);

  const handleEventChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });

    const newState = { ...state, [event.target.name]: event.target.checked };

    const dataInArray = Object.entries(newState);
    const filteredArray = dataInArray.filter((f) => f[1] === true);
    const data = filteredArray.map((m) => {
      return m[0];
    });
    if (handleChange) handleChange(data.join());
  };

  return (
    <FormControl error={error ? true : false}>
      <FormLabel>Subjects</FormLabel>
      <FormGroup row>
        {Object.keys(subjects).map((subject, index) => (
          <FormControlLabel
            name="subjects"
            key={index.toString()}
            control={
              <Checkbox checked={state[subject]} onChange={handleEventChange} name={subject} />
            }
            style={{ textTransform: "capitalize" }}
            label={subject.split("_").join(" ")}
          />
        ))}
      </FormGroup>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
}
