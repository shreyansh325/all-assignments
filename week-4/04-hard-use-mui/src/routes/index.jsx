import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRoutes from "./userRoutes";
import AdminRoutes from "./adminRoutes";
import NotFound from "../components/Common/NotFound";
import Landing from "../pages/Landing";
import AppBar from "../components/Common/AppBar";
import Signout from "../components/Common/Signout";
import Footer from "../components/Common/Footer";
import { RecoilRoot } from "recoil";

function AppRoutes() {
  return (
    <div
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundColor: "whitesmoke",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <RecoilRoot>
        <Router>
          <AppBar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/user/*" element={<UserRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/signout" element={<Signout />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </RecoilRoot>
    </div>
  );
}

export default AppRoutes;
