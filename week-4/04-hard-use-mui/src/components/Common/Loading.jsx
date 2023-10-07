import { Backdrop, CircularProgress, Container } from "@mui/material";

function Loading() {
  return (
    <Container
      maxWidth="80hw"
      style={{
        minHeight: "40vw",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}

export default Loading;
