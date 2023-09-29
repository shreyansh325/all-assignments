import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UserDashboard from "../components/User/UserDashboard";
import Purchases from "../components/User/Purchases";

import Signin from "../components/Common/Signin";
import Signup from "../components/Common/Signup";
import { ShowCourses } from "../components/Common/ShowCourses";
import NotFound from "../components/Common/NotFound";

function UserRoutes() {
  return (
    <>
      <Routes>
        {/* user specific routes */}
        <Route path="/" element={<UserDashboard />} />
        <Route path="/purchases" element={<Purchases />} />
        {/* user routes using common components */}
        <Route path="/signin" element={<Signin isAdmin={false} />} />
        <Route path="/signup" element={<Signup isAdmin={false} />} />
        <Route path="/courses" element={<ShowCourses isAdmin={false} />} />
        {/* Page Not found */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default UserRoutes;
