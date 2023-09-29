import React from "react";
import AppRoutes from "./routes";

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;
