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

    // =====================================
    // PERMISSIONS
    // =====================================

    const permissionList = [
        {
            key: "dashboard",
            label: "Dashboard"
        },
        {
            key: "gallery",
            label: "Gallery"
        },
        {
            key: "events",
            label: "Events"
        },
        {
            key: "donations",
            label: "Donations"
        },
        {
            key: "aarti",
            label: "Daily Aarti"
        },
        {
            key: "services",
            label: "Temple Services"
        },
        {
            key: "notice",
            label: "Notice Board"
        },
        {
            key: "members",
            label: "Members"
        },
        {
            key: "news",
            label: "News"
        },
        {
            key: "users",
            label: "Users"
        },
        {
            key: "settings",
            label: "Settings"
        }
    ];

    const [permissions, setPermissions] = useState({});


    // =====================================
    // DEFAULT PERMISSIONS
    // =====================================

    const createEmptyPermissions = () => {

        const result = {};

        permissionList.forEach((item) => {

            result[item.key] = false;

        });

        return result;

    };


    // =====================================
    // LOAD EDIT DATA
    // =====================================

    useEffect(() => {

        if (editData) {

            setUserId(editData.user_id);

            setFullName(
                editData.full_name || ""
            );

            setUsername(
                editData.username || ""
            );

            setEmail(
                editData.email || ""
            );

            setMobileNo(
                editData.mobile_no || ""
            );

            setRole(
                editData.role || "Admin"
            );

            setStatus(
                editData.status
            );

            // Don't load password while editing
            setPassword("");


            // Load permissions
            setPermissions({
                ...createEmptyPermissions(),
                ...(editData.permissions || {})
            });

        } else {

            setUserId(0);

            setFullName("");

            setUsername("");

            setEmail("");

            setMobileNo("");

            setPassword("");

            setRole("Admin");

            setStatus(true);

            setPermissions(
                createEmptyPermissions()
            );

        }

    }, [editData]);


    // =====================================
    // PERMISSION CHANGE
    // =====================================

    const handlePermissionChange = (key) => {

        setPermissions((previous) => ({

            ...previous,

            [key]: !previous[key]

        }));

    };


    // =====================================
    // SELECT ALL
    // =====================================

    const selectAllPermissions = () => {

        const allPermissions = {};

        permissionList.forEach((item) => {

            allPermissions[item.key] = true;

        });

        setPermissions(allPermissions);

    };


    // =====================================
    // CLEAR ALL
    // =====================================

    const clearAllPermissions = () => {

        setPermissions(
            createEmptyPermissions()
        );

    };


    // =====================================
    // SAVE USER
    // =====================================

    const saveUser = async () => {

        if (fullName.trim() === "") {

            alert("Please enter Full Name");

            return;

        }


        if (username.trim() === "") {

            alert("Please enter Username");

            return;

        }


        if (
            userId === 0 &&
            password.trim() === ""
        ) {

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

            status: status,

            permissions: permissions

        };


        console.log(
            "User Data:",
            data
        );


        try {

            if (userId === 0) {

                await axios.post(
                    `${API_BASE_URL}/users`,
                    data
                );

                alert(
                    "User Added Successfully"
                );

            } else {

                await axios.put(
                    `${API_BASE_URL}/users/${userId}`,
                    data
                );

                alert(
                    "User Updated Successfully"
                );

            }


            await loadUsers();

            closeForm();

        }
        catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Save Failed"
            );

        }

    };


    // =====================================
    // UI
    // =====================================

    return (

        <div className="card mb-4">

            <div className="card-header">

                <h4>
                    {userId === 0
                        ? "👤 Add User"
                        : "✏ Edit User"}
                </h4>

            </div>


            <div className="card-body">


                {/* =================================
                    USER INFORMATION
                ================================= */}

                <div className="row">


                    <div className="col-md-6 mb-3">

                        <label>
                            Full Name
                        </label>

                        <input
                            className="form-control"
                            value={fullName}
                            onChange={(e) =>
                                setFullName(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    <div className="col-md-6 mb-3">

                        <label>
                            Username
                        </label>

                        <input
                            className="form-control"
                            value={username}
                            onChange={(e) =>
                                setUsername(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    <div className="col-md-6 mb-3">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    <div className="col-md-6 mb-3">

                        <label>
                            Mobile Number
                        </label>

                        <input
                            className="form-control"
                            value={mobileNo}
                            onChange={(e) =>
                                setMobileNo(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    <div className="col-md-6 mb-3">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            placeholder={
                                userId > 0
                                    ? "Leave blank to keep current password"
                                    : ""
                            }
                        />

                    </div>


                    <div className="col-md-3 mb-3">

                        <label>
                            Role
                        </label>

                        <select
                            className="form-select"
                            value={role}
                            onChange={(e) =>
                                setRole(
                                    e.target.value
                                )
                            }
                        >

                            <option value="Admin">
                                Admin
                            </option>

                            <option value="Super Admin">
                                Super Admin
                            </option>

                        </select>

                    </div>


                    <div className="col-md-3 mb-3">

                        <label>
                            Status
                        </label>

                        <select
                            className="form-select"
                            value={status}
                            onChange={(e) =>
                                setStatus(
                                    e.target.value === "true"
                                )
                            }
                        >

                            <option value="true">
                                Active
                            </option>

                            <option value="false">
                                Inactive
                            </option>

                        </select>

                    </div>

                </div>


                {/* =================================
                    PERMISSIONS
                ================================= */}

                <div className="mt-4">

                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <h5 className="mb-0">
                            🔐 Page Permissions
                        </h5>


                        <div>

                            <button
                                type="button"
                                className="btn btn-sm btn-outline-success me-2"
                                onClick={
                                    selectAllPermissions
                                }
                            >
                                Select All
                            </button>


                            <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                onClick={
                                    clearAllPermissions
                                }
                            >
                                Clear All
                            </button>

                        </div>

                    </div>


                    <div
                        className="border rounded p-3"
                        style={{
                            background: "#fafafa"
                        }}
                    >

                        <div className="row">

                            {
                                permissionList.map(
                                    (item) => (

                                        <div
                                            className="col-md-4 col-lg-3 mb-3"
                                            key={item.key}
                                        >

                                            <div className="form-check">

                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id={`permission-${item.key}`}
                                                    checked={
                                                        permissions[
                                                        item.key
                                                        ] || false
                                                    }
                                                    onChange={() =>
                                                        handlePermissionChange(
                                                            item.key
                                                        )
                                                    }
                                                />

                                                <label
                                                    className="form-check-label"
                                                    htmlFor={`permission-${item.key}`}
                                                >

                                                    {item.label}

                                                </label>

                                            </div>

                                        </div>

                                    )
                                )
                            }

                        </div>

                    </div>

                </div>


                {/* =================================
                    SAVE
                ================================= */}

                <div className="mt-4">

                    <button
                        className="btn btn-success me-2"
                        onClick={saveUser}
                    >

                        {userId === 0
                            ? "Save User"
                            : "Update User"}

                    </button>


                    <button
                        className="btn btn-secondary"
                        onClick={closeForm}
                    >

                        Cancel

                    </button>

                </div>

            </div>

        </div>

    );

}

export default UserForm;