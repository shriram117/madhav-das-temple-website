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
        // Your existing JSX
    );
}

export default Login;