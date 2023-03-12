import { AlertColor } from "@mui/material";

export interface IStudentFormData {
  firstname: string;
  lastname: string;
  dob: string;
  mobile_no: string;
  gender: string;
  alternative_no: string;
  school: string;
  standard: string;
  group?: string;
  board: string;
  optional_class: string;
  date_of_join: string;
  fees: string;
  subjects: string;
  address: {
    plot_no: string;
    street: string;
    area: string;
    pincode: string;
  };
}

export interface IStudent {
  _id: string;
  firstname: string;
  lastname: string;
  gender: "male" | "female" | "others";
  dob: string;
  mobile_no: number;
  alternative_no: number;
  school: string;
  standard: string;
  optional_class: string;
  board: string;
  fees: number;
  date_of_join: string;
  address: {
    plot_no: string;
    street: string;
    area: string;
    pincode: number;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
  subjects: string[];
}

export interface IFeesType {
  student_id: IStudent;
  fees: number;
  month: string;
  year: number;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export interface IFacultyFormData {
  username: string;
  mobile_no: number;
  date_of_join: string;
  address: {
    plot_no?: number;
    street?: string;
    area?: string;
    pincode?: number;
  };
  gender: string;
  dob: string;
  designation: string;
  salary: number;
  experience_in_years: number;
}

export interface IFaculty {
  _id: string;
  username: string;
  mobile_no: number;
  date_of_join: string;
  address: {
    plot_no?: number;
    street?: string;
    area?: string;
    pincode?: number;
  };
  gender: string;
  dob: string;
  designation: string;
  salary: number;
  experience_in_years: number;
}

export interface IDashboardData {
  totalFaculties: number;
  totalStudents: number;
}

export interface ISchoolData {
  place: string;
  schoolList: string[];
}

export type ISnackBar = {
  isOpen: boolean;
  message: string;
  autoHideDuration: number;
  severity: AlertColor;
};

export type IUnpaidStudentsData = {
  _id: string;
  firstname: string;
  lastname: string;
  gender: string;
  dob: string;
  mobile_no: number;
  alternative_no: number;
  standard: string;
  fees: number;
  optional_class: string;
  school: string;
  board: string;
  subjects: string[];
  date_of_join: string;
  address: {
    plot_no: string;
    street: string;
    area: string;
    pincode: number;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
  feesDetails: null;
};

export type IClass = {
  _id: string;
  class: string;
  subject: [
    {
      subjectName: string;
      chapter: [
        {
          chapterNo: string;
          questionType: string[];
        }
      ];
    }
  ];
};

export type ISection = {
  standard: string;
  chapterNo: string;
  title: string;
  sections: [
    {
      questions: string[];
      matchQuestions: string[];
      option: string[];
    }
  ];
  _id: string;
};

export type ISectionForThree = {
  standard: string;
  chapterNo?: string;
  title?: string;
  subject?: string;
};

export type IResult = {
  _id: string;
  registerNumber: string;
  studentName: string;
  group: string;
  standard: string;
  testName: string;
  subject: [
    {
      subjectName: string;
      theory: string;
      havePractical: boolean;
      practical: string;
    }
  ];
};
