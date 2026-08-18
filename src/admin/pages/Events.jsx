import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import EventForm from "../components/EventForm";
import API_BASE_URL from "../../config/api";

function Events() {

    const [showForm, setShowForm] = useState(false);
    const [events, setEvents] = useState([]);
    const [editData, setEditData] = useState(null);

    // ==============================
    // LOAD EVENTS
    // ==============================
    const loadEvents = async () => {

        try {

            const response = await axios.get(
                `${API_BASE_URL}/events`
            );

            console.log("EVENT API DATA:", response.data);

            setEvents(response.data);

        }
        catch (err) {

            console.error("LOAD EVENTS ERROR:", err);

            alert("Unable to load events.");

        }

    };


    // ==============================
    // EDIT EVENT
    // ==============================
    const editEvent = (item) => {

        console.log("EDIT EVENT:", item);

        setEditData(item);
        setShowForm(true);

    };


    // ==============================
    // DELETE EVENT
    // ==============================
    const deleteEvent = async (id) => {

        if (
            !window.confirm(
                "Are you sure you want to delete this event?"
            )
        ) {
            return;
        }

        try {

            await axios.delete(
                `${API_BASE_URL}/events/${id}`
            );

            alert("Event Deleted Successfully");

            await loadEvents();

        }
        catch (err) {

            console.error("DELETE EVENT ERROR:", err);

            alert(
                err.response?.data?.message ||
                "Delete Failed"
            );

        }

    };


    // ==============================
    // INITIAL LOAD
    // ==============================
    useEffect(() => {

        loadEvents();

    }, []);


    return (

        <AdminLayout>

            {/* ==============================
                HEADER
            ============================== */}

            <div className="d-flex justify-content-between mb-4">

                <h2>
                    📅 Event Management
                </h2>

                <button
                    className="btn btn-primary"
                    onClick={() => {

                        if (showForm) {

                            setEditData(null);

                        }

                        setShowForm(!showForm);

                    }}
                >

                    {
                        showForm
                            ? "Close Form"
                            : "+ Add Event"
                    }

                </button>

            </div>


            {/* ==============================
                EVENT FORM
            ============================== */}

            {
                showForm && (

                    <EventForm
                        loadEvents={loadEvents}
                        editData={editData}
                        closeForm={() => {

                            setShowForm(false);
                            setEditData(null);

                        }}
                    />

                )
            }


            {/* ==============================
                EVENT TABLE
            ============================== */}

            <table className="table table-bordered table-striped">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Banner</th>

                        <th>Title</th>

                        <th>Date</th>

                        <th>Time</th>

                        <th>Location</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>


                <tbody>

                    {
                        events.map((item) => (

                            <tr
                                key={item.event_id}
                            >

                                {/* ID */}

                                <td>
                                    {item.event_id}
                                </td>


                                {/* ==============================
                                    IMAGE
                                ============================== */}

                                <td>

                                    {
                                        item.image_url ? (

                                            <img
                                                src={item.image_url}
                                                width="90"
                                                height="60"
                                                alt={
                                                    item.title ||
                                                    "Event"
                                                }
                                                style={{
                                                    objectFit: "cover",
                                                    borderRadius: "8px",
                                                    display: "block"
                                                }}
                                                onLoad={() => {

                                                    console.log(
                                                        "IMAGE LOADED:",
                                                        item.image_url
                                                    );

                                                }}
                                                onError={(e) => {

                                                    console.error(
                                                        "IMAGE LOAD ERROR:",
                                                        item.image_url
                                                    );

                                                    e.currentTarget.style.display =
                                                        "none";

                                                }}
                                            />

                                        ) : (

                                            <span>
                                                No Image
                                            </span>

                                        )
                                    }

                                </td>


                                {/* TITLE */}

                                <td>
                                    {item.title}
                                </td>


                                {/* DATE */}

                                <td>
                                    {item.event_date}
                                </td>


                                {/* TIME */}

                                <td>
                                    {item.event_time}
                                </td>


                                {/* LOCATION */}

                                <td>
                                    {item.location}
                                </td>


                                {/* STATUS */}

                                <td>

                                    {
                                        item.status
                                            ? "Active"
                                            : "Inactive"
                                    }

                                </td>


                                {/* ACTION */}

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() =>
                                            editEvent(item)
                                        }
                                    >
                                        Edit
                                    </button>


                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            deleteEvent(
                                                item.event_id
                                            )
                                        }
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

export default Events;