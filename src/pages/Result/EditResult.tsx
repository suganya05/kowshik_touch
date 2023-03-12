import React from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";

import { IResult } from "../../constants/types";
import { useGetResultByIdQuery } from "store/slices/resultSlice";
import AddResult from "./AddResult";

const formatData = (values: IResult) => {
  return {
    ...values,
  };
};

const RenderEditResult = ({ id }: { id: string }) => {
  const { data, isLoading, isError } = useGetResultByIdQuery(id);

  if (isLoading)
    return (
      <Box>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Box>
        <Typography>something went wrong</Typography>
      </Box>
    );

  if (!data)
    return (
      <Box>
        <Typography>No data found</Typography>
      </Box>
    );

  return (
    <Container style={{ paddingTop: "24px" }}>
      <Paper sx={{ p: 2 }}>
        <AddResult editData={{ ...formatData(data), _id: data._id }} />
      </Paper>
    </Container>
  );
};

const EditResult = () => {
  const { registerNumber } = useParams();

  if (!registerNumber) return <Navigate to={"/"} replace={true} />;

  return (
    <>
      <RenderEditResult id={registerNumber} />
    </>
  );
};

export default EditResult;
