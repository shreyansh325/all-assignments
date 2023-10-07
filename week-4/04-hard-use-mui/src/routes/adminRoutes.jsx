import { Route, Routes } from "react-router-dom";

import AdminDashboard from "../components/Admin/AdminDashboard";
import CreateCourse from "../components/Admin/CreateCourse";
import EditCourse from "../components/Admin/EditCourse";

import { Signin, Signup } from "../components/Common/Sign";
import { ShowCourses } from "../components/Common/ShowCourses";
import NotFound from "../components/Common/NotFound";

import Auth from "../auth/Auth";

function AdminRoutes() {
  return (
    <>
      <Routes>
        {/* Admin specific routes */}
        <Route path="/" element={<Auth Component={AdminDashboard} />} />
        <Route path="/create" element={<Auth Component={CreateCourse} />} />
        <Route
          path="/courses/edit/:courseId"
          element={<Auth Component={EditCourse} />}
        />
        {/* Admin routes using common components */}
        <Route path="/signin" element={<Signin isAdmin={true} />} />
        <Route path="/signup" element={<Signup isAdmin={true} />} />
        <Route path="/courses" element={<Auth Component={ShowCourses} />} />
        {/* Page Not found */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AdminRoutes;
