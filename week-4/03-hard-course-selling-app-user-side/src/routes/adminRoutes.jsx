import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "../components/Admin/AdminDashboard";
import CreateCourse from "../components/Admin/CreateCourse";
import EditCourse from "../components/Admin/EditCourse";

import Signin from "../components/Common/Signin";
import Signup from "../components/Common/Signup";
import { ShowCourses } from "../components/Common/ShowCourses";
import NotFound from "../components/Common/NotFound";

function AdminRoutes() {
  return (
    <>
      <Routes>
        {/* Admin specific routes */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/create" element={<CreateCourse />} />
        <Route path="/edit" element={<EditCourse />} />
        {/* Admin routes using common components */}
        <Route path="/signin" element={<Signin isAdmin={true} />} />
        <Route path="/signup" element={<Signup isAdmin={true} />} />
        <Route path="/courses" element={<ShowCourses isAdmin={true} />} />
        {/* Page Not found */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AdminRoutes;
