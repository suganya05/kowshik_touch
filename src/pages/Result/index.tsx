import React from "react";
import { Route, Routes } from "react-router-dom";
import AllResult from "./AllResult";
import EditResult from "./EditResult";

const Result = () => {
  return (
    <Routes>
      <Route index element={<AllResult />} />
      <Route path="/edit/:registerNumber" element={<EditResult />} />
    </Routes>
  );
};

export default Result;
