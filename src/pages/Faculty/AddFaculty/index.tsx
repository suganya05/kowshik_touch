import React from "react";
import { Alert, Button, Container, Grid, Paper, Stack, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Box } from "@mui/system";

import { createFaculty } from "../../../api";
import { useAppDispatch } from "../../../store";
import { RadioButtonGroup } from "../../../components";
import { IFacultyFormData } from "../../../constants/types";
import { facultySchema } from "../../../helpers/validationSchema";
import { openSnackbar } from "../../../store/slices/snackbarSlice";
interface IFormProps {
  edit?: IFacultyFormData;
}

const initialState = {
  username: "",
  mobile_no: "",
  date_of_join: new Date().toISOString(),
  address: {
    plot_no: "",
    street: "",
    area: "",
    pincode: "",
  },
  gender: "",
  dob: "",
  designation: "",
  salary: "",
  experience_in_years: "",
};

const AddFaculty: React.FC<IFormProps> = ({ edit }) => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const { data } = await createFaculty(values);
      console.log(data);
      resetForm();
      setSubmitting(false);
      dispatch(
        openSnackbar({ isOpen: true, severity: "success", message: "Faculty added successfully" })
      );
    } catch (error) {
      console.log(error);
      dispatch(openSnackbar({ isOpen: true, severity: "error", message: "something went wrong" }));
    }
  };

  return (
    <Container style={{ paddingTop: "24px" }}>
      <Paper sx={{ p: 2 }}>
        <Formik
          initialValues={edit || initialState}
          validationSchema={facultySchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, handleBlur, handleChange, touched, errors, setValues, resetForm }) => (
            <Form>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="username"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.username && Boolean(errors.username)}
                        helperText={touched.username && errors.username}
                        label="Username"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="designation"
                        name="designation"
                        value={values.designation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.designation && Boolean(errors.designation)}
                        helperText={touched.designation && errors.designation}
                        label="Designation"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MobileDatePicker
                        label="Date of Birth"
                        inputFormat="DD/MM/YYYY"
                        value={values.dob}
                        onChange={(day) =>
                          setValues((v) => ({ ...v, dob: dayjs(day).toISOString() }))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={touched.dob && errors.dob ? true : undefined}
                            fullWidth
                            helperText={errors?.dob}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <RadioButtonGroup
                        title={"gender"}
                        defaultChecked={edit && edit.gender}
                        handleChange={(value) => setValues((v) => ({ ...v, gender: value }))}
                        radioGroup={["male", "female", "others"]}
                        error={touched.gender && errors.gender ? errors.gender : undefined}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="mobile_no"
                        name="mobile_no"
                        type="number"
                        value={values.mobile_no}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.mobile_no && Boolean(errors.mobile_no)}
                        helperText={touched.mobile_no && errors.mobile_no}
                        label="Mobile no"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MobileDatePicker
                        label="Date of join"
                        inputFormat="DD/MM/YYYY"
                        value={values.date_of_join}
                        onChange={(day) =>
                          setValues((v) => ({ ...v, date_of_join: dayjs(day).toISOString() }))
                        }
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="address.plot_no"
                        name="address.plot_no"
                        value={values.address.plot_no}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.address?.plot_no && Boolean(errors.address?.plot_no)}
                        helperText={touched.address?.plot_no && errors.address?.plot_no}
                        label="Plot no"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="address.street"
                        name="address.street"
                        value={values.address.street}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.address?.street && Boolean(errors.address?.street)}
                        helperText={touched.address?.street && errors.address?.street}
                        label="Street"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="address.area"
                        name="address.area"
                        value={values.address.area}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.address?.area && Boolean(errors.address?.area)}
                        helperText={touched.address?.area && errors.address?.area}
                        label="Area"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="address.pincode"
                        name="address.pincode"
                        value={values.address.pincode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.address?.pincode && Boolean(errors.address?.pincode)}
                        helperText={touched.address?.pincode && errors.address?.pincode}
                        label="Pincode"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="salary"
                        name="salary"
                        value={values.salary}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.salary && Boolean(errors.salary)}
                        helperText={touched.salary && errors.salary}
                        type="number"
                        label="Salary"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="experience_in_years"
                        name="experience_in_years"
                        value={values.experience_in_years}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.experience_in_years && Boolean(errors.experience_in_years)}
                        helperText={touched.experience_in_years && errors.experience_in_years}
                        type="number"
                        label="Experience In Years"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={6}>
                      <Button
                        type="submit"
                        color="error"
                        variant="contained"
                        onClick={() => resetForm()}
                      >
                        Reset
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" justifyContent="flex-end">
                        <Button type="submit" variant="contained">
                          {edit ? "Edit" : "Add"} Faculty
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Stack>
              </LocalizationProvider>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default AddFaculty;
