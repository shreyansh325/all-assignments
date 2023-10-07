import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Loading from "./Loading";
import { useSetRecoilState } from "recoil";
import userState from "../../store/atoms/user";

function Signout() {
  const setUser = useSetRecoilState(userState);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    localStorage.removeItem("token");
    setUser(null);
    setTimeout(setIsLoading, 1000, false);
  }, [setUser]);

  if (isLoading) return <Loading />;

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
      <Typography variant={"h5"} align={"center"}>
        You have been signed out!
      </Typography>
    </Container>
  );
}

export default Signout;
