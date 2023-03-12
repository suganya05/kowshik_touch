import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Button, CircularProgress, Link, Typography } from "@mui/material";

import { useGetAllStudentsQuery } from "../../store/slices/studentSlice";

import { month } from "../../constants/utils";
import FacultyList from "./components/FacultyList";
import { useGetAllFacultysQuery } from "../../store/slices/facultySlice";

interface Column {
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  { label: "Name" },
  { label: "Designation" },
  { label: "Salary" },
  { label: "Experience" },
  { label: "Actions", align: "right" },
];

export default function AllStudents() {
  const { data, isFetching, isError, refetch } = useGetAllFacultysQuery();

  const renderTableCollection = (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index.toString()} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!data?.length ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography textAlign={"center"}>No Faculties record found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              data?.map((faculty) => (
                <FacultyList key={faculty._id} {...faculty} refetch={refetch} />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2, mt: 2, mb: 2 }}>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        gap={2}
        mb={4}
        flexDirection="row"
      >
        <Typography variant="h4">Faculty Details</Typography>
        <Link href="/faculty/add" underline="none">
          <Button color="primary" variant="contained">
            Add Faculty
          </Button>
        </Link>
      </Box>
      {isFetching ? (
        <Box>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Box>
          <Typography variant="h4">Something went wrong</Typography>
        </Box>
      ) : (
        renderTableCollection
      )}
    </Paper>
  );
}
