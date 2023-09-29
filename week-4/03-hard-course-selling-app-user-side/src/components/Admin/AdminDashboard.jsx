import React from "react";

/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function AdminDashboard(props) {
  let { username, setUsername, isAdmin } = props;

  let buttons;
  if (username) {
    buttons = (
      <>
        <h3>Hi {username} !</h3>
        <a
          onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            setUsername(null);
            window.location = "/";
          }}
          href="#"
        >
          Logout
        </a>
      </>
    );
  } else {
    buttons = (
      <>
        <a href="/register">Register</a>
        <a href="/login">Login</a>
      </>
    );
  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Coursera</h1>
        {buttons}
      </div>
      <h2> Welcome to Coursera!</h2>
      <h4>As an admin you can do following: </h4>
      <div>
        <a
          onClick={(e) => {
            e.preventDefault();
            window.location = "/courses";
          }}
          href="#"
        >
          Browse and edit courses
        </a>
      </div>
      <div>
        <a
          onClick={(e) => {
            e.preventDefault();
            window.location = "/create";
          }}
          href="#"
        >
          Create course
        </a>
      </div>
    </div>
  );
}

export default AdminDashboard;
