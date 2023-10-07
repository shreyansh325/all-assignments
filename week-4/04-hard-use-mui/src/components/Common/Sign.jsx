import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useSetRecoilState } from "recoil";
import {
  isAdminSelector,
  tokenSelector,
  usernameSelector,
} from "../../store/selectors/user";

function Sign({ authUrl, title, buttonText, isAdmin }) {
  const setToken = useSetRecoilState(tokenSelector);
  const setUsernameSelector = useSetRecoilState(usernameSelector);
  const setIsAdmin = useSetRecoilState(isAdminSelector);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        authUrl,
        {},
        {
          headers: {
            username,
            password,
          },
        }
      )
      .then((res) => {
        const token = res.data.token;
        setToken(token);
        localStorage.setItem("token", token);
        setUsernameSelector(username);
        localStorage.setItem("username", username);
        setIsAdmin(isAdmin);
        localStorage.setItem("isAdmin", isAdmin);
        navigate("..");
      })
      .catch((err) => {
        console.log("Sign error: " + err);
      });
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        minHeight: "40vw",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            {" "}
            {title}{" "}
          </Typography>
          <form onSubmit={signHandler}>
            <TextField
              label="Username"
              fullWidth
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              fullWidth
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "20px" }}
            >
              {buttonText}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

Sign.propTypes = {
  authUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

const baseUrl = "http://localhost:3000";
const admin = "admin";
const user = "user";
const signin = "login";
const signup = "signup";

function Signin({ isAdmin }) {
  const authUrl = baseUrl + "/" + (isAdmin ? admin : user) + "/" + signin;
  const title = "Sign in as " + (isAdmin ? admin : user);
  const buttonText = "Sign in";
  return (
    <Sign
      authUrl={authUrl}
      title={title}
      buttonText={buttonText}
      isAdmin={isAdmin}
    />
  );
}

function Signup({ isAdmin }) {
  const authUrl = baseUrl + "/" + (isAdmin ? admin : user) + "/" + signup;
  const title = "Sign up as " + (isAdmin ? admin : user);
  const buttonText = "Sign up";
  return (
    <Sign
      authUrl={authUrl}
      title={title}
      buttonText={buttonText}
      isAdmin={isAdmin}
    />
  );
}

Signup.propTypes = Signin.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export { Signin, Signup };
