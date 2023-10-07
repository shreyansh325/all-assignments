import axios from "axios";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Loading from "../Common/Loading";
import {
  Typography,
  Container,
  Divider,
  List,
  ListItemButton,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import { tokenSelector } from "../../store/selectors/user";

function Purchases() {
  const token = useRecoilValue(tokenSelector);
  const [isLoading, setIsLoading] = useState(true);
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3000/user/purchasedCourses", {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setPurchasedCourses(res.data.purchasedCourses);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  }, [token]);

  if (isLoading) return <Loading />;

  return (
    <Container
      style={{
        minHeight: "800px",
        display: "flex",
        flexDirection: "column",
        maxWidth: "40vw",
        justifyContent: "center",
      }}
    >
      <Typography variant={"h4"}>Courses purchased:</Typography>
      <List>
        {purchasedCourses.map((c) => (
          <div key={c._id}>
            <Item title={c.title} description={c.description} isAdmin={false} />
            <Divider />
          </div>
        ))}
      </List>
    </Container>
  );
}

function Item({ title }) {
  return <ListItemButton>{title}</ListItemButton>;
}

Item.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Purchases;
