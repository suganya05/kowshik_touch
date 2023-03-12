import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Form, Formik } from "formik";
import { VisibilityOffSharp, VisibilitySharp } from "@mui/icons-material";

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

const AuthModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((p) => !p);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (values) => {
    const adminId = import.meta.env.VITE_ADMIN_ID;
    const password = import.meta.env.VITE_ADMIN_PASSWORD;

    if (adminId === values.adminId && password === values.password) {
      sessionStorage.setItem("id", JSON.stringify(true));
      return setOpen(true);
    }

    setOpen(false);
    alert("Invalid credentials");
  };

  return (
    <Modal
      open={!open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
          Login
        </Typography>
        <Formik
          initialValues={{ adminId: "", password: "" }}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  id="adminId"
                  name="adminId"
                  value={values.adminId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.adminId && Boolean(errors.adminId)}
                  helperText={touched.adminId && errors.adminId}
                  label="Admin Id"
                  fullWidth
                />
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffSharp />
                          ) : (
                            <VisibilitySharp />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <Button type="submit" variant="contained">
                  confirm
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AuthModal;
