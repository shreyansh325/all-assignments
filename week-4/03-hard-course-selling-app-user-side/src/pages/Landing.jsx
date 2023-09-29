import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <div style={{ margin: "auto", width: 300 }}>
        <h1>
          Become Creator?
          <Link to="admin/signup"> Sign up </Link>
        </h1>
        <br />
        <h1>
          Already a Creator?
          <Link to="admin/signin"> Sign in </Link>
        </h1>
      </div>
      <div style={{ margin: "auto", width: 300 }}>
        <br/>
        <h1>Or</h1>
        <br/>
      </div>
      <div style={{ margin: "auto", width: 300 }}>
        <h1>
          Become Learner?
          <Link to="user/signup"> Sign up </Link>
        </h1>
        <br />
        <h1>
          Already a Learner?
          <Link to="user/signin"> Sign in </Link>
        </h1>
      </div>
    </div>
  );
}

export default Landing;
