import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import {ShowCourses} from './components/ShowCourses';
import EditCourse from './components/EditCourse';
import { useEffect, useState } from 'react';
import axios from 'axios';

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [token, setToken] = useState(localStorage.getItem("token"));
    
    useEffect(() => {
      if(username && token){
        axios.get('http://localhost:3000/admin/me', {
            headers:{
                username: username,
                authorization: "bearer "+token
            }
        })
        .catch(err => {
            console.log("Login expired! "+ err);
            setUsername(null);
            localStorage.removeItem("username");
            setToken(null);
            localStorage.removeItem("token");
        })
      }
    }, []);

    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Landing
                username={username}
                setUsername={setUsername}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                username={username}
                setUsername={setUsername}
                token={token}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                username={username}
                setUsername={setUsername}
                token={token}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/create"
            element={<CreateCourse username={username} token={token} />}
          />
          <Route
            path="/course/:courseId"
            element={<EditCourse username={username} token={token} />}
          />
          <Route
            path="/courses"
            element={<ShowCourses username={username} token={token} />}
          />
        </Routes>
      </Router>
    );
}

export default App;