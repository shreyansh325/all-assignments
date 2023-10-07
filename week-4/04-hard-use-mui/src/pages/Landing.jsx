import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <Grid container sx={{ height: "80%" }}>
      <Grid container item sx={{ height: "50%" }}>
        <Grid
          item
          md={6}
          sx={{
            padding: "1%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant={"h2"} sx={{ margin: "1%" }}>
            Create and reach millions
          </Typography>

          <Typography variant={"h5"} sx={{ margin: "1%" }}>
            Become a content creator and teach millions of learners across the
            world.
          </Typography>

          <Button
            variant={"contained"}
            component={Link}
            sx={{ margin: "1%" }}
            size={"large"}
            to={"/admin/signup"}
          >
            Sign up as creator
          </Button>
          <Button
            variant={"outlined"}
            component={Link}
            sx={{ margin: "1%" }}
            size={"large"}
            to={"/admin/signin"}
          >
            Sign in as creator
          </Button>
        </Grid>
        <Grid item md={6} sx={{ padding: "1%" }}>
          <img
            src="/src/assets/creator.jpg"
            alt="Creator"
            style={{ height: "100%", width: "100%" }}
          />
        </Grid>
      </Grid>
      <Grid container item sx={{ height: "50%" }}>
        <Grid item md={6} sx={{ padding: "1%" }}>
          <img
            src="/src/assets/learner.jpg"
            alt="Creator"
            style={{ height: "100%", width: "100%" }}
          />
        </Grid>
        <Grid
          item
          md={6}
          sx={{
            padding: "1%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant={"h2"} sx={{ margin: "1%" }}>
            Be the best among the best
          </Typography>

          <Typography variant={"h5"} sx={{ margin: "1%" }}>
            Become part of the worldwide student community of Coursera and learn
            from the most passionate teachers across the globe.
          </Typography>

          <Button
            variant={"contained"}
            component={Link}
            sx={{ margin: "1%" }}
            size={"large"}
            to={"/user/signup"}
          >
            Sign up as student
          </Button>
          <Button
            variant={"outlined"}
            component={Link}
            sx={{ margin: "1%" }}
            size={"large"}
            to={"/user/signin"}
          >
            Sign in as student
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Landing;
