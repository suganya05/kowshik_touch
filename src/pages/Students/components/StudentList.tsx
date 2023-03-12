import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Modal,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { Form, Formik } from "formik";

import { payFees } from "api";
import { useAppDispatch } from "store";
import { IFeesType, IStudent } from "constants/types";
import { feesSchema } from "helpers/validationSchema";
import { openSnackbar } from "store/slices/snackbarSlice";
import { useDeleteStudentMutation } from "store/slices/studentSlice";
import { classesList } from "constants/utils";

interface IStudentListProps extends IStudent {
  feesDetails: IFeesType[];
  refetch: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Fees = ({ feesDetails, id, fees = "", refetch }) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const dispatch = useAppDispatch();

  const handleSubmit = async (values) => {
    try {
      handleClose();
      dispatch(
        openSnackbar({
          isOpen: true,
          severity: "info",
          message: "Paying fees...",
        })
      );
      await payFees({ ...values, student_id: id });
      dispatch(
        openSnackbar({
          isOpen: true,
          severity: "success",
          message: "Fees paid successfully",
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
    <>
      {!feesDetails.length ? (
        <Box>
          <Chip color="error" label="not paid" />
          <Button onClick={handleOpen}>Pay</Button>
        </Box>
      ) : (
        <Chip color="success" label="paid" />
      )}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
              Fees Details
            </Typography>
            <CloseIcon onClick={() => setOpen(false)} />
          </Box>
          <Formik
            initialValues={{ fees }}
            validationSchema={feesSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, handleChange, handleBlur, touched, errors }) => (
              <Form>
                <Box display="flex" flexDirection="column" gap={1}>
                  <TextField
                    id="fees"
                    name="fees"
                    value={values.fees}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.fees && Boolean(errors.fees)}
                    helperText={touched.fees && errors.fees}
                    label="Fees"
                    fullWidth
                  />
                  <Button type="submit" variant="contained">
                    confirm
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

const StudentList: React.FC<IStudentListProps> = ({
  firstname,
  standard,
  fees,
  feesDetails,
  _id,
  refetch,
}) => {
  const [deleteMutation] = useDeleteStudentMutation({});
  const navigate = useNavigate();
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

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>{firstname}</TableCell>
      <TableCell style={{ textTransform: "uppercase" }}>
        {classesList.find((f) => f.value === standard)?.label ?? ""}
      </TableCell>
      <TableCell>{fees}</TableCell>
      <TableCell>
        <Fees
          feesDetails={feesDetails}
          id={_id}
          fees={fees.toString()}
          refetch={refetch}
        />
      </TableCell>
      <TableCell>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <IconButton color="error" onClick={() => handleDelete(_id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="success"
            onClick={() => navigate(`/students/edit/${_id}`)}
          >
            <EditIcon />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default StudentList;
