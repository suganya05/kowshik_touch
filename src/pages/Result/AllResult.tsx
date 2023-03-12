import React, { useState, useEffect, useMemo } from "react";
import { useGetAllResultQuery } from "store/slices/resultSlice";
import Paper from "@mui/material/Paper";
import ResultTable from "./component/ResultTable";
import { IResult } from "constants/types";
import { classesList } from "constants/utils";

import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  CircularProgress,
  Link,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const standards = [
  { value: "", label: "All Class" },
  { value: "10", label: "X" },
  { value: "11", label: "XI" },
  { value: "12", label: "XII" },
];

const AllResult = () => {
  const { data, isFetching, isError, refetch } = useGetAllResultQuery();
  const [searchValue, setSearchValue] = useState("");
  const [standard, setStandard] = React.useState(standards[0].value);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2, mt: 2, mb: 2 }}>
      <Box
        mb={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection={isMobile ? "column" : "row"}
        gap={2}
      >
        <TextField
          placeholder="search student..."
          type="search"
          style={{ maxWidth: "300px", width: "100%" }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Box width={"50%"} flexDirection="row">
          <FormControl style={{ maxWidth: 300, width: "100%" }}>
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
              {standards.map((c) => (
                <MenuItem key={c.value} value={c.value}>
                  {c.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
          gap={2}
          flexDirection="row"
        >
          <Link href="/addresult" underline="none">
            <Button color="primary" variant="contained">
              Add Result
            </Button>
          </Link>
        </Box>
      </Box>
      {isFetching ? (
        <Box>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Box
          style={{ display: "grid", placeItems: "center", minHeight: "300px" }}
        >
          <Typography variant="h4">Something went wrong</Typography>
        </Box>
      ) : !data?.length ? (
        <Box
          style={{ display: "grid", placeItems: "center", minHeight: "300px" }}
        >
          <Typography textAlign="center" variant="h5">
            No students record found
          </Typography>
        </Box>
      ) : (
        <ResultTable
          data={data}
          refetch={refetch}
          searchValue={searchValue}
          standard={standard}
        />
      )}
    </Paper>
  );
};

export default AllResult;
