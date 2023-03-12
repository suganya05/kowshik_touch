import React from "react";
import { Alert, Snackbar as MuiSnackbar } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../store";
import { closeSnackbar } from "../../store/slices/snackbarSlice";

const Snackbar = () => {
  const dispatch = useAppDispatch();
  const { autoHideDuration, isOpen, message, severity } = useAppSelector((state) => state.snackbar);

  const handleClose = () => dispatch(closeSnackbar());

  return (
    <MuiSnackbar
      open={isOpen}
      autoHideDuration={autoHideDuration}
      onClose={(e, reason) => {
        if (reason === "clickaway") return undefined;
        handleClose();
      }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
