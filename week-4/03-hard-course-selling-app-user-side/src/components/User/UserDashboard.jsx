import React from "react";
import { Link } from "react-router-dom";

function UserDashboard() {
  return (
    <div>
      <h1>Welcome user!</h1>
      <ul>
        <li>
          <Link to="courses">Browse Courses</Link>
        </li>
        <li>
          <Link to="purchases">Purchased Courses</Link>
        </li>
      </ul>
    </div>
  );
}

export default UserDashboard;
