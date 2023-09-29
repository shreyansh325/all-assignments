import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AuthUser(Component, isAdmin) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [username, setUsername] = React.useState(null);
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3000/" + (isAdmin ? "admin" : "user") + "/me", {
          headers: { Authorization: "bearer " + token },
        })
        .then((res) => {
          setUsername(res.data.username);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          navigate("/" + (isAdmin ? "admin" : "user") + "/signin");
        });
    }
  }, isLoading);

  if (isLoading)
    return (
      <div style={{ justifyContent: "center" }}>
        <h1>Loading...</h1>
      </div>
    );

  return <Component token={token} isAdmin={isAdmin} />;
}

export default AuthUser;
