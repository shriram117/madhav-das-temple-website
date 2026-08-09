import { useEffect, useState } from "react";
import axios from "axios";
import "./../css/UpcomingEvents.css";
import API_BASE_URL from "../../config/api";
function UpcomingEvents() {

    const [events, setEvents] = useState([]);

    const loadEvents = async () => {

        try {

            const response = await axios.get(
               `${API_BASE_URL}/events/upcoming`
            );

            setEvents(response.data);

        }
        catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        loadEvents();

    }, []);

    return (

        <div className="dashboard-box">

            <h3>📅 Upcoming Events</h3>

            {
                events.length === 0 ?

                    <p>No upcoming events.</p>

                    :

                    events.map((item) => (

                        <div
                            key={item.event_id}
                            className="dashboard-item"
                        >

                            <div>

                                <strong>{item.title}</strong>

                                <br />

                                <small>
                                    📍 {item.location}
                                </small>

                            </div>

                            <div>

                                <small>

                                    {item.event_date.substring(0, 10)}

                                </small>

                            </div>

                        </div>

                    ))
            }

        </div>

    );

}

export default UpcomingEvents;