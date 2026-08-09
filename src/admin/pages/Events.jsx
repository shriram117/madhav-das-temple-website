import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import EventForm from "../components/EventForm";
import API_BASE_URL, { SERVER_URL } from "../../config/api";
function Events() {

    const [showForm, setShowForm] = useState(false);
    const [events, setEvents] = useState([]);
    const [editData, setEditData] = useState(null);

    const loadEvents = async () => {

        try {

            const response = await axios.get(
                `${API_BASE_URL}/events`
            );

            setEvents(response.data);

        }
        catch (err) {

            console.log(err);

            alert("Unable to load events.");

        }

    };


    const editEvent = (item) => {

        setEditData(item);

        setShowForm(true);

    };
    const deleteEvent = async (id) => {

        if (!window.confirm("Are you sure you want to delete this event?")) {

            return;

        }

        try {

            await axios.delete(
                `${API_BASE_URL}/events/${id}`
            );

            alert("Event Deleted Successfully");

            loadEvents();

        }
        catch (err) {

            console.log(err);

            alert("Delete Failed");

        }

    };
    useEffect(() => {

        loadEvents();

    }, []);

    return (

        <AdminLayout>

                <div className="d-flex justify-content-between mb-4">

                <h2>📅 Event Management</h2>

                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Close Form" : "+ Add Event"}
                </button>

            </div>

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

                            <tr key={item.event_id}>

                                <td>{item.event_id}</td>

                                <td>

                                    {
                                        item.image_url ?

                                            <img
                                                src={`${SERVER_URL}${item.image_url}`}
                                                width="90"
                                                height="60"
                                                style={{
                                                    objectFit: "cover",
                                                    borderRadius: "8px"
                                                }}
                                            />

                                            :

                                            "No Image"

                                    }

                                </td>

                                <td>{item.title}</td>

                                <td>{item.event_date}</td>

                                <td>{item.event_time}</td>

                                <td>{item.location}</td>

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
                                        onClick={() => editEvent(item)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteEvent(item.event_id)}
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