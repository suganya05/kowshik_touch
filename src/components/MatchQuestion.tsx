import { Grid, Box, IconButton, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "store";
import { openSnackbar } from "store/slices/snackbarSlice";
import { useDeleteSectionMutation } from "store/slices/sectionSlice";
import MatchForm from "./MatchForm";

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

const MatchQuestion = ({
  questions,
  matchQuestions,
  _id,
  refetch,
  subject,
  index,
  currentChapter,
  questionType,
  standard,
}) => {
  const [deleteMutation] = useDeleteSectionMutation({});
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

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

  const alteredData = () => {
    let data: { question: string; matchQuestion: string }[] = [];
    questions.map((f, i) => {
      matchQuestions.map((c, j) => {
        if (i === j) {
          data.push({ question: f, matchQuestion: c });
        }
      });
    });

    return data;
  };

  return (
    <Grid
      marginBottom="20px"
      className="classpage-card"
      sx={{
        display: "flex",
        gap: "50px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Grid
        className="classpage-card"
        item
        xs={6}
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "left",
          gap: "50px",
        }}
      >
        <Typography
          style={{ fontSize: "25px", paddingLeft: "50px", paddingTop: "31px" }}
        >
          {index + 1}.
        </Typography>

        <Box marginBottom="20px">
          <ol
            style={{
              display: "flex",
              gap: "20px",
              textAlign: "left",
              flexDirection: "column",
              justifyContent: "space-between",
              listStyleType: "lower-alpha",
            }}
          >
            {questions.map((f, index) => (
              <li
                key={index}
                style={{
                  fontSize: "25px",
                  paddingTop: "30px",
                  paddingBottom: "10px",
                }}
              >
                {f}
              </li>
            ))}
          </ol>
        </Box>
      </Grid>
      <Grid
        className="classpage-card"
        item
        xs={6}
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "left",
          gap: "50px",
        }}
      >
        <Box className="classpage-card">
          <ol
            style={{
              display: "flex",
              gap: "20px",
              textAlign: "left",
              flexDirection: "column",
              justifyContent: "space-between",
              listStyleType: "lower-roman",
              padding: "15px",
            }}
          >
            {matchQuestions.map((f, index) => (
              <li key={index} style={{ fontSize: "25px" }}>
                {f}
              </li>
            ))}
          </ol>
        </Box>
      </Grid>

      <Box display="flex" style={{ paddingRight: "30px" }}>
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
          <MatchForm
            refetch={refetch}
            setOpen={setOpen}
            subject={subject}
            currentChapter="6"
            questionType="fill-ups"
            standard="6"
            editData={{ id: _id, initialData: { questions: alteredData() } }}
          />
        </Box>
      </Modal>
    </Grid>
  );
};

export default MatchQuestion;
