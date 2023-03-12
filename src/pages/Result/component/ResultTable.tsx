import React, { useEffect, useState, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IResult } from "constants/types";
import { classesList } from "constants/utils";

import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Column {
  label: string;
  minWidth?: number;
  align?: "right";
}

const standards = [
  { value: "10", label: "X" },
  { value: "11", label: "XI" },
  { value: "12", label: "XII" },
];

const columns: readonly Column[] = [
  { label: "RegisterNumber", minWidth: 5 },
  { label: "Name", minWidth: 50 },
  { label: "Class", minWidth: 10 },

  {
    label: "Details",
    minWidth: 170,
    align: "right",
  },
];

interface IResultTableProps {
  data: IResult[];
  refetch: () => void;
  searchValue: string;
  standard: string;
}

const ResultTable: React.FC<IResultTableProps> = ({
  data,
  refetch,
  searchValue,
  standard,
}) => {
  const [rows, setRows] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    setRows(data);
  }, [data]);

  useMemo(() => {
    const filteredRows = data.filter((row) => {
      return row.studentName.toLowerCase().includes(searchValue.toLowerCase());
    });
    setRows(filteredRows);

    const filteredClass = data.filter((s) => s.standard.match(standard));
    setRows(filteredClass);
  }, [searchValue, standard]);

  console.log(rows);
  return (
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
            {!rows.length ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography textAlign={"center"}>
                    No students record found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((student) => (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell>{student.registerNumber}</TableCell>
                  <TableCell>{student.studentName}</TableCell>
                  <TableCell style={{ textTransform: "uppercase" }}>
                    {standards.find((f) => f.value === student.standard)?.label}
                  </TableCell>
                  <TableCell style={{ display: "flex", justifyContent: "end" }}>
                    <Button
                      color="info"
                      variant="contained"
                      onClick={() =>
                        navigate(`/result/edit/${student.registerNumber}`)
                      }
                    >
                      See Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ResultTable;
