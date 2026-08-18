import "./UpcomingEvents.css";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { getImageUrl } from "../../utils/imageUrl";
function UpcomingEvents() {

    const [events, setEvents] = useState([]);

    useEffect(() => {

        loadEvents();

    }, []);

    const loadEvents = async () => {

        try {

            const response = await axios.get(
                `${API_BASE_URL}/events`
            );

            const activeEvents = response.data
                .filter(item => item.status === true)
                .slice(0, 3);

            setEvents(activeEvents);

        }
        catch (err) {

            console.log(err);

        }

    };

    return (

        <section id="events" className="events-section">

            <div className="container">

                <h2 className="text-center mb-5">

                    Upcoming Temple Events

                </h2>

                <div className="row">

                    {

                        events.length > 0 ?

                        events.map((item) => (

                            <div
                                className="col-lg-4 col-md-6 mb-4"
                                key={item.event_id}
                            >

                                <div className="event-card">

                                    <div className="event-image-box">

                                        <img
                                            src={getImageUrl(item.image_url)}
                                            alt={item.event_name}
                                            className="event-image"
                                        />

                                    </div>

                                    <div className="event-body">

                                        <span className="date-badge">

                                            📅 {new Date(item.event_date).toLocaleDateString("en-GB")}

                                        </span>

                                        <h4>

                                            {item.event_name}

                                        </h4>

                                        <p className="event-desc">

                                            {item.description}

                                        </p>

                                        <button className="event-btn">

                                            View Details

                                        </button>

                                    </div>

                                </div>

                            </div>

                        )):
                              <div className="col-12 text-center">

                            <h4>No Upcoming Events</h4>

                         <p>Please check again later.</p>

                    </div>

                    }

                </div>

            </div>

        </section>

    );

}

export default UpcomingEvents;