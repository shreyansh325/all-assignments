import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ShowCourses(props) {
  const { username, isAdmin } = props;
  const [isLoading, setIsLoading] = React.useState(true);
  const [courses, setCourses] = React.useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(
          "http://localhost:3000/" + (isAdmin ? "admin" : "user") + "/courses",
          {
            headers: {
              username,
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
        });
    }
  }, []);

  if (isLoading)
    return <div style={{ justifyContent: "center" }}>Loading...</div>;

  // Add code to fetch courses from the server
  // and set it in the courses state variable.
  return (
    <>
      <h1>Courses: </h1>
      <hr />
      <br />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
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
            />
          </div>
        ))}
      </div>
    </>
  );
}

function Course(props) {
  const published = (
    <h4>{props.published ? "(published)" : "(not published)"}</h4>
  );

  return (
    <div
      style={{
        border: "2px black solid",
        padding: 5,
        margin: 5,
        width: 500,
      }}
    >
      <h3>{props.title}</h3>
      <hr></hr>
      {props.description}
      {props.adminView ? published : ""}
      {props.adminView ? (
        <EditButton cid={props.cid} />
      ) : (
        <BuyButton cid={props.cid} />
      )}
    </div>
  );
}

function EditButton(props) {
  return (
    <button onClick={editClickHandler} cid={props.cid}>
      Edit
    </button>
  );
}

function editClickHandler(e) {
  e.preventDefault();
  navigate = useNavigate();
  navigate(e.target.cid);
}

function BuyButton(props) {
  return (
    <button onClick={buyClickHandler} cid={props.cid}>
      Buy
    </button>
  );
}

function buyClickHandler(e) {
  e.preventDefault();
  axios
    .post(
      "http://localhost:3000/user/courses/" + e.target.getAttribute("cid"),
      {},
      { headers: { Authorization: "bearer " + localStorage.getItem("token") } }
    )
    .then((res) => {
      alert("Course purchased!");
      e.target.setAttribute("disabled", "true");
    })
    .catch((err) => {
      console.log(err);
    });
}

export { ShowCourses, Course };
