import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import "../../css/Login.css";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async () => {

        try {

            const response = await axios.post(
                `${API_BASE_URL}/auth/login`,
                {
                    username,
                    password
                }
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/dashboard");

        }
        catch (err) {

            alert("Invalid Username or Password");

        }

    };

    return (

        <div className="login-container">

            <div className="login-box">

                <h2>🛕 Temple Admin Login</h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={login}>
                    Login
                </button>

            </div>

        </div>

    );

}

export default Login;