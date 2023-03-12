import React from "react";
import {
  Grid,
  TextField,
  Stack,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Formik, Form as FormikForm } from "formik";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { newAdmissionSchema } from "helpers/validationSchema";
import { CheckboxGroup, RadioButtonGroup } from "components";
import { createStudent, updateStudent } from "api";
import { IStudentFormData } from "constants/types";
import { useGetSchoolsListQuery } from "store/slices/dashboardSlice";
import AddSchoolForm from "./AddSchoolForm";
import { allGroups, classesList, higherSecondaryGroups } from "constants/utils";
import { updateDirtyStatus } from "../../store/slices/generalSlice";
import { useAppDispatch } from "../../store";
import { openSnackbar } from "../../store/slices/snackbarSlice";

const spokenSubjects = {
  spoken_english: false,
  spoken_hindi: false,
};

const subjects = {
  tamil: false,
  english: false,
  maths: false,
  science: false,
  social: false,
  ...spokenSubjects,
};

const initialState: IStudentFormData = {
  firstname: "",
  lastname: "",
  dob: "",
  mobile_no: "",
  gender: "",
  alternative_no: "",
  school: "",
  standard: "",
  group: "",
  board: "others",
  optional_class: "",
  date_of_join: new Date().toISOString(),
  fees: "",
  subjects: "",
  address: {
    plot_no: "",
    street: "",
    area: "",
    pincode: "",
  },
};

interface IFormProps {
  edit?: IStudentFormData & { _id: string };
}

const handleGetSubjects = (
  standard: string,
  group?: string,
  edit?: IStudentFormData
) => {
  if (edit) {
    const group = edit.group;

    if (standard === "11" || standard === "12") {
      let newSubjects = {};
      if (group) {
        const res = higherSecondaryGroups.find(
          (f) => f.group_name.toLowerCase() === group.toLowerCase()
        );
        const subjects = edit.subjects.split(",");
        res?.subjects.forEach((sub) => {
          if (
            subjects.find((f) => f === sub.toLowerCase().split(" ").join("_"))
          ) {
            newSubjects[sub.toLowerCase().split(" ").join("_")] = true;
          } else {
            newSubjects[sub.toLowerCase().split(" ").join("_")] = false;
          }
        });
        return newSubjects;
      }

      allGroups.forEach((sub) => {
        edit.subjects.split(",").forEach((editSub) => {
          if (
            sub.toLowerCase().split(" ").join("_") ===
            editSub.toLowerCase().split(" ").join("_")
          ) {
            newSubjects[sub.toLowerCase().split(" ").join("_")] = true;
          } else {
            if (
              newSubjects[sub.toLowerCase().split(" ").join("_")] === undefined
            ) {
              newSubjects[sub.toLowerCase().split(" ").join("_")] = false;
            }
          }
        });
      });
      return newSubjects;
    }

    edit.subjects.split(",").map((subject) => {
      return (subjects[subject] = true);
    });
  }

  if (standard === "11" || standard === "12") {
    let newSubjects = {};
    if (group) {
      const res = higherSecondaryGroups.find(
        (f) => f.group_name.toLowerCase() === group.toLowerCase()
      );
      res?.subjects.forEach((sub) => {
        newSubjects[sub.toLowerCase().split(" ").join("_")] = false;
      });
      return newSubjects;
    }
  }

  return subjects;
};

const Form: React.FC<IFormProps> = ({ edit }) => {
  const { data, refetch } = useGetSchoolsListQuery();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (
    values: IStudentFormData,
    { resetForm, setSubmitting }
  ) => {
    try {
      const formValues = {
        ...values,
        subjects: values.subjects.split(","),
      };
      if (!edit) {
        const { data } = await createStudent(formValues);
        console.log(data);
        resetForm();
        setSubmitting(false);
        dispatch(
          openSnackbar({
            isOpen: true,
            severity: "success",
            message: "Admission placed successfully",
          })
        );
        return;
      }
      await updateStudent(edit._id, formValues);
      dispatch(updateDirtyStatus(true));
      dispatch(
        openSnackbar({
          isOpen: true,
          severity: "success",
          message: "Student updated successfully",
        })
      );
      navigate("/students");
    } catch (error) {
      console.log(error);
      dispatch(
        openSnackbar({
          isOpen: true,
          severity: "error",
          message: "something went wrong",
        })
      );
    }
  };

  return (
    <>
      <Formik
        initialValues={edit || initialState}
        validationSchema={newAdmissionSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({
          values,
          handleBlur,
          handleChange,
          touched,
          errors,
          setValues,
          resetForm,
        }) => (
          <FormikForm>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="firstname"
                      name="firstname"
                      value={values.firstname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.firstname && Boolean(errors.firstname)}
                      helperText={touched.firstname && errors.firstname}
                      label="First name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="lastname"
                      name="lastname"
                      value={values.lastname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.lastname && Boolean(errors.lastname)}
                      helperText={touched.lastname && errors.lastname}
                      label="Last name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MobileDatePicker
                      label="Date of Birth"
                      inputFormat="DD/MM/YYYY"
                      value={values.dob}
                      onChange={(day) =>
                        setValues((v) => ({
                          ...v,
                          dob: dayjs(day).toISOString(),
                        }))
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
                      handleChange={(value) =>
                        setValues((v) => ({ ...v, gender: value }))
                      }
                      radioGroup={["male", "female", "others"]}
                      error={
                        touched.gender && errors.gender
                          ? errors.gender
                          : undefined
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={touched.school && Boolean(errors.school)}
                    >
                      <InputLabel htmlFor="school">School</InputLabel>
                      <Select
                        labelId="school"
                        id="school"
                        name="school"
                        aria-describedby="select-school"
                        value={values.school}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="School"
                        native
                      >
                        <option aria-label="none" value=""></option>
                        {data?.map((list, i) => {
                          return (
                            <optgroup key={i.toString()} label={list.place}>
                              {list.schoolList.map((school, j) => (
                                <option key={j.toString()} value={school}>
                                  {school}
                                </option>
                              ))}
                            </optgroup>
                          );
                        })}
                        <option value="others">OTHERS</option>
                      </Select>
                      {touched.school && errors.school && (
                        <FormHelperText color="error" id="select-school">
                          {errors.school}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <RadioButtonGroup
                      title={"Board"}
                      defaultChecked={edit && edit.board}
                      handleChange={(value) =>
                        setValues((v) => ({ ...v, board: value }))
                      }
                      radioGroup={["state board", "cbse", "others"]}
                      error={
                        touched.board && errors.board ? errors.board : undefined
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={touched.standard && Boolean(errors.standard)}
                    >
                      <InputLabel id="standard">Class</InputLabel>
                      <Select
                        labelId="standard"
                        id="standard"
                        name="standard"
                        aria-describedby="select-class"
                        value={values.standard}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Class"
                      >
                        {classesList.map((c) => (
                          <MenuItem key={c.value} value={c.value}>
                            {c.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.standard && errors.standard && (
                        <FormHelperText color="error" id="select-class">
                          {errors.standard}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      disabled={!["11", "12"].includes(values.standard)}
                      fullWidth
                      error={touched.group && Boolean(errors.group)}
                    >
                      <InputLabel id="group">Group</InputLabel>
                      <Select
                        labelId="group"
                        id="group"
                        name="group"
                        aria-describedby="select-group"
                        value={values.group}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Group"
                      >
                        {higherSecondaryGroups.map((c) => (
                          <MenuItem key={c.group_name} value={c.group_name}>
                            {c.group_name.toUpperCase()}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.group && errors.group && (
                        <FormHelperText color="error" id="select-group">
                          {errors.group}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {values.standard === "others" && (
                      <TextField
                        id="optional_class"
                        name="optional_class"
                        value={values.optional_class}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.optional_class &&
                          Boolean(errors.optional_class)
                        }
                        helperText={
                          touched.optional_class && errors.optional_class
                        }
                        label="Mention your studies"
                        fullWidth
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    {values.standard !== "" &&
                      !["spoken_hindi", "spoken_english"].includes(
                        values.standard
                      ) && (
                        <CheckboxGroup
                          subjects={handleGetSubjects(
                            values.standard,
                            values.group,
                            edit
                          )}
                          handleChange={(value) =>
                            setValues((v) => ({ ...v, subjects: value }))
                          }
                          error={
                            touched.subjects && errors.subjects
                              ? errors.subjects
                              : undefined
                          }
                        />
                      )}
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
                    <TextField
                      id="alternative_no"
                      name="alternative_no"
                      type="number"
                      value={values.alternative_no}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.alternative_no && Boolean(errors.alternative_no)
                      }
                      helperText={
                        touched.alternative_no && errors.alternative_no
                      }
                      label="Alternative no"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="address.plot_no"
                      name="address.plot_no"
                      value={values.address.plot_no}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.address?.plot_no &&
                        Boolean(errors.address?.plot_no)
                      }
                      helperText={
                        touched.address?.plot_no && errors.address?.plot_no
                      }
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
                      error={
                        touched.address?.street &&
                        Boolean(errors.address?.street)
                      }
                      helperText={
                        touched.address?.street && errors.address?.street
                      }
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
                      error={
                        touched.address?.area && Boolean(errors.address?.area)
                      }
                      helperText={touched.address?.area && errors.address?.area}
                      label="Area"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="address.pincode"
                      name="address.pincode"
                      type="number"
                      value={values.address.pincode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.address?.pincode &&
                        Boolean(errors.address?.pincode)
                      }
                      helperText={
                        touched.address?.pincode && errors.address?.pincode
                      }
                      label="Pincode"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="fees"
                      name="fees"
                      value={values.fees}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.fees && Boolean(errors.fees)}
                      helperText={touched.fees && errors.fees}
                      type="number"
                      label="Fees"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MobileDatePicker
                      label="Date of join"
                      inputFormat="DD/MM/YYYY"
                      value={values.date_of_join}
                      onChange={(day) =>
                        setValues((v) => ({
                          ...v,
                          date_of_join: dayjs(day).toISOString(),
                        }))
                      }
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
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
                        {edit ? "Edit" : "Add"} student
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Stack>
            </LocalizationProvider>
            <AddSchoolForm
              schoolValue={values.school}
              refetch={refetch}
              setValues={setValues}
            />
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

export default Form;
