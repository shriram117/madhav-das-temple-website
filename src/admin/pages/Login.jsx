import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import "../../css/Login.css";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const login = async () => {

        if (!username.trim()) {

            alert("Please enter Username");
            return;

        }

        if (!password.trim()) {

            alert("Please enter Password");
            return;

        }


        try {

            setLoading(true);


            const response = await axios.post(

                `${API_BASE_URL}/auth/login`,

                {
                    username: username.trim(),
                    password: password
                }

            );


            if (response.data.success) {

                // =====================================
                // STORE USER + PERMISSIONS
                // =====================================

                localStorage.setItem(
                    "token",
                    response.data.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );


                console.log(
                    "Logged In User:",
                    response.data.user
                );


                const permissions = response.data.user.permissions;

                if (response.data.user.role === "Super Admin") {

                    navigate("/dashboard");

                } else if (permissions?.dashboard === true) {

                    navigate("/dashboard");

                } else if (permissions?.gallery === true) {

                    navigate("/admin/gallery");

                } else if (permissions?.events === true) {

                    navigate("/admin/events");

                } else if (permissions?.notice === true) {

                    navigate("/admin/notices");

                } else if (permissions?.aarti === true) {

                    navigate("/admin/aarti");

                } else if (permissions?.services === true) {

                    navigate("/admin/services");

                } else if (permissions?.members === true) {

                    navigate("/admin/members");
                } else if (permissions?.locations === true) {

                    navigate("/admin/locations");

                }
                } else if (permissions?.donations === true) {

                    navigate("/admin/donations");

                } else if (permissions?.users === true) {

                    navigate("/admin/users");

                } else if (permissions?.settings === true) {

                    navigate("/admin/settings");

                } else {

                    alert("No page permission assigned to this user.");

                }

            }

        //}
        catch (err) {

            console.error(
                "Login Error:",
                err
            );

            alert(
                err.response?.data?.message ||
                "Invalid Username or Password"
            );

        }
        finally {

            setLoading(false);

        }

    };


    // =====================================
    // ENTER KEY LOGIN
    // =====================================

    const handleKeyDown = (e) => {

        if (e.key === "Enter") {

            login();

        }

    };


    return (

        <div className="login-container">

            <div className="login-box">

                <h2>
                    🛕 Temple Admin Login
                </h2>


                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(
                            e.target.value
                        )
                    }
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                />


                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                />


                <button
                    onClick={login}
                    disabled={loading}
                >

                    {loading
                        ? "Logging in..."
                        : "Login"}

                </button>

            </div>

        </div>

    );

}

export default Login;