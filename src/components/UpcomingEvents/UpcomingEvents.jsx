import "./UpcomingEvents.css";
import { FaCalendarAlt } from "react-icons/fa";

function UpcomingEvents() {

    const events = [
        {
            title: "Ramdhuni Purnima",
            date: "10 August 2026",
            description: "Special Ramdhuni and Bhajan Sandhya."
        },
        {
            title: "Shrimad Bhagwat Katha",
            date: "18 August 2026",
            description: "Seven-day spiritual discourse."
        },
        {
            title: "Janmashtami Mahotsav",
            date: "26 August 2026",
            description: "Celebrate the birth of Lord Krishna."
        }
    ];

    return (

        <section id="events" className="events-section">

            <div className="container">

                <h2 className="text-center mb-5">
                    Upcoming Events
                </h2>

                <div className="row">

                    {events.map((event, index) => (

                        <div className="col-lg-4 mb-4" key={index}>

                            <div className="event-card">

                                <div className="event-icon">
                                    <FaCalendarAlt />
                                </div>

                                <h4>{event.title}</h4>

                                <h6>{event.date}</h6>

                                <p>{event.description}</p>

                                <button className="event-btn">
                                    Know More
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}

export default UpcomingEvents;