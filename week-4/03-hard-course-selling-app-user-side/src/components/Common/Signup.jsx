import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const { isAdmin } = props;
  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signupHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/" + (isAdmin ? "admin" : "user") + "/signup",
        {},
        {
          headers: {
            username: newUsername,
            password,
          },
        }
      )
      .then((res) => {
        let token = res.data ? res.data.token : null;
        localStorage.setItem("token", token);
        localStorage.setItem("username", newUsername);
        navigate(isAdmin ? "/admin" : "/user");
      })
      .catch((err) => {
        console.log("Signup error: " + err);
      });
  };

  return (
    <div>
      <h1>Sign up as {isAdmin ? "Admin" : "User"}</h1>
      <br />
      <form onSubmit={signupHandler}>
        Username:
        <input type={"text"} onChange={(e) => setNewUsername(e.target.value)} />
        <br />
        Password:
        <input
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type={"submit"}>Signup</button>
      </form>
      <br />
      <br />
      Already done?{" "}
      <a href={(isAdmin ? "/admin" : "/user") + "/signin"}>Signin</a>
    </div>
  );
}

export default Signup;
