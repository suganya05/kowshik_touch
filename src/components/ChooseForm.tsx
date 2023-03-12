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

interface IChooseForm {
  standard: string;
  currentChapter: string;
  subject: string;
  questionType: string;
  setOpen: any;
  refetch?: any;
  editData?: {
    id: string;
    initialData: any;
  };
}

const ChooseForm: React.FC<IChooseForm> = ({
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

  const validate = Yup.object({
    questions: Yup.array().of(
      Yup.object({
        question: Yup.string().required("question required"),
        option: Yup.object({
          optionA: Yup.string().required("optionA required"),
          optionB: Yup.string().required("optionB required"),
          optionC: Yup.string().required("optionC required"),
          optionD: Yup.string().required("optionD required"),
        }),
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
                option: [
                  q.option.optionA,
                  q.option.optionB,
                  q.option.optionC,
                  q.option.optionD,
                ],
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

  const handleUpdate = async (values: any) => {
    console.log(editData);
    console.log(values);

    const question = values.questions[0].option;
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
              option: [
                question.optionA,
                question.optionB,
                question.optionC,
                question.optionD,
              ],
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
              option: {
                optionA: editData?.initialData.option[0],
                optionB: editData?.initialData.option[1],
                optionC: editData?.initialData.option[2],
                optionD: editData?.initialData.option[3],
              },
            },
          ],
        } || {
          questions: [
            {
              question: "",
              option: {
                optionA: "",
                optionB: "",
                optionC: "",
                optionD: "",
              },
            },
          ],
        }
      }
      onSubmit={editData?.initialData ? handleUpdate : handleSubmit}
      validationSchema={validate}
      enableReinitialize
    >
      {({ values, handleChange, handleBlur, touched }) => (
        <Form>
          <FieldArray name="questions">
            {(fieldArrayProps) => (
              <Box>
                {values.questions.map((option, index) => (
                  <div
                    key={index}
                    className="milestones-input"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        width: "100%",
                      }}
                    >
                      <TextField
                        name={`questions.${index}.question`}
                        value={option.question}
                        onChange={handleChange}
                        placeholder="questions"
                        type="text"
                        // error={
                        //   touched.questions?.map((f) => f.question) &&
                        //   Boolean(errors.questions)
                        // }
                        style={{
                          paddingTop: "15px ",
                        }}
                      />
                      <ErrorMessage
                        name={`questions.${index}.question`}
                        component="div"
                        className="errorMsg"
                      />
                      <Box
                        style={{
                          padding: "2px 0",
                        }}
                      >
                        <TextField
                          name={`questions.${index}.option.optionA`}
                          placeholder="optionA"
                          value={option?.option.optionA}
                          onChange={handleChange}
                          type="text"
                          // error={
                          //   touched.questions?.map((f) => f.option) &&
                          //   Boolean(errors.questions)
                          // }
                        />
                        <ErrorMessage
                          name={`questions.${index}.option.optionA`}
                          component="div"
                          className="errorMsg"
                        />
                        <TextField
                          name={`questions.${index}.option.optionB`}
                          placeholder="optionB"
                          value={option?.option.optionB}
                          onChange={handleChange}
                          type="text"
                          // error={
                          //   touched.questions?.map((f) => f.option) &&
                          //   Boolean(errors.questions)
                          // }
                        />
                        <ErrorMessage
                          name={`questions.${index}.option.optionB`}
                          component="div"
                          className="errorMsg"
                        />

                        <TextField
                          name={`questions.${index}.option.optionC`}
                          placeholder="optionC"
                          value={option?.option.optionC}
                          onChange={handleChange}
                          type="text"
                          // error={
                          //   touched.questions?.map((f) => f.option) &&
                          //   Boolean(errors.questions)
                          // }
                        />
                        <ErrorMessage
                          name={`questions.${index}.option.optionC`}
                          component="div"
                          className="errorMsg"
                        />
                        <TextField
                          name={`questions.${index}.option.optionD`}
                          placeholder="optionD"
                          value={option?.option.optionD}
                          onChange={handleChange}
                          type="text"
                          // error={
                          //   touched.questions?.map((f) => f.option) &&
                          //   Boolean(errors.questions)
                          // }
                        />
                        <ErrorMessage
                          name={`questions.${index}.option.optionD`}
                          component="div"
                          className="errorMsg"
                        />
                      </Box>
                    </Box>
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
                    style={{ marginTop: "-80px" }}
                    onClick={() =>
                      fieldArrayProps.push({
                        question: "",
                        option: {
                          optionA: "",
                          optionB: "",
                          optionC: "",
                          optionD: "",
                        },
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

export default ChooseForm;
