import React from "react";
import { Route, Routes } from "react-router-dom";
import AllStudents from "./AllStudents";
import EditStudent from "./EditStudent";

const Students = () => {
  return (
    <Routes>
      <Route index element={<AllStudents />} />
      <Route path="/edit/:id" element={<EditStudent />} />
    </Routes>
  );
};

export default Students;
