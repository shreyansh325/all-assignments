import { Route, Routes } from "react-router-dom";
import UserDashboard from "../components/User/UserDashboard";
import Purchases from "../components/User/Purchases";

import { Signin, Signup } from "../components/Common/Sign";
import { ShowCourses } from "../components/Common/ShowCourses";
import NotFound from "../components/Common/NotFound";

import Auth from "../auth/Auth";

function UserRoutes() {
  return (
    <>
      {" "}
      <Routes>
        {/* user specific routes */}
        <Route path="/" element={<Auth Component={UserDashboard} />} />
        <Route path="/purchases" element={<Auth Component={Purchases} />} />
        {/* user routes using common components */}
        <Route path="/signin" element={<Signin isAdmin={false} />} />
        <Route path="/signup" element={<Signup isAdmin={false} />} />
        <Route path="/courses" element={<Auth Component={ShowCourses} />} />
        {/* Page Not found */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default UserRoutes;
