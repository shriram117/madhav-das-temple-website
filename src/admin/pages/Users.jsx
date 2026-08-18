import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import UserForm from "../components/UserForm";
import API_BASE_URL from "../../config/api";

function Users() {

    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [permissionUser, setPermissionUser] = useState(null);
    const loadUsers = async () => {

        try {

            const response = await axios.get(
                `${API_BASE_URL}/users`
            );

            setUsers(response.data);

        }
        catch (err) {

            console.log(err);

            alert("Unable to load users.");

        }

    };

    const deleteUser = async (id) => {

        if (!window.confirm("Are you sure you want to delete this user?")) {

            return;

        }

        try {

            await axios.delete(`${API_BASE_URL}/users/${id}`);

            alert("User Deleted Successfully");

            await loadUsers();

        }
        catch (err) {

            console.log(err);

            alert("Delete Failed");

        }

    };

    useEffect(() => {

        loadUsers();

    }, []);

    const editUser = (item) => {

        setEditData(item);
        setShowForm(true);

    };

    return (

        <AdminLayout>

            <div className="d-flex justify-content-between mb-4">

                <h2>👥 User Management</h2>

                <button
                    className="btn btn-primary"
                    onClick={() => {

                        setEditData(null);
                        setShowForm(!showForm);

                    }}
                >
                    {showForm ? "Close Form" : "+ Add User"}
                </button>

            </div>

            {
                showForm && (

                    <UserForm
                        loadUsers={loadUsers}
                        editData={editData}
                        closeForm={() => {

                            setShowForm(false);
                            setEditData(null);

                        }}
                    />

                )
            }

            <table className="table table-bordered table-striped">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Permissions</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        users.map((item) => (

                            <tr key={item.user_id}>

                                <td>{item.user_id}</td>
                                <td>{item.full_name}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.mobile_no}</td>
                                <td>{item.role}</td>

                                <td>

                                    <button
                                        className="btn btn-info btn-sm me-2"
                                        onClick={() => setPermissionUser(item)}
                                    >
                                        Permissions
                                    </button>

                                </td>
                                <td>
                                    {
                                        item.status
                                            ? "Active"
                                            : "Inactive"
                                    }
                                </td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => editUser(item)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteUser(item.user_id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </AdminLayout>

    );

}

export default Users;