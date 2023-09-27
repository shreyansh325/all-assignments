import axios from "axios";
import React, { useEffect } from "react";

function ShowCourses(props) {
  const { username } = props;
  const [courses, setCourses] = React.useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/courses", {
        headers: {
          username,
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourses(res.data.courses);
        console.log(res.data.courses);
      });
  }, []);

  // Add code to fetch courses from the server
  // and set it in the courses state variable.
  return (
    <>
    <h1>Courses: </h1>
    <hr />
    <br />
    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
      {courses.map((c) => (
        <div style={{margin:20}}>
          <Course title={c.title} key={c._id} description={c.description} published={c.published}/>
          <a href="#" onClick={e => {e.preventDefault(); window.location="/course/"+c._id}} >Edit</a>
        </div>
      ))}
    </div>
    </>
  );
}

function Course(props) {
  return (
    <div
      style={{ border: "2px black solid", padding: 5, margin: 5, width: 500 }}
    >
      <h3>{props.title}</h3>
      <hr></hr>
      {props.description}
      <h4>{props.published ? "(published)" : "(not published)"}</h4>
    </div>
  );
}

export { ShowCourses, Course };
