import * as React from "react";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { useGetAllStudentsQuery } from "../../store/slices/studentSlice";

import { classes, classesList } from "constants/utils";
import { useAppSelector } from "store";
import { updateDirtyStatus } from "store/slices/generalSlice";
import StudentsTable from "./components/StudentsTable";

export default function AllStudents() {
  const [standard, setStandard] = React.useState(classesList[0].value);
  const isDirty = useAppSelector((state) => state.general.isDirty);
  const { data, isFetching, isError, refetch } = useGetAllStudentsQuery({ standard });

  React.useEffect(() => {
    if (isDirty) {
      refetch();
      updateDirtyStatus(false);
    }
  }, [isDirty]);

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
        <Typography variant="h4">Students Details</Typography>
        <Link href="/new-admission" underline="none">
          <Button color="primary" variant="contained">
            Add student
          </Button>
        </Link>
      </Box>
      <Box
        display={"flex"}
        justifyContent="flex-end"
        alignItems={"center"}
        gap={2}
        mb={4}
        flexDirection="row"
      >
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
            {classesList.map((c) => (
              <MenuItem key={c.value} value={c.value}>
                {c.label}
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
        <Box style={{ display: "grid", placeItems: "center", minHeight: "300px" }}>
          <Typography variant="h4">Something went wrong</Typography>
        </Box>
      ) : !data?.length ? (
        <Box style={{ display: "grid", placeItems: "center", minHeight: "300px" }}>
          <Typography textAlign="center" variant="h5">
            No students record found
          </Typography>
        </Box>
      ) : (
        <StudentsTable data={data} refetch={refetch} />
      )}
    </Paper>
  );
}
