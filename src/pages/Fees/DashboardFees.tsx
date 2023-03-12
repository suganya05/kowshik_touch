import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import * as XLSX from "xlsx";

import { classesList, month } from "../../constants/utils";
import {
  useGetAllFeesQuery,
  useGetUnpaidFeesQuery,
} from "../../store/slices/feesSlice";
import FeesTable from "./components/FeesTable";

const getYearsList = () => {
  let yearsList: number[] = [];
  for (let i = 2022; i <= new Date().getFullYear(); i++) {
    yearsList.push(i);
  }

  return yearsList;
};

const DashboardFees = () => {
  const m = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(month[m]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { isFetching, isError, data, refetch } = useGetAllFeesQuery({
    month: selectedMonth,
    year: selectedYear,
  });
  const {
    isFetching: unpaidFeesFetching,
    isError: unpaidFeesError,
    data: unpaidFeesData,
  } = useGetUnpaidFeesQuery({
    month: selectedMonth,
    year: selectedYear,
  });

  console.log(data);

  const [rows, setRows] = useState(data ?? []);
  const [searchValue, setSearchValue] = useState("");
  const [standard, setStandard] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useMemo(() => {
    if (!data) return;
    const filteredRows = data.filter((row) => {
      return row?.student_id?.firstname
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });
    setRows(filteredRows);
  }, [searchValue, data]);

  useMemo(() => {
    if (!data) return;
    if (!standard) return setRows(data);
    const filteredRows = data.filter((row) => {
      return row?.student_id?.standard === standard;
    });
    setRows(filteredRows);
  }, [standard, data]);

  const handleOnExport = () => {
    if (!unpaidFeesData) return;

    const newData = [...unpaidFeesData];

    const data = newData
      .sort((a, b) => a.standard.localeCompare(b.standard))
      .map((f) => {
        return {
          name: f.firstname,
          class: f.standard,
        };
      });

    const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, `${selectedMonth}_UnpaidStudentsData.xlsx`);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2, mt: 2, mb: 2 }}>
      <Box mb={4} display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h4">Fees Details</Typography>
        </Box>

        <Button
          color="error"
          variant="contained"
          disabled={unpaidFeesFetching}
          onClick={handleOnExport}
        >
          Export Unpaid Student List as Excel
        </Button>
      </Box>

      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        flexDirection={isMobile ? "column" : "row"}
        gap={2}
      >
        <TextField
          placeholder="search student..."
          type="search"
          style={{ maxWidth: isMobile ? "100%" : "300px", width: "100%" }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <FormControl
          style={{ maxWidth: isMobile ? "100%" : "300px", width: "100%" }}
        >
          <InputLabel id="standard">Class</InputLabel>
          <Select
            labelId="standard"
            id="standard"
            name="standard"
            aria-describedby="select-class"
            value={standard}
            onChange={(e) => setStandard(e.target.value)}
            label="Class"
          >
            <MenuItem value="">Show All</MenuItem>
            {classesList.map((c) => (
              <MenuItem key={c.value} value={c.value}>
                {c.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          style={{ maxWidth: isMobile ? "100%" : "300px", width: "100%" }}
        >
          <InputLabel id="demo-simple-select-label">Month</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedMonth}
            label="Month"
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {month.map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          style={{ maxWidth: isMobile ? "100%" : "300px", width: "100%" }}
        >
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedYear}
            label="Month"
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {getYearsList().map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {isFetching ? (
        <Box>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Box>
          <Typography variant="h5" textAlign="center">
            Something went wrong
          </Typography>
        </Box>
      ) : !data ? (
        <Box>
          <Typography variant="h5" textAlign="center">
            No Records Found
          </Typography>
        </Box>
      ) : (
        <FeesTable data={rows} refetch={refetch} />
      )}
    </Paper>
  );
};

export default DashboardFees;
