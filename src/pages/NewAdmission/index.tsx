import React from "react";
import { Container, Paper } from "@mui/material";
import Form from "./Form";

const NewAdmission: React.FC<{}> = () => {
  return (
    <Container style={{ paddingTop: "24px" }}>
      <Paper sx={{ p: 2 }}>
        <Form />
      </Paper>
    </Container>
  );
};

export default NewAdmission;
