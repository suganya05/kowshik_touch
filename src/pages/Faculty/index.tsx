import React from "react";
import { Route, Routes } from "react-router-dom";
import AddFaculty from "./AddFaculty";
import EditFaculty from "./EditFaculty";
import Faculty from "./Faculty";

const FacultyIndex = () => {
  return (
    <Routes>
      <Route index element={<Faculty />} />
      <Route path="/add" element={<AddFaculty />} />
      <Route path="/edit/:id" element={<EditFaculty />} />
    </Routes>
  );
};

export default FacultyIndex;
