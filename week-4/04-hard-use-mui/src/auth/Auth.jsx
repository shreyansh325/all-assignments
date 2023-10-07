import { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import Loading from "../components/Common/Loading";
import { useRecoilState } from "recoil";
import {
  isAdminSelector,
  tokenSelector,
  usernameSelector,
} from "../store/selectors/user";
import PropTypes from "prop-types";

function Auth({ Component }) {
  const [token, setToken] = useRecoilState(tokenSelector);
  const [username, setUsername] = useRecoilState(usernameSelector);
  const [isAdmin, setIsAdmin] = useRecoilState(isAdminSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const authenticate = async () => {
    setIsLoading(true);

    if (token == null || username == null || isAdmin == null) {
      const localToken = localStorage.getItem("token");
      const localUsername = localStorage.getItem("username");
      const localIsAdmin = localStorage.getItem("isAdmin");
      if (localToken && localIsAdmin && localUsername) {
        setToken(localToken);
        setUsername(localUsername);
        setIsAdmin(localIsAdmin === "true");
      }
      setIsLoading(false);
      return;
    }
    try {
      await axios.get(
        "http://localhost:3000/" + (isAdmin ? "admin" : "user") + "/me",
        {
          headers: { Authorization: "bearer " + token, username },
        }
      );
      setIsAuth(true);
    } catch (error) {
      setIsAuth(false);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    authenticate();
  }, [token, isAdmin]);

  if (isLoading) return <Loading />;

  if (!isAuth) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant={"h6"} component={"div"}>
          Sign in or Sign up to view.
        </Typography>
      </div>
    );
  }

  return <Component />;
}

Auth.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default Auth;
