import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";

function UserForm({ loadUsers, editData, closeForm }) {

    const [userId, setUserId] = useState(0);
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Admin");
    const [status, setStatus] = useState(true);

    useEffect(() => {

        if (editData) {

            setUserId(editData.user_id);
            setFullName(editData.full_name || "");
            setUsername(editData.username || "");
            setEmail(editData.email || "");
            setMobileNo(editData.mobile_no || "");
            setRole(editData.role || "Admin");
            setStatus(editData.status);

            // Don't load password while editing
            setPassword("");

        } else {

            setUserId(0);
            setFullName("");
            setUsername("");
            setEmail("");
            setMobileNo("");
            setPassword("");
            setRole("Admin");
            setStatus(true);

        }

    }, [editData]);

    const saveUser = async () => {

        if (fullName.trim() === "") {
            alert("Please enter Full Name");
            return;
        }

        if (username.trim() === "") {
            alert("Please enter Username");
            return;
        }

        if (userId === 0 && password.trim() === "") {
            alert("Please enter Password");
            return;
        }

        const data = {
            full_name: fullName,
            username: username,
            email: email,
            mobile_no: mobileNo,
            password: password,
            role: role,
            status: status
        };

        try {

            if (userId === 0) {

                await axios.post(`${API_BASE_URL}/users`, data);

                alert("User Added Successfully");

            } else {

                await axios.put(`${API_BASE_URL}/users/${userId}`, data);

                alert("User Updated Successfully");

            }

            await loadUsers();

            closeForm();

        }
        catch (err) {

            console.log(err);

            alert(err.response?.data?.message || "Save Failed");

        }

    };

    return (

        <div className="card mb-4">

            <div className="card-header">

                <h4>
                    {userId === 0 ? "👤 Add User" : "✏ Edit User"}
                </h4>

            </div>

            <div className="card-body">

                <div className="row">

                    <div className="col-md-6 mb-3">
                        <label>Full Name</label>
                        <input
                            className="form-control"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>Username</label>
                        <input
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>Mobile Number</label>
                        <input
                            className="form-control"
                            value={mobileNo}
                            onChange={(e) => setMobileNo(e.target.value)}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="col-md-3 mb-3">
                        <label>Role</label>
                        <select
                            className="form-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="Admin">Admin</option>
                            <option value="Super Admin">Super Admin</option>
                        </select>
                    </div>

                    <div className="col-md-3 mb-3">
                        <label>Status</label>
                        <select
                            className="form-select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value === "true")}
                        >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>

                </div>

                <button
                    className="btn btn-success"
                    onClick={saveUser}
                >
                    {userId === 0 ? "Save User" : "Update User"}
                </button>

            </div>

        </div>

    );

}

export default UserForm;