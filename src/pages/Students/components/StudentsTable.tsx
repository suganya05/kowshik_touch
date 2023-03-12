import React, { useEffect, useState, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";

import StudentList from "./StudentList";
import { month } from "constants/utils";
import { IStudent, IFeesType } from "constants/types";

interface Column {
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  { label: "Name", minWidth: 170 },
  { label: "Class", minWidth: 100 },
  { label: "Monthly Fees" },
  { label: `Paid (${month[new Date().getMonth()]})` },
  {
    label: "Action",
    minWidth: 170,
    align: "right",
  },
];

interface IStudents extends IStudent {
  feesDetails: IFeesType[];
}

interface IStudentTableProps {
  data: IStudents[];
  refetch: () => void;
}

const StudentsTable: React.FC<IStudentTableProps> = ({ data, refetch }) => {
  const [rows, setRows] = useState(data);
  const [searchValue, setSearchValue] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setRows(data);
  }, [data]);

  useMemo(() => {
    const filteredRows = data.filter((row) => {
      return row.firstname.toLowerCase().includes(searchValue.toLowerCase());
    });
    setRows(filteredRows);
  }, [searchValue]);

  return (
    <>
      <Box
        mb={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection={isMobile ? "column" : "row"}
        gap={2}
      >
        <Typography variant="h6">
          Total Students : <b>{data.length}</b>
        </Typography>
        <TextField
          placeholder="search student..."
          type="search"
          style={{ maxWidth: "300px", width: "100%" }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Box>
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
            {!rows.length ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography textAlign={"center"}>No students record found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((student) => (
                <StudentList key={student._id} {...student} refetch={refetch} />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StudentsTable;
