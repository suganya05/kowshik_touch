import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardFees from "./DashboardFees";

const Fees = () => {
  return (
    <Routes>
      <Route index element={<DashboardFees />} />
    </Routes>
  );
};

export default Fees;
