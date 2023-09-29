import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRoutes from "./userRoutes";
import AdminRoutes from "./adminRoutes";
import NotFound from "../components/Common/NotFound";
import Landing from "../pages/Landing";

function AppRoutes(props) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
