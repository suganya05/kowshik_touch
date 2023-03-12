import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { addSchoolSchema } from "helpers/validationSchema";
import { useAddSchoolMutation } from "../../store/slices/dashboardSlice";

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

const AddSchoolForm = ({
  refetch,
  setValues,
  schoolValue,
}: {
  refetch: () => void;
  setValues: any;
  schoolValue: string;
}) => {
  const [addMutation] = useAddSchoolMutation();

  const handleAddSchool = async (values) => {
    try {
      await addMutation({ ...values }).unwrap();
      refetch();
      setValues((v) => ({ ...v, school: values.schoolName.toUpperCase() }));
    } catch (error) {
      alert("something went wrong.Try again later");
    }
  };

  return (
    <Modal
      open={schoolValue === "others"}
      onClose={() => setValues((v) => ({ ...v, school: "" }))}
    >
      <Box sx={style}>
        <Typography mb={3} variant="h4">
          Add School
        </Typography>
        <Formik
          initialValues={{ place: "", schoolName: "" }}
          onSubmit={handleAddSchool}
          validationSchema={addSchoolSchema}
        >
          {({ values, handleBlur, handleChange, errors, touched }) => (
            <Form>
              <Stack gap={2}>
                <TextField
                  id="place"
                  name="place"
                  value={values.place}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.place && Boolean(errors.place)}
                  helperText={touched.place && errors.place}
                  type="text"
                  label="Place or City"
                  fullWidth
                  placeholder="tambaram"
                />
                <TextField
                  id="schoolName"
                  name="schoolName"
                  value={values.schoolName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.schoolName && Boolean(errors.schoolName)}
                  helperText={touched.schoolName && errors.schoolName}
                  type="text"
                  label="School Name"
                  fullWidth
                  placeholder="Govt Matric Hr Sec school"
                />
                <Button type="submit" variant="contained" fullWidth>
                  Add school
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddSchoolForm;
