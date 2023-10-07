import axios from "axios";
import { useState } from "react";
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

function CreateCourse() {
  const token = useRecoilValue(tokenSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);

  const createCourseHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios
      .post(
        "http://localhost:3000/admin/courses",
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
        setIsLoading(false);
        alert("Course created!");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Container
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          maxWidth: "40vw",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h4"} align={"center"} component={"div"}>
          Create Course Page
        </Typography>
        <Divider style={{ margin: "5%" }} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card
            component={"form"}
            onSubmit={createCourseHandler}
            sx={{ maxWidth: 345 }}
          >
            <CardMedia sx={{ height: 200 }} image="/src/assets/HTML5.png" />
            <CardContent>
              <TextField
                variant={"standard"}
                label={"Title"}
                type={"text"}
                onChange={(e) => setTitle(e.target.value)}
                component={"div"}
                style={{ width: "100%", marginTop: "2%" }}
              />
              <TextField
                variant={"standard"}
                label={"Description"}
                type={"text"}
                onChange={(e) => setDescription(e.target.value)}
                component={"div"}
                style={{ width: "100%", marginTop: "2%" }}
              />
              <FormGroup
                component={"div"}
                style={{ width: "100%", marginTop: "2%" }}
              >
                <FormControlLabel
                  control={<Checkbox />}
                  label={"Published"}
                  onChange={(e) => setPublished(e.target.checked)}
                />
              </FormGroup>
              <Button
                type="submit"
                style={{ width: "100%", marginTop: "2%" }}
                component={"div"}
              >
                Create Course
              </Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  );
}

export default CreateCourse;
