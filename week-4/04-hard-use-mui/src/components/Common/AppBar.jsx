import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { usernameSelector } from "../../store/selectors/user";

function ButtonAppBar() {
  const username = useRecoilValue(usernameSelector);
  return (
    <AppBar position={"static"}>
      <Toolbar>
        <Typography
          variant={"h6"}
          component={Link}
          sx={{ flexGrow: 1 }}
          to={"/"}
          style={{ color: "white" }}
        >
          Coursera
        </Typography>
        {username ? <UserButtons username={username} /> : <GuestButtons />}
      </Toolbar>
    </AppBar>
  );
}

function UserButtons({ username }) {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant={"h6"} component={"div"} sx={{ flexGrow: 1 }}>
        Hi {username}!
      </Typography>
      <Button
        color={"inherit"}
        onClick={() => {
          navigate("/signout");
        }}
      >
        Signout
      </Button>
    </>
  );
}

UserButtons.propTypes = {
  username: PropTypes.string,
};

function GuestButtons() {
  const navigate = useNavigate();

  return (
    <>
      <Button color={"inherit"} onClick={() => navigate("/")}>
        Signin / Signup
      </Button>
    </>
  );
}

export default ButtonAppBar;
