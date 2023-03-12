import React from "react";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import { Box, Button, TextField } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import { baseURL } from "api";

interface ISubjectForm {
  standard: string;
  refetch: any;
  setOpen: any;
  data: any;
}

const SubjectFrom: React.FC<ISubjectForm> = ({
  standard,
  refetch,
  setOpen,
}) => {
  const validate = Yup.object({
    subject: Yup.array().of(
      Yup.object({
        subjectName: Yup.string().required("subject name required"),

        chapter: Yup.string().required("Total Chapters required"),
      })
    ),
  });

  const handleSubmit = async (values: any) => {
    try {
      const { data } = await axios.patch(`${baseURL}/class/addsubject`, {
        class: standard,
        subject: values.subject,
      });
      console.log(data);
      setOpen(false);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{
        subject: [{ subjectName: "", chapter: "" }],
      }}
      onSubmit={handleSubmit}
      // onSubmit={(values)=>console.log(values)}
      validationSchema={validate}
      enableReinitialize
    >
      {({ values, handleChange, handleBlur, touched, errors }) => (
        <Form>
          <Box display="flex" flexDirection="column" gap={2}>
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
                        id="chapter"
                        name={`subject.${index}.chapter`}
                        value={option.chapter}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // error={
                        //   touched.subject?.map(
                        //     (f) => f.chapter
                        //   ) && Boolean(errors.subject)
                        // }
                        label="Total Chapters"
                        fullWidth
                      />
                      <ErrorMessage
                        name={`subject.${index}.chapter`}
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
                          chapter: "",
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

export default SubjectFrom;
