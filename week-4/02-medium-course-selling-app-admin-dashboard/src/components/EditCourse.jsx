import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Course } from "./ShowCourses";

function EditCourse(props) {
  const { username, token } = props;
  const { courseId } = useParams();
  
   const [title, setTitle] = useState();
   const [description, setDescription] = useState();
   const [published, setPublished] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/courses/" + courseId, {
        headers: { username, Authorization: "bearer " + token },
      })
      .then((res) => {
        let course = res.data;
        setTitle(course.title);
        setDescription(course.description);
        setPublished(course.published);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!title) {
    return <>Loading...</>;
  }

  const editCourseHandler = (event) => {
    event.preventDefault();
    axios
      .put(
        "http://localhost:3000/admin/courses/" + courseId,
        {
          title,
          description,
          published,
        },
        {
          headers: {
            username,
            authorization: "bearer " + token,
          },
        }
      )
      .then((res) => {
        alert("Course updated!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Edit Course Page</h1>
      <h2>Course Preview:</h2>
      <Course title={title} description={description} published={published} />
      <h2>Edit Course:</h2>
      <form onSubmit={editCourseHandler}>
        <div>
          Title:{" "}
          <input
            type={"text"}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          Description:{" "}
          <input
            type={"text"}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div>
          Published:{" "}
          <input
            type={"checkbox"}
            onChange={(e) => setPublished(e.target.checked)}
            checked={published}
          />
        </div>
        <br />
        <button type="submit">Update Course</button>
      </form>
    </div>
  );
}

export default EditCourse;
