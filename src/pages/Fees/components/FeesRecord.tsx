import {
  TableRow,
  TableCell,
  IconButton,
  Modal,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Form, Formik } from "formik";

import { IFeesType } from "../../../constants/types";
import { feesSchema } from "../../../helpers/validationSchema";
import { useUpdateFeesMutation } from "../../../store/slices/feesSlice";
import { useAppDispatch } from "../../../store";
import { openSnackbar } from "../../../store/slices/snackbarSlice";
import { classesList } from "constants/utils";

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

const FeesRecord: React.FC<IFeesType & { refetch: () => void }> = ({
  student_id,
  createdAt,
  fees,
  _id,
  refetch,
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [updateMutation] = useUpdateFeesMutation();

  const handleClose = () => setOpen(false);

  const handleSubmit = async (values) => {
    try {
      setOpen(false);
      dispatch(
        openSnackbar({
          isOpen: true,
          severity: "info",
          message: "Updating Fees...",
        })
      );
      await updateMutation({ id: _id, body: values }).unwrap();
      dispatch(
        openSnackbar({
          isOpen: true,
          severity: "success",
          message: "Fees updated successfully",
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

  // const handleDelete = async () => {
  //   try {
  //     const confirm = window.confirm("Do you want do delete this, Are you sure?");
  //     if (!confirm) return setOpen(false);
  //     dispatch(openSnackbar({ isOpen: true, severity: "info", message: "Deleting..." }));
  //     await deleteMutation({ id: _id }).unwrap();
  //     dispatch(
  //       openSnackbar({ isOpen: true, severity: "success", message: "Deleted successfully" })
  //     );
  //     refetch();
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(openSnackbar({ isOpen: true, severity: "error", message: "Something went wrong" }));
  //   }
  // };

  return (
    <>
      <TableRow>
        <TableCell>{student_id?.firstname}</TableCell>
        <TableCell>
          {classesList.find((f) => f.value === student_id?.standard)?.label ??
            ""}
        </TableCell>
        <TableCell>{moment(createdAt).format("ll")}</TableCell>
        <TableCell>{fees}</TableCell>
        <TableCell>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <IconButton color="success" onClick={() => setOpen(true)}>
              <EditIcon />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            Update Fees Details
          </Typography>
          <Typography variant="body2" component="h2" mb={0.5}>
            Student name
          </Typography>
          <Typography variant="h5" component="h2" mb={4}>
            {student_id.firstname}
          </Typography>
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

export default FeesRecord;
