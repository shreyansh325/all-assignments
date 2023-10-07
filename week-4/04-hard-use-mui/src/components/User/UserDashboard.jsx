import {
  Container,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function UserDashboard() {
  return (
    <Container
      style={{
        maxWidth: "50hw",
        minHeight: "40vw",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant={"h4"}>Welcome to Coursera!</Typography>
      <Divider style={{ marginTop: "2vh", marginBottom: "2vh" }} />
      <Typography variant={"h5"}>You can do following activities:</Typography>
      <List>
        <ListItemButton component={Link} to={"courses"}>
          <ListItemIcon>
            <TravelExploreIcon />
          </ListItemIcon>
          <ListItemText primary="Browse courses" />
        </ListItemButton>
        <ListItemButton component={Link} to={"purchases"}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Purchased course" />
        </ListItemButton>
      </List>
    </Container>
  );
}

export default UserDashboard;
