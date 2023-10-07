import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Common/Loading";
import {
  Typography,
  Container,
  Card,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import { tokenSelector } from "../../store/selectors/user";

function EditCourse() {
  const token = useRecoilValue(tokenSelector);
  const [isLoading, setIsLoading] = useState(false);
  const { courseId } = useParams();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [published, setPublished] = useState();

  useEffect(() => {
    if (!courseId) {
      console.log("missing courseId");
      return;
    }
    setIsLoading(true);
    axios
      .get("http://localhost:3000/admin/courses/" + courseId, {
        headers: { Authorization: "bearer " + token },
      })
      .then((res) => {
        let course = res.data;
        setTitle(course.title);
        setDescription(course.description);
        setPublished(course.published);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [token, courseId]);

  const editCourseHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);

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
            authorization: "bearer " + token,
          },
        }
      )
      .then(() => {
        alert("Course updated!");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Container
        style={{
          minHeight: "800px",
          display: "flex",
          flexDirection: "column",
          maxWidth: "40vw",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h4"} align={"center"} component={"div"}>
          Edit Course Page
        </Typography>
        <Divider style={{ margin: "5%" }} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card
            component={"form"}
            onSubmit={editCourseHandler}
            sx={{ maxWidth: 345 }}
          >
            <CardMedia sx={{ height: 200 }} image="/src/assets/HTML5.png" />
            <CardContent>
              <TextField
                label={"Title"}
                defaultValue={title}
                variant="standard"
                style={{ width: "100%", marginTop: "4%" }}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label={"Description"}
                defaultValue={description}
                variant="standard"
                style={{ width: "100%", marginTop: "4%" }}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
              />
              <FormGroup
                component={"div"}
                style={{ width: "100%", marginTop: "4%" }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                    />
                  }
                  label={"Published"}
                />
              </FormGroup>
              <Button type="submit" style={{ width: "100%", marginTop: "4%" }}>
                Update Course
              </Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  );
}

export default EditCourse;
