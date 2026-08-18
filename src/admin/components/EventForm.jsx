import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";

function EventForm({ loadEvents, editData, closeForm }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [location, setLocation] = useState("");
    const [eventId, setEventId] = useState(0);
    const [image, setImage] = useState(null);

    useEffect(() => {

        if (editData) {

            setEventId(editData.event_id);
            setTitle(editData.title || "");
            setDescription(editData.description || "");

            setEventDate(
                editData.event_date
                    ? editData.event_date.substring(0, 10)
                    : ""
            );

            setEventTime(editData.event_time || "");
            setLocation(editData.location || "");

        }

    }, [editData]);

    const saveEvent = async () => {

        if (title.trim() === "") {
            alert("Please enter Event Title");
            return;
        }

        if (eventDate === "") {
            alert("Please select Event Date");
            return;
        }

        if (location.trim() === "") {
            alert("Please enter Location");
            return;
        }

        try {

            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);
            formData.append("event_date", eventDate);
            formData.append("event_time", eventTime);
            formData.append("location", location);
            formData.append("created_by", 1);

            // Keep old image when editing
            formData.append(
                "old_image",
                editData?.image_url || ""
            );

            // New image
            if (image) {
                formData.append("image", image);
            }

            if (eventId === 0) {

                await axios.post(
                    `${API_BASE_URL}/events`,
                    formData
                );

            } else {

                await axios.put(
                    `${API_BASE_URL}/events/${eventId}`,
                    formData
                );

            }

            alert(
                eventId === 0
                    ? "Event Saved Successfully"
                    : "Event Updated Successfully"
            );

            await loadEvents();

            setEventId(0);
            setTitle("");
            setDescription("");
            setEventDate("");
            setEventTime("");
            setLocation("");
            setImage(null);

            closeForm();

        }
        catch (err) {

            console.error("EVENT SAVE ERROR:", err);

            alert(
                err.response?.data?.message ||
                "Save Failed"
            );

        }

    };

    return (

        <div className="card mb-4">

            <div className="card-header">

                <h4>
                    {eventId === 0
                        ? "📅 Add Event"
                        : "✏️ Edit Event"}
                </h4>

            </div>

            <div className="card-body">

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label>Event Title</label>

                        <input
                            className="form-control"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Location</label>

                        <input
                            className="form-control"
                            value={location}
                            onChange={(e) =>
                                setLocation(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Event Date</label>

                        <input
                            type="date"
                            className="form-control"
                            value={eventDate}
                            onChange={(e) =>
                                setEventDate(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Event Time</label>

                        <input
                            type="time"
                            className="form-control"
                            value={eventTime}
                            onChange={(e) =>
                                setEventTime(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-12 mb-3">

                        <label>Description</label>

                        <textarea
                            rows="3"
                            className="form-control"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-12 mb-3">

                        <label>Event Banner</label>

                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={(e) =>
                                setImage(e.target.files[0])
                            }
                        />

                    </div>

                </div>

                <button
                    className="btn btn-success"
                    onClick={saveEvent}
                >
                    {eventId === 0
                        ? "Save Event"
                        : "Update Event"}
                </button>

            </div>

        </div>

    );

}

export default EventForm;