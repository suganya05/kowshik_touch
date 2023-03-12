import React, { useEffect, useState, useMemo } from "react";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import axios from "axios";
import { baseURL } from "api";
import * as Yup from "yup";
import {
  Grid,
  TextField,
  Button,
  Box,
  Link,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUpdateResultMutation } from "store/slices/resultSlice";
import { IResult } from "constants/types";
import { higherSecondaryGroups } from "constants/utils";

const standards = [
  { value: "10", label: "X" },
  { value: "11", label: "XI" },
  { value: "12", label: "XII" },
];

const TenthSubjects = [
  "ENGLISH",
  "TAMIL",
  "MATHEMATICS",
  "SCIENCE",
  "SOCIALSCIENCE",
];

interface IAddResult {
  editData?: IResult;
}

const AddResult: React.FC<IAddResult> = ({ editData }) => {
  const navigate = useNavigate();
  const [updateMutation] = useUpdateResultMutation({});

  console.log(editData);

  const validate = Yup.object({
    registerNumber: Yup.string().required("This field is required"),
    studentName: Yup.string().required("This field isStudent Name required"),
    testName: Yup.string().required("This field is required"),
    group: Yup.string(),
    standard: Yup.string().required("This field is required"),
    subject: Yup.array().of(
      Yup.object({
        subjectName: Yup.string().required("This field is required"),
        theory: Yup.number().required("This field is required"),
        havePractical: Yup.boolean(),
        practical: Yup.number().when("havepractical", {
          is: true,
          then: Yup.number().required("This field is required"),
        }),
      })
    ),
  });

  const handleSubmit = async (values: any) => {
    try {
      const { data } = await axios.post(`${baseURL}/result/create`, values);
      console.log(data);
      navigate("/result");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (values: any) => {
    try {
      if (!editData) return;
      await updateMutation({
        id: editData._id,
        body: {
          ...values,
        },
      }).unwrap();
      console.log("updated");
      navigate("/result");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Link
        href="/result"
        underline="none"
        style={{ display: "flex", justifyContent: "end", margin: "20px 0" }}
      >
        <Button color="primary" variant="contained">
          Back To Result
        </Button>
      </Link>
      <Formik
        initialValues={
          editData || {
            registerNumber: "",
            studentName: "",
            group: "",
            testName: "",
            standard: "",
            subject: [
              {
                subjectName: "",
                theory: 0,
                havePractical: false,
                practical: 0,
              },
            ],
          }
        }
        onSubmit={editData ? handleUpdate : handleSubmit}
        // onSubmit={(values) => console.log(values)}
        validationSchema={validate}
        enableReinitialize
      >
        {({ values, handleChange, handleBlur, setValues, touched, errors }) => (
          <Form>
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              style={{ paddingTop: "20px" }}
            >
              <TextField
                id="registerNumber"
                name={`registerNumber`}
                value={values.registerNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Register Number"
                fullWidth
                error={touched.registerNumber && Boolean(errors.registerNumber)}
              />
              <ErrorMessage
                name="registerNumber"
                component="div"
                className="errorMsg"
              />
              <TextField
                id="studentName"
                name={`studentName`}
                value={values.studentName}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Student Name"
                fullWidth
                error={touched.studentName && Boolean(errors.studentName)}
              />
              <ErrorMessage
                name="studentName"
                component="div"
                className="errorMsg"
              />
              <TextField
                id="testName"
                name={`testName`}
                value={values.testName}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Test Name"
                fullWidth
                error={touched.testName && Boolean(errors.testName)}
              />
              <ErrorMessage
                name="testName"
                component="div"
                className="errorMsg"
              />

              <Grid
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                gap={"10px"}
              >
                <Grid item xs={12} sm={6} width={"50%"}>
                  <FormControl fullWidth>
                    <InputLabel id="standard">standard</InputLabel>
                    <Select
                      labelId="standard"
                      id="standard"
                      name="standard"
                      aria-describedby="select-standard"
                      value={values.standard}
                      error={touched.standard && Boolean(errors.standard)}
                      // onChange={handleChange}
                      onBlur={handleBlur}
                      label="Standard"
                      onChange={(e) => {
                        if (e.target.value === "10") {
                          const mappedDatas = TenthSubjects.map((f) => {
                            return {
                              subjectName: f,
                              theory: 0,
                              havePractical: false,
                              practical: 0,
                            };
                          });

                          setValues((v) => ({
                            ...v,
                            standard: e.target.value,
                            subject: mappedDatas,
                          }));

                          return;
                        }
                        setValues((v) => ({
                          ...v,
                          standard: e.target.value,
                        }));
                      }}
                    >
                      {standards.map((c, i) => (
                        <MenuItem key={i} value={c.value}>
                          {c.label.toUpperCase()}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} width={"50%"}>
                  <FormControl
                    disabled={!["11", "12"].includes(values.standard)}
                    fullWidth
                    // error={touched.group && Boolean(errors.group)}
                  >
                    <InputLabel id="group">Group</InputLabel>
                    <Select
                      labelId="group"
                      id="group"
                      name="group"
                      aria-describedby="select-group"
                      value={values.group}
                      onChange={(e) => {
                        const groupValue = e.target.value;
                        const data = higherSecondaryGroups.find(
                          (f) =>
                            f.group_name.toLowerCase() ===
                            groupValue.toLowerCase()
                        );
                        if (!data) return;
                        const mappedData = data?.subjects.map((f) => {
                          return {
                            subjectName: f,
                            theory: 0,
                            havePractical: false,
                            practical: 0,
                          };
                        });

                        data?.subjects.map((f) =>
                          setValues((v) => ({
                            ...v,
                            group: e.target.value,
                            subject: mappedData,
                          }))
                        );
                      }}
                      onBlur={handleBlur}
                      label="Group"
                    >
                      {higherSecondaryGroups.map((c) => (
                        <MenuItem key={c.group_name} value={c.group_name}>
                          {c.group_name.toUpperCase()}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* {touched.group && errors.group && (
                      <FormHelperText color="error" id="select-group">
                        {errors.group}
                      </FormHelperText>
                    )} */}
                  </FormControl>
                </Grid>
              </Grid>
              <FieldArray name="subject">
                {(fieldArrayProps) => (
                  <Box>
                    {values.subject.map((option, index) => (
                      <div
                        key={index}
                        className="milestones-input"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          paddingTop: "5px",
                          gap: "5px",
                        }}
                      >
                        {values.standard && (
                          <>
                            <TextField
                              id="subjectName"
                              name={`subject.${index}.subjectName`}
                              value={option.subjectName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              label="Subject Name"
                              fullWidth
                            />

                            <TextField
                              id="theory"
                              name={`subject.${index}.theory`}
                              value={option.theory}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              // error={
                              //   touched.subject?.map(
                              //     (f) => f.theory
                              //   ) && Boolean(errors.subject)
                              // }
                              label="theory"
                              fullWidth
                            />

                            <TextField
                              id="practical"
                              name={`subject.${index}.practical`}
                              value={option.practical}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              // error={
                              //   touched.subject?.map(
                              //     (f) => f.practical
                              //   ) && Boolean(errors.subject)
                              // }
                              label="Practical"
                              fullWidth
                              disabled={option.havePractical === false}
                            />

                            <Checkbox
                              onChange={handleChange}
                              id="havePractical"
                              name={`subject.${index}.havePractical`}
                              value={option.havePractical}
                              checked={option.havePractical === true}
                            />
                          </>
                        )}
                      </div>
                    ))}
                    <Box
                      style={{
                        display: "grid",
                        justifyItems: "end",
                        gridTemplateColumns: "1fr 1fr",
                      }}
                    >
                      <Button
                        style={{ marginTop: "20px" }}
                        type="submit"
                        variant="contained"
                      >
                        confirm
                      </Button>
                    </Box>
                  </Box>
                )}
              </FieldArray>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddResult;
