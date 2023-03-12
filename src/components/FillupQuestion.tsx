import React, { useState } from "react";
import { Box, Typography, IconButton, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "store";
import { openSnackbar } from "store/slices/snackbarSlice";
import FillupForm from "./FillupForm";
import { useDeleteSectionMutation } from "store/slices/sectionSlice";
import { useQuestionBankStore } from "store/slices/FillupQuestion";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const FillupQuestion = ({
  questions,
  _id,
  subject,
  refetch,
  index,
  data,
  currentChapter,
  questionType,
  standard,
}) => {
  const [deleteMutation] = useDeleteSectionMutation({});
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const initialState = useQuestionBankStore((state) => state.initialState);
  const storeQuestion = useQuestionBankStore((state) => state.storeQuestion);

  console.log(questions);
  const handleClick = () => {
    storeQuestion(data);
    // setClicked(data);
  };

  const handleDelete = async (id: string) => {
    try {
      const confirm = window.confirm(
        "Do you want do delete this, Are you sure?"
      );
      if (!confirm) return;
      dispatch(
        openSnackbar({ isOpen: true, severity: "info", message: "Deleting..." })
      );
      await deleteMutation({ id }).unwrap();
      dispatch(
        openSnackbar({
          isOpen: true,
          severity: "success",
          message: "Student deleted successfully",
        })
      );
      refetch();
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
    <Box
      key={index}
      className="classpage-card fillUpQuestions"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box onClick={handleClick}>
        <Typography
          variant="h6"
          color="AppWorkspace"
          textTransform="capitalize"
          style={{ marginLeft: "20px", padding: "20px" }}
        >
          {index + 1}. {questions}
        </Typography>
      </Box>

      <Box style={{ paddingRight: "30px" }}>
        <IconButton color="error" onClick={() => handleDelete(_id)}>
          <DeleteIcon />
        </IconButton>
        <IconButton color="success" onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
      </Box>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: "80%", height: 500 }}>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              mb={2}
            >
              Set Chapter
            </Typography>
            <CloseIcon onClick={() => setOpen(false)} />
          </Box>

          <FillupForm
            refetch={refetch}
            setOpen={setOpen}
            currentChapter={currentChapter}
            subject={subject}
            questionType={questionType}
            standard={standard}
            editData={{ id: _id, initialData: { questions } }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default FillupQuestion;
