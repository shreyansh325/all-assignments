import { Container, Divider, ListItemIcon, Typography } from "@mui/material";
import { List, ListItemText, ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

function AdminDashboard() {
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
      <Typography variant={"h5"}>As an admin you can do following:</Typography>
      <List>
        <ListItemButton component={Link} to={"courses"}>
          <ListItemIcon>
            <TravelExploreIcon />
          </ListItemIcon>
          <ListItemText primary="Browse and edit courses" />
        </ListItemButton>
        <ListItemButton component={Link} to={"create"}>
          <ListItemIcon>
            <LibraryAddIcon />
          </ListItemIcon>
          <ListItemText primary="Create course" />
        </ListItemButton>
      </List>
    </Container>
  );
}

export default AdminDashboard;
