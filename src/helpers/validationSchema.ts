import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const newAdmissionSchema = Yup.object({
  firstname: Yup.string().required("This field is required"),
  lastname: Yup.string().required("This field is required"),
  dob: Yup.date().required("This field is required"),
  standard: Yup.string().required("This field is required"),
  school: Yup.string(),
  gender: Yup.string().required("This field is required"),
  subjects: Yup.string().required("This field is required"),
  optional_class: Yup.string().when("class", {
    is: "others",
    then: Yup.string().required("This field is required"),
  }),
  mobile_no: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("This field is required"),
  alternative_no: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  fees: Yup.number()
    .moreThan(0, "Fees must be greater than zero")
    .required("This field is required"),
  date_of_join: Yup.date().required("This field is required"),
  address: Yup.object({
    plot_no: Yup.string().required("This field is required"),
    street: Yup.string().required("This field is required"),
    area: Yup.string().required("This field is required"),
    pincode: Yup.string()
      .matches(phoneRegExp, "pincode is invalid")
      .required("This field is required"),
  }),
});

export const feesSchema = Yup.object({
  fees: Yup.number().moreThan(0, "minimum amount required").required("This field is required"),
});

export const facultySchema = Yup.object({
  username: Yup.string().required("This field is required"),
  dob: Yup.date().required("This field is required"),
  gender: Yup.string().required("This field is required"),
  designation: Yup.string().required("This field is required"),
  salary: Yup.number().required("This field is required"),
  experience_in_years: Yup.number().required("This field is required"),
  mobile_no: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("This field is required"),
  date_of_join: Yup.date().required("This field is required"),
  address: Yup.object({
    plot_no: Yup.string().required("This field is required"),
    street: Yup.string().required("This field is required"),
    area: Yup.string().required("This field is required"),
    pincode: Yup.string()
      .matches(phoneRegExp, "pincode is invalid")
      .required("This field is required"),
  }),
});

export const addSchoolSchema = Yup.object({
  place: Yup.string().required("This field is required"),
  schoolName: Yup.string().required("This field is required"),
});
