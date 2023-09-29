import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin(props) {
  const { isAdmin } = props;

  const [newUsername, setNewUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/" + (isAdmin ? "admin" : "user") + "/login",
        {},
        {
          headers: {
            username: newUsername,
            password,
          },
        }
      )
      .then((res) => {
        const token = res.data ? res.data.token : null;
        localStorage.setItem("token", token);
        localStorage.setItem("username", newUsername);
        navigate(isAdmin ? "/admin" : "/user");
      })
      .catch((err) => {
        console.log("Login error: " + err);
      });
  };

  return (
    <div>
      <h1>Sign in as {isAdmin ? "Admin" : "User"}</h1>
      <br />
      <form onSubmit={loginHandler}>
        Username:
        <input type={"text"} onChange={(e) => setNewUsername(e.target.value)} />
        <br />
        Password:
        <input
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type={"submit"}>Signin</button>
      </form>
      <br />
      New here? <a href={(isAdmin ? "/admin" : "/user") + "/signup"}>Signup</a>
    </div>
  );
}

export default Signin;
