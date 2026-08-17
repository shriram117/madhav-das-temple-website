import AdminLayout from "../components/AdminLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Members.css";
import MemberForm from "../components/MemberForm";
import API_BASE_URL, {
    SERVER_URL
} from "../../config/api";

function Members() {

    const [members, setMembers] = useState([]);

    const [editData, setEditData] = useState(null);

    const [showForm, setShowForm] = useState(false);


    const loadMembers = async () => {

        try {

            const response = await axios.get(
                `${API_BASE_URL}/members`
            );

            setMembers(response.data);

        }
        catch (error) {

            console.error(
                "Load Members Error:",
                error
            );

            alert("Unable to load members.");

        }

    };


    const deleteMember = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this member?"
        );

        if (!confirmDelete) return;


        try {

            await axios.delete(
                `${API_BASE_URL}/members/${id}`
            );

            alert(
                "Member Deleted Successfully"
            );

            loadMembers();

        }
        catch (error) {

            console.error(
                "Delete Member Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Delete Failed"
            );

        }

    };


    const editMember = (item) => {

        setEditData(item);

        setShowForm(true);

    };


    useEffect(() => {

        loadMembers();

    }, []);


    return (

        <AdminLayout>

            <div className="members-page">


                {/* HEADER */}

                <div className="members-header">

                    <h2>
                        👥 Member Management
                    </h2>


                    <button
                        className="btn btn-primary"
                        onClick={() => {

                            setEditData(null);

                            setShowForm(!showForm);

                        }}
                    >

                        {
                            showForm
                                ? "Close Form"
                                : "+ Add Member"
                        }

                    </button>

                </div>


                {/* FORM */}

                {
                    showForm && (

                        <MemberForm

                            loadMembers={loadMembers}

                            editData={editData}

                            closeForm={() => {

                                setShowForm(false);

                                setEditData(null);

                            }}

                        />

                    )
                }


                {/* TABLE */}

                <div className="table-responsive">

                    <table className="table table-bordered table-striped">

                        <thead>

                            <tr>

                                <th>ID</th>

                                <th>Photo</th>

                                <th>Member Name</th>

                                <th>Designation</th>

                                <th>Mobile</th>

                                <th>Email</th>

                                <th>Status</th>

                                <th>Action</th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                members.map((item) => (

                                    <tr
                                        key={
                                            item.member_id
                                        }
                                    >

                                        <td>
                                            {item.member_id}
                                        </td>


                                        {/* PHOTO */}

                                        <td>

                                            {
                                                item.image_url ? (

                                                    <img

                                                        src={
                                                            item.image_url.startsWith(
                                                                "http"
                                                            )
                                                                ? item.image_url
                                                                : `${SERVER_URL}${item.image_url}`
                                                        }

                                                        alt={
                                                            item.member_name
                                                        }

                                                        width="70"

                                                        height="70"

                                                        style={{
                                                            objectFit:
                                                                "cover",

                                                            borderRadius:
                                                                "8px",

                                                            border:
                                                                "1px solid #ddd"
                                                        }}

                                                        onError={(
                                                            e
                                                        ) => {

                                                            e.target.style.display =
                                                                "none";

                                                        }}

                                                    />

                                                ) : (

                                                    <span>
                                                        👤
                                                    </span>

                                                )
                                            }

                                        </td>


                                        <td>
                                            {
                                                item.member_name
                                            }
                                        </td>


                                        <td>
                                            {
                                                item.designation ||
                                                "-"
                                            }
                                        </td>


                                        <td>
                                            {
                                                item.mobile_no ||
                                                "-"
                                            }
                                        </td>


                                        <td>
                                            {
                                                item.email ||
                                                "-"
                                            }
                                        </td>


                                        {/* STATUS */}

                                        <td>

                                            <span

                                                className={
                                                    item.status
                                                        ? "status-active"
                                                        : "status-inactive"
                                                }

                                            >

                                                {
                                                    item.status
                                                        ? "Active"
                                                        : "Inactive"
                                                }

                                            </span>

                                        </td>


                                        {/* ACTION */}

                                        <td>

                                            <button

                                                className="btn btn-warning btn-sm me-2"

                                                onClick={() =>
                                                    editMember(
                                                        item
                                                    )
                                                }

                                            >

                                                Edit

                                            </button>


                                            <button

                                                className="btn btn-danger btn-sm"

                                                onClick={() =>
                                                    deleteMember(
                                                        item.member_id
                                                    )
                                                }

                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                ))
                            }


                            {
                                members.length === 0 && (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="text-center"
                                        >

                                            No Members Found

                                        </td>

                                    </tr>

                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>

    );

}

export default Members;