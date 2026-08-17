import AdminLayout from "../components/AdminLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/NoticeBoard.css";
import NoticeForm from "../components/NoticeForm";
import API_BASE_URL from "../../config/api";

function NoticeBoard() {

    const [notices, setNotices] = useState([]);
    const [editData, setEditData] = useState(null);
    const [showForm, setShowForm] = useState(false);


    // ======================================================
    // LOAD NOTICES
    // ======================================================

    const loadNotices = async () => {

        try {

            const response = await axios.get(
                `${API_BASE_URL}/notices`
            );

            setNotices(response.data);

        }
        catch (error) {

            console.log(error);

            alert("Unable to load notices.");

        }

    };


    // ======================================================
    // DELETE NOTICE
    // ======================================================

    const deleteNotice = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this notice?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(
                `${API_BASE_URL}/notices/${id}`
            );

            alert("Notice Deleted Successfully");

            loadNotices();

        }
        catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Delete Failed"
            );

        }

    };


    // ======================================================
    // EDIT NOTICE
    // ======================================================

    const editNotice = (item) => {

        setEditData(item);

        setShowForm(true);

    };


    // ======================================================
    // LOAD ON PAGE OPEN
    // ======================================================

    useEffect(() => {

        loadNotices();

    }, []);


    return (

        <AdminLayout>

            <div className="notice-page">


                {/* ==================================================
                    HEADER
                ================================================== */}

                <div className="notice-header">

                    <h2>
                        📢 Notice Board Management
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
                                : "+ Add Notice"
                        }

                    </button>

                </div>


                {/* ==================================================
                    FORM
                ================================================== */}

                {
                    showForm && (

                        <NoticeForm

                            loadNotices={loadNotices}

                            editData={editData}

                            closeForm={() => {

                                setShowForm(false);

                                setEditData(null);

                            }}

                        />

                    )
                }


                {/* ==================================================
                    NOTICE TABLE
                ================================================== */}

                <table className="table table-bordered table-striped">

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Title</th>

                            <th>Description</th>

                            <th>Date</th>

                            <th>Time</th>

                            <th>Location</th>

                            <th>Type</th>

                            <th>Valid Upto</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>


                    <tbody>

                        {
                            notices.map((item) => (

                                <tr
                                    key={item.notice_id}
                                >

                                    <td>
                                        {item.notice_id}
                                    </td>


                                    <td>
                                        {item.title}
                                    </td>


                                    <td>
                                        {item.description}
                                    </td>


                                    <td>

                                        {
                                            item.notice_date
                                                ? new Date(
                                                    item.notice_date
                                                ).toLocaleDateString(
                                                    "en-GB"
                                                )
                                                : "-"
                                        }

                                    </td>


                                    <td>

                                        {
                                            item.notice_time
                                                ? item.notice_time.substring(
                                                    0,
                                                    5
                                                )
                                                : "-"
                                        }

                                    </td>


                                    <td>
                                        {item.location || "-"}
                                    </td>


                                    <td>
                                        {item.notice_type || "-"}
                                    </td>


                                    <td>

                                        {
                                            item.valid_upto
                                                ? new Date(
                                                    item.valid_upto
                                                ).toLocaleDateString(
                                                    "en-GB"
                                                )
                                                : "-"
                                        }

                                    </td>


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


                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() =>
                                                editNotice(item)
                                            }
                                        >
                                            Edit
                                        </button>


                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                deleteNotice(
                                                    item.notice_id
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
                            notices.length === 0 && (

                                <tr>

                                    <td
                                        colSpan="10"
                                        className="text-center"
                                    >
                                        No notices found.
                                    </td>

                                </tr>

                            )
                        }

                    </tbody>

                </table>

            </div>

        </AdminLayout>

    );

}

export default NoticeBoard;