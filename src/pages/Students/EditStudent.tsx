import React from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";

import Form from "../NewAdmission/Form";
import { IStudent, IStudentFormData } from "../../constants/types";
import { useGetStudentByIdQuery } from "../../store/slices/studentSlice";

const formatData = (values: IStudent): IStudentFormData => {
  return {
    ...values,
    mobile_no: values.mobile_no.toString(),
    alternative_no: values.alternative_no?.toString(),
    fees: values.fees.toString(),
    address: {
      ...values.address,
      pincode: values.address.pincode.toString(),
    },
    subjects: values.subjects.join(","),
  };
};

const RenderEditStudent = ({ id }: { id: string }) => {
  const { data, isLoading, isError } = useGetStudentByIdQuery(id);

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
        <Form edit={{ ...formatData(data), _id: data._id }} />
      </Paper>
    </Container>
  );
};

const EditStudent = () => {
  const { id } = useParams();

  if (!id) return <Navigate to={"/"} replace={true} />;

  return <RenderEditStudent id={id} />;
};

export default EditStudent;
