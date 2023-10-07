import { Container, Typography } from "@mui/material";

function NotFound() {
  return (
    <Container maxWidth="sm" style={{ marginTop: "20%", marginBottom: "20%" }}>
      <Typography variant={"h3"} align={"center"}>
        404 - Not Found
      </Typography>
      <Typography variant={"h6"} align={"center"}>
        The page you are looking for does not exist.
      </Typography>
    </Container>
  );
}

export default NotFound;
