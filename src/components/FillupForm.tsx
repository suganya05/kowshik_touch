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

interface IFillupFormProps {
  standard: string;
  currentChapter: string;
  subject: string;
  questionType: string;
  setOpen: any;
  refetch: any;
  editData?: {
    id: string;
    initialData: any;
  };
}

const FillupForm: React.FC<IFillupFormProps> = ({
  standard,
  subject,
  currentChapter,
  questionType,
  setOpen,
  refetch,
  editData,
}) => {
  const [updateMutation] = useUpdateSectionMutation({});
  const dispatch = useAppDispatch();

  const validate = Yup.object({
    questions: Yup.array().of(
      Yup.object({
        question: Yup.string().required("question required"),
      })
    ),
  });
  const handleSubmit = async (values: any) => {
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
              },
            ],
          };
        })
      );
      refetch();
      console.log(data);
      setOpen(false);
    } catch (error) {
      console.log("can't update");
    }
  };

  console.log(editData?.initialData);

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
        {
          questions: [
            {
              question: editData?.initialData.questions,
            },
          ],
        } || {
          questions: [
            {
              question: "",
            },
          ],
        }
      }
      onSubmit={editData?.initialData ? handleUpdate : handleSubmit}
      validationSchema={validate}
      enableReinitialize
    >
      {({ values, handleChange, handleBlur, touched, errors }) => (
        <Form>
          <FieldArray name="questions">
            {(fieldArrayProps) => (
              <Box
                style={{
                  height: "60vh",
                  overflow: "auto",
                }}
              >
                {values.questions.map((option, index) => (
                  <div
                    key={index}
                    className="milestones-input"
                    style={{
                      display: "flex",
                      gap: "20px",
                      padding: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <TextField
                      style={{ width: "100%" }}
                      name={`questions.${index}.question`}
                      value={option.question}
                      onChange={handleChange}
                      placeholder="questions"
                      type="text"
                      // error={touched.question && Boolean(errors.question)}
                    />
                    <ErrorMessage
                      name={`questions.${index}.question`}
                      component="div"
                      className="errorMsg"
                    />

                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "20px",
                      }}
                    >
                      <div
                        onClick={() => fieldArrayProps.remove(index)}
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
                    // style={{ margin: "auto" }}
                    type="submit"
                    variant="contained"
                  >
                    confirm
                  </Button>
                  <div
                    style={{ marginTop: "-54px" }}
                    onClick={() =>
                      fieldArrayProps.push({
                        question: "",
                      })
                    }
                  >
                    <AddCircleOutlineTwoToneIcon style={{ color: "#32CD32" }} />
                  </div>
                </Box>
              </Box>
            )}
          </FieldArray>
        </Form>
      )}
    </Formik>
  );
};

export default FillupForm;
