import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";

function NoticeForm({ loadNotices, editData, closeForm }) {

    const [formData, setFormData] = useState({

        title: "",
        description: "",
        notice_date: "",
        notice_time: "",
        location: "",
        notice_type: "General",
        valid_upto: "",
        status: true

    });


    // ======================================================
    // LOAD EDIT DATA
    // ======================================================

    useEffect(() => {

        if (editData) {

            setFormData({

                title: editData.title || "",

                description: editData.description || "",

                notice_date:
                    editData.notice_date
                        ? editData.notice_date.substring(0, 10)
                        : "",

                notice_time:
                    editData.notice_time
                        ? editData.notice_time.substring(0, 5)
                        : "",

                location: editData.location || "",

                notice_type:
                    editData.notice_type || "General",

                valid_upto:
                    editData.valid_upto
                        ? editData.valid_upto.substring(0, 10)
                        : "",

                status:
                    editData.status === undefined
                        ? true
                        : editData.status

            });

        }
        else {

            setFormData({

                title: "",
                description: "",
                notice_date: "",
                notice_time: "",
                location: "",
                notice_type: "General",
                valid_upto: "",
                status: true

            });

        }

    }, [editData]);


    // ======================================================
    // HANDLE INPUT
    // ======================================================

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData({

            ...formData,

            [name]:
                type === "checkbox"
                    ? checked
                    : value

        });

    };


    // ======================================================
    // SUBMIT
    // ======================================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!formData.title.trim()) {

            alert("Please enter notice title.");

            return;

        }


        try {

            if (editData) {

                // UPDATE

                await axios.put(

                    `${API_BASE_URL}/notices/${editData.notice_id}`,

                    formData

                );

                alert("Notice Updated Successfully");

            }
            else {

                // CREATE

                await axios.post(

                    `${API_BASE_URL}/notices`,

                    {

                        ...formData,

                        created_by: 1

                    }

                );

                alert("Notice Added Successfully");

            }


            await loadNotices();

            closeForm();

        }
        catch (error) {

            console.error(
                "Notice Save Error:",
                error
            );

            alert(

                error.response?.data?.message ||

                "Unable to save notice."

            );

        }

    };


    return (

        <div className="card mb-4 shadow-sm">

            <div className="card-header">

                <h4 className="mb-0">

                    {
                        editData
                            ? "✏️ Edit Notice"
                            : "📢 Add Notice"
                    }

                </h4>

            </div>


            <div className="card-body">

                <form onSubmit={handleSubmit}>


                    {/* TITLE */}

                    <div className="mb-3">

                        <label className="form-label">

                            Notice Title *

                        </label>

                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter notice title"
                            required
                        />

                    </div>


                    {/* DESCRIPTION */}

                    <div className="mb-3">

                        <label className="form-label">

                            Description

                        </label>

                        <textarea
                            name="description"
                            className="form-control"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter notice description"
                        />

                    </div>


                    {/* DATE + TIME */}

                    <div className="row">


                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Notice Date

                            </label>

                            <input
                                type="date"
                                name="notice_date"
                                className="form-control"
                                value={formData.notice_date}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Notice Time

                            </label>

                            <input
                                type="time"
                                name="notice_time"
                                className="form-control"
                                value={formData.notice_time}
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    {/* LOCATION + TYPE */}

                    <div className="row">


                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Location

                            </label>

                            <input
                                type="text"
                                name="location"
                                className="form-control"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter location"
                            />

                        </div>


                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Notice Type

                            </label>

                            <select
                                name="notice_type"
                                className="form-select"
                                value={formData.notice_type}
                                onChange={handleChange}
                            >

                                <option value="General">
                                    General
                                </option>

                                <option value="Important">
                                    Important
                                </option>

                                <option value="Event">
                                    Event
                                </option>

                                <option value="Announcement">
                                    Announcement
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* VALID UPTO */}

                    <div className="mb-3">

                        <label className="form-label">

                            Valid Upto

                        </label>

                        <input
                            type="date"
                            name="valid_upto"
                            className="form-control"
                            value={formData.valid_upto}
                            onChange={handleChange}
                        />

                    </div>


                    {/* STATUS */}

                    <div className="form-check mb-3">

                        <input
                            type="checkbox"
                            name="status"
                            className="form-check-input"
                            id="noticeStatus"
                            checked={formData.status}
                            onChange={handleChange}
                        />

                        <label
                            className="form-check-label"
                            htmlFor="noticeStatus"
                        >

                            Active Notice

                        </label>

                    </div>


                    {/* BUTTONS */}

                    <button
                        type="submit"
                        className="btn btn-success me-2"
                    >

                        {
                            editData
                                ? "Update Notice"
                                : "Save Notice"
                        }

                    </button>


                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={closeForm}
                    >

                        Cancel

                    </button>

                </form>

            </div>

        </div>

    );

}

export default NoticeForm;