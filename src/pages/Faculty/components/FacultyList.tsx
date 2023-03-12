import { IconButton, TableCell, TableRow } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IFaculty } from "../../../constants/types";
import { useNavigate } from "react-router-dom";

import { useDeleteFacultyMutation } from "../../../store/slices/facultySlice";
interface IFacultyListProps extends IFaculty {
  refetch: () => void;
}

const FacultyList: React.FC<IFacultyListProps> = ({
  username,
  salary,
  designation,
  experience_in_years,
  _id,
  refetch,
}) => {
  const navigate = useNavigate();
  const [deleteMutation] = useDeleteFacultyMutation({});

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation({ id }).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableRow>
      <TableCell>{username}</TableCell>
      <TableCell>{designation}</TableCell>
      <TableCell>{salary}</TableCell>
      <TableCell>{experience_in_years} yrs</TableCell>
      <TableCell>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <IconButton color="error" onClick={() => handleDelete(_id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton color="success" onClick={() => navigate(`/faculty/edit/${_id}`)}>
            <EditIcon />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default FacultyList;
