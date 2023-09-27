import { useState } from "react";
import axios from "axios";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login(props) {
    const {setUsername} = props;
    const [newUsername, setNewUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:3000/admin/login', {}, {headers: {
            username: newUsername,
            password
        }})
        .then( res => {
            const token = res.data?res.data.token:null;
            if(!token){
                console.log("Login failed! Response: "+JSON.stringify(res));
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                setUsername(undefined);
                return;
            }
            localStorage.setItem("token", token);
            localStorage.setItem("username", newUsername);
            setUsername(newUsername);
            window.location = "/";
        })
        .catch( err => {
            console.log("Login error: "+err);
        });
    };

    return <div>
        <h1>Login to admin dashboard</h1>
        <br/>
        <form onSubmit={loginHandler}>
            Username:
            <input type={"text"} onChange={e => setNewUsername(e.target.value)} />
            <br/>
            Password:
            <input type={"password"} onChange={e => setPassword(e.target.value)} />
            <br/>
            <button type={"submit"}>Login</button>
        </form>
        <br/>
        New here? <a href="/register">Register</a>
        </div>

}

export default Login;