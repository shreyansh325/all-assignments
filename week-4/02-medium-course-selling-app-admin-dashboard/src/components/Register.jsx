import { useState } from "react";
import axios from "axios";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register(props) {
    const {setUsername} = props;
    const [newUsername, setNewUsername] = useState("");
    const [password, setPassword] = useState("");

    const signupHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:3000/admin/signup', {}, {headers: {
            username: newUsername,
            password
        }})
        .then( res => {
            let token = res.data?res.data.token:null;
            if(!token){
                console.log("Signup failed! Response: "+JSON.stringify(res));
                return;
            }
            localStorage.setItem("token", token);
            localStorage.setItem("username", newUsername);
            setUsername(newUsername);
            window.location = "/";
        })
        .catch( err => {
            console.log("Signup error: "+err);
        });
    };

    return <div>
        <h1>Register to the website</h1>
        <br/>
        <form onSubmit={signupHandler}>
            Username:
            <input type={"text"} onChange={e => setNewUsername(e.target.value)} />
            <br/>
            Password:
            <input type={"password"} onChange={e => setPassword(e.target.value)} />
            <br/>
            <button type={"submit"}>Signup</button>
        </form>
        <br/>
        <br/>
        Already a user? <a href="/login">Login</a>
    </div>
}

export default Register;