import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Container, Divider, Typography } from "@mui/material";
import Loading from "./Loading";
import { useRecoilValue } from "recoil";
import { isAdminSelector, tokenSelector } from "../../store/selectors/user";

function ShowCourses() {
  const isAdmin = useRecoilValue(isAdminSelector);
  const token = useRecoilValue(tokenSelector);
  const [isLoading, setIsLoading] = React.useState(true);
  const [courses, setCourses] = React.useState([]);

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      axios
        .get(
          "http://localhost:3000/" + (isAdmin ? "admin" : "user") + "/courses",
          {
            headers: {
              Authorization: "bearer " + token,
            },
          }
        )
        .then((res) => {
          setCourses(res.data.courses);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [isAdmin, token]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Typography variant={"h4"} align={"center"} style={{ margin: "2%" }}>
        Courses
      </Typography>
      <Divider style={{ margin: "2vw" }} />
      <Container
        maxWidth="80hw"
        style={{
          minHeight: "40vw",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {courses.map((c) => (
          <div style={{ margin: 20 }} key={c._id}>
            <Course
              title={c.title}
              cid={c._id}
              description={c.description}
              published={c.published}
              adminView={isAdmin}
              token={token}
            />
          </div>
        ))}
      </Container>
    </>
  );
}

function Course({ title, description, published, adminView, cid, token }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image="/src/assets/HTML5.png" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}. Lizards are a widespread group of squamate reptiles,
          with over 6,000 species, ranging across all continents except
          Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        {adminView ? (
          <AdminActions cid={cid} isPublished={published} />
        ) : (
          <UserActions cid={cid} token={token} />
        )}
      </CardActions>
    </Card>
  );
}

Course.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  published: PropTypes.bool.isRequired,
  adminView: PropTypes.bool.isRequired,
  cid: PropTypes.string,
  token: PropTypes.string,
};

function AdminActions({ cid, isPublished }) {
  const published_text = isPublished ? "Published" : "Not published";
  return (
    <>
      <Button size={"small"} component={Link} to={"edit/" + cid}>
        Edit
      </Button>
      <Typography variant="caption" color={"grey"}>
        {published_text}
      </Typography>
    </>
  );
}

AdminActions.propTypes = {
  cid: PropTypes.string.isRequired,
  isPublished: PropTypes.bool.isRequired,
};

function UserActions({ cid, token }) {
  const [isLoading, setIsLoading] = React.useState(false);

  function buyClickHandler(e) {
    e.preventDefault();
    if (!cid) {
      console.log("props.cid not found. Can't execute buyClickHandler.");
      return;
    }
    if (!token) {
      console.log("props.token not found. Can't execute buyClickHandler.");
      return;
    }
    setIsLoading(true);
    axios
      .post(
        "http://localhost:3000/user/courses/" + cid,
        {},
        { headers: { Authorization: "bearer " + token } }
      )
      .then(() => {
        setIsLoading(false);
        alert("Course purchased!");
        e.target.setAttribute("disabled", "true");
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Course purchase failure!");
        console.log(err);
      });
  }
  if (isLoading) return <Loading />;
  return (
    <>
      <Button size={"small"} onClick={buyClickHandler}>
        Buy
      </Button>
    </>
  );
}

UserActions.propTypes = {
  cid: PropTypes.string,
  token: PropTypes.string,
};

export { ShowCourses, Course };
