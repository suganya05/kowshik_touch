import axios from "axios";

// export const baseURL = "http://localhost:8001/api/v1";
// export const baseURL = "https://dehustle-backend-api.herokuapp.com/api/v1";
export const baseURL = "https://courageous-crab-skirt.cyclic.app/api/v1";

const API = axios.create({ baseURL });

export const createStudent = (formData: any) =>
  API.post("/student/create", formData);
export const updateStudent = (id: string, formData: any) =>
  API.patch(`/student/${id}`, formData);
export const createFaculty = (formData: any) =>
  API.post("/faculty/create", formData);
export const payFees = (formData: any) => API.post("/fees/pay", formData);
