import React from "react";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import { Box, Button, TextField } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import { useAppDispatch } from "store";
import { openSnackbar } from "store/slices/snackbarSlice";
import { useUpdateSectionMutation } from "store/slices/sectionSlice";
import { baseURL } from "api";

interface IMatchFormProps {
  standard: any;
  currentChapter: any;
  subject: string;
  questionType: any;
  setOpen: any;
  refetch?: any;
  editData?: {
    id: string;
    initialData: any;
  };
}

const MatchForm: React.FC<IMatchFormProps> = ({
  standard,
  currentChapter,
  subject,
  questionType,
  setOpen,
  refetch,
  editData,
}) => {
  const [updateMutation] = useUpdateSectionMutation({});
  const dispatch = useAppDispatch();

  console.log(editData);

  const validate = Yup.object({
    questions: Yup.array().of(
      Yup.object({
        question: Yup.string().required("Question required"),
        matchQuestion: Yup.string().required("MatchQuestion required"),
      })
    ),
  });

  const handleSubmit = async (values: any) => {
    console.log(values);
    try {
      const { data } = await axios.post(
        `${baseURL}/section/create`,
        values.questions.map((q) => {
          return {
            standard: standard,
            subject: subject,
            chapterNo: currentChapter,
            title: questionType,
            sections: [
              {
                questions: [q.question],
                matchQuestions: [q.matchQuestion],
              },
            ],
          };
        })
      );
      console.log(data);
      refetch();
      setOpen(false);
    } catch (error) {
      console.log("can't update");
    }
  };

  const handleUpdate = async (values: any) => {
    console.log(values);
    try {
      if (!editData) return;
      const confirm = window.confirm(
        "Do you want do update this, Are you sure?"
      );
      if (!confirm) return;
      dispatch(
        openSnackbar({ isOpen: true, severity: "info", message: "Updating..." })
      );
      await updateMutation({
        id: editData?.id,
        body: {
          sections: [
            {
              questions: values.questions.map((p) => p.question),
              matchQuestions: values.questions.map((p) => p.matchQuestion),
            },
          ],
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
        editData?.initialData || {
          questions: [{ question: "", matchQuestion: "" }],
        }
      }
      onSubmit={editData ? handleUpdate : handleSubmit}
      // onSubmit={(values)=>console.log(values)}
      validationSchema={validate}
      enableReinitialize
    >
      {({ values, handleChange, touched, errors }) => (
        <Form>
          <Box display="flex" flexDirection="column" gap={2}>
            <FieldArray name="questions">
              {(fieldArrayProp) => (
                <Box
                  style={{
                    height: "60vh",
                    overflow: "auto",
                  }}
                >
                  {values.questions.map((option, index) => (
                    <div
                      className="milestones-input"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "20px",
                        paddingTop: "5px",
                      }}
                    >
                      <TextField
                        name={`questions.${index}.question`}
                        value={option.question}
                        onChange={handleChange}
                        placeholder="questions"
                        type="text"
                        error={touched.question && Boolean(errors.question)}
                        style={{
                          width: "50%",
                        }}
                      />
                      <ErrorMessage
                        name={`questions.${index}.question`}
                        component="div"
                        className="errorMsg"
                      />
                      <TextField
                        name={`questions.${index}.matchQuestion`}
                        placeholder="matchQuestion"
                        value={option.matchQuestion}
                        onChange={handleChange}
                        type="text"
                        error={
                          touched.matchQuestion && Boolean(errors.matchQuestion)
                        }
                        style={{
                          width: "50%",
                        }}
                      />
                      <ErrorMessage
                        name={`questions.${index}.matchQuestion`}
                        component="div"
                        className="errorMsg"
                      />

                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: "30px",
                        }}
                      >
                        <div
                          onClick={() => fieldArrayProp.remove(index)}
                          className="close-icon"
                        >
                          <RemoveCircleOutlineIcon style={{ color: "red" }} />
                        </div>
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
                      style={{ margin: "20px" }}
                      type="submit"
                      variant="contained"
                    >
                      confirm
                    </Button>
                    <div
                      style={{ marginTop: "-44px" }}
                      onClick={() =>
                        fieldArrayProp.push({
                          question: "",
                          matchQuestion: "",
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

export default MatchForm;
