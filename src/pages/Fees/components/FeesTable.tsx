import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import FeesRecord from "./FeesRecord";
import { IFeesType } from "constants/types";

const columns = [
  { label: "Name" },
  { label: "Class" },
  { label: "Paid on" },
  {
    label: "Fees",
  },
  {
    label: "Action",
  },
];

interface IFeesTableProps {
  data: IFeesType[];
  refetch: () => void;
}

const FeesTable: React.FC<IFeesTableProps> = ({ data, refetch }) => {
  return (
    <TableContainer>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index.toString()}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!data?.length ? (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography textAlign={"center"}>No students record found</Typography>
              </TableCell>
            </TableRow>
          ) : (
            data
              ?.filter((f) => f.student_id)
              ?.map((details, i) => <FeesRecord key={details._id} {...details} refetch={refetch} />)
          )}
          {data && (
            <TableRow>
              <TableCell colSpan={2} />
              <TableCell>Total Payment</TableCell>
              <TableCell>
                {data
                  .reduce((a, b) => a + b.fees, 0)
                  .toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                    style: "currency",
                    currency: "INR",
                  })}
              </TableCell>
              <TableCell />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FeesTable;
