import React, { useState } from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ClassForm from "components/ClassForm";
import { useAppDispatch } from "store";
import { openSnackbar } from "store/slices/snackbarSlice";

import {
  Box,
  Button,
  Grid,
  IconButton,
  Container,
  Modal,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  useDeleteClassMutation,
  useGetAllClassQuery,
} from "store/slices/classSlice";

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

const ClassPage = () => {
  const { data, refetch, isLoading, isError } = useGetAllClassQuery();
  const [open, setOpen] = useState(false);
  const [deleteMutation] = useDeleteClassMutation({});
  const dispatch = useAppDispatch();
  const [standard, setStandard] = useState("");
  const [id, setId] = useState("");
  const [subject, setSubject] = useState<any[]>([]);
  console.log(id);

  console.log(data);

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
    <Container sx={{ p: 2 }}>
      <Box
        sx={{ pb: 4 }}
        display="flex"
        alignItems={"center"}
        justifyContent={"end"}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Add Class
        </Button>
      </Box>
      {isLoading ? (
        <Container sx={{ pt: 2, pb: 2 }}>
          <CircularProgress />
        </Container>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <Grid container spacing={2}>
          {data?.length === 0 ? (
            <Typography variant="h5" color="AppWorkspace">
              no data
            </Typography>
          ) : (
            data?.map((c, index) => (
              <Grid item xs={6} key={index} className="classpage-card-grid">
                <Link to={`/class/${c.class}`}>
                  <Box
                    style={{
                      background: "#232323",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      color="AppWorkspace"
                      style={{ padding: "20px" }}
                    >
                      {c.class}
                    </Typography>
                    <Box onClick={(e) => e.preventDefault()}>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(c._id)}
                        style={{ marginLeft: "50px" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Link>
              </Grid>
            ))
          )}
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
                <CloseIcon
                  onClick={() => {
                    setOpen(false), setStandard("");
                  }}
                />
              </Box>
              <ClassForm
                data={data}
                refetch={refetch}
                setOpen={setOpen}
                id={id}
                standard={standard}
                subject={subject}
              />
            </Box>
          </Modal>
        </Grid>
      )}
    </Container>
  );
};

export default ClassPage;
