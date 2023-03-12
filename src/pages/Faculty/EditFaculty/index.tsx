import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useGetFacultyByIdQuery } from "../../../store/slices/facultySlice";
import AddFaculty from "../AddFaculty";

const RenderEditFaculty = ({ id }) => {
  const { data, isLoading, isError } = useGetFacultyByIdQuery(id);

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
  return <AddFaculty edit={data} />;
};

const EditFaculty = () => {
  const { id } = useParams();

  if (!id) return <Navigate to={"/"} replace={true} />;

  return <RenderEditFaculty id={id} />;
};

export default EditFaculty;
