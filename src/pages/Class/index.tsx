import React from "react";
import { Route, Routes } from "react-router-dom";

import "./Class.css";
import ClassById from "./ClassById";
import ClassPage from "./ClassPage";

const Class = () => {
  return (
    <Routes>
      <Route index element={<ClassPage />} />
      <Route path=":classId" element={<ClassById />} />
    </Routes>
  );
};

export default Class;
