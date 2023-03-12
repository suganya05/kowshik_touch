import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "api";
import { useAppDispatch } from "store";
import { openSnackbar } from "store/slices/snackbarSlice";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import { FieldArray, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField } from "@mui/material";
import { useUpdateClassMutation } from "store/slices/classSlice";

interface IClassForm {
  data: any;
  refetch: any;
  id: string;
  standard: string;
  subject: {};
  setOpen: any;
}

const classForm: React.FC<IClassForm> = ({
  data,
  refetch,
  id,
  standard,
  subject,
  setOpen,
}) => {
  const dispatch = useAppDispatch();
  const [updateMutation] = useUpdateClassMutation({});

  const validate = Yup.object({
    class: Yup.string()
      .test("maxLenght", "This class is already existing", (val) =>
        !val || !data ? true : !data?.map((c) => c.class).includes(val)
      )
      .required("Class required"),
    subject: Yup.array().of(
      Yup.object({
        subjectName: Yup.string().required("subject name required"),
        totalChapters: Yup.string().required("Total Chapters required"),
      })
    ),
  });

  const handleSubmit = async (values: any) => {
    try {
      const { data } = await axios.post(`${baseURL}/class/create`, values);
      console.log(data);
      setOpen(false);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (values: any) => {
    try {
      if (!data) return;
      const confirm = window.confirm(
        "Do you want do update this, Are you sure?"
      );
      if (!confirm) return;
      dispatch(
        openSnackbar({ isOpen: true, severity: "info", message: "Updating..." })
      );

      await updateMutation({
        id: id,
        body: {
          values,
        },
      }).unwrap();
      dispatch(
        openSnackbar({
          isOpen: true,
          severity: "success",
          message: "Updated successfully",
        })
      );
      refetch();
      setOpen(false);
    } catch (error) {
      console.log(error);
      dispatch(
        openSnackbar({
          isOpen: true,
          severity: "error",
          message: "Something went wrong",
        })
      );
    }
  };

  return (
    <Formik
      initialValues={
        {
          subject: [{ subjectName: subject[0], totalChapters: subject[1] }],
          class: standard,
        } || {
          subject: [{ subjectName: "", totalChapters: "" }],
          class: "",
        }
      }
      onSubmit={!standard ? handleSubmit : handleUpdate}
      validationSchema={validate}
      enableReinitialize
    >
      {({ values, handleChange, handleBlur, touched, errors }) => (
        <Form>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              id="class"
              name="class"
              value={values.class}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.class && Boolean(errors.class)}
              helperText={touched.class && errors.class}
              label="class"
              fullWidth
            />

            <FieldArray name="subject">
              {(fieldArrayProps) => (
                <Box
                  style={{
                    height: "50vh",
                    overflow: "auto",
                  }}
                >
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
                      <TextField
                        id="subjectName"
                        name={`subject.${index}.subjectName`}
                        value={option.subjectName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // error={
                        //   touched.subject?.map((f) => f.subjectName) &&
                        //   Boolean(errors.subject)
                        // }
                        label="Subject"
                        fullWidth
                      />
                      <ErrorMessage
                        name={`subject.${index}.subjectName`}
                        component="div"
                        className="errorMsg"
                      />
                      <TextField
                        id="totalChapters"
                        name={`subject.${index}.totalChapters`}
                        value={option.totalChapters}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // error={
                        //   touched.subject?.map(
                        //     (f) => f.totalChapters
                        //   ) && Boolean(errors.subject)
                        // }
                        label="Total Chapters"
                        fullWidth
                      />
                      <ErrorMessage
                        name={`subject.${index}.totalChapters`}
                        component="div"
                        className="errorMsg"
                      />
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "30px",
                          }}
                        >
                          <div
                            onClick={() => fieldArrayProps.remove(index)}
                            className="close-icon"
                          >
                            <RemoveCircleOutlineIcon style={{ color: "red" }} />
                          </div>
                        </Box>
                      </Box>
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
                    <div
                      style={{ marginTop: "-44px" }}
                      onClick={() =>
                        fieldArrayProps.push({
                          subjectName: "",
                          totalChapters: "",
                        })
                      }
                    >
                      <AddCircleOutlineTwoToneIcon
                        style={{ color: "#32CD32" }}
                      />
                    </div>
                  </Box>
                </Box>
              )}
            </FieldArray>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default classForm;
