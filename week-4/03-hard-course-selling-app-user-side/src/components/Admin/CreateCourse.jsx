import React from "react";
import axios from "axios";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse(props) {
    const {username} = props;
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [published, setPublished] = React.useState(false);

    const createCourseHandler = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3000/admin/courses",
        {
            title,
            description,
            published
        },
        {
            headers:{
                username,
                authorization: "bearer "+localStorage.getItem("token")
            }
        })
        .then(res => {
            alert("Course created!");
        })
        .catch(err=>console.log(err));
    };

    return <div>
        <h1>Create Course Page</h1>
        <form onSubmit={createCourseHandler}>
            <div>
                Title: <input type={"text"} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
                Description: <input type={"text"} onChange={e => setDescription(e.target.value)} />
            </div>
            <div>
                Published: <input type={"checkbox"} onChange={e => setPublished(e.target.checked)} />
            </div>
            <br/>
            <button type="submit">Create Course</button>
        </form>
    </div>
}
export default CreateCourse;