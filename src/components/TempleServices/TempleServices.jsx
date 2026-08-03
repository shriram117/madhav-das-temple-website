import "./TempleServices.css";
import {
    FaVideo,
    FaCalendarAlt,
    FaImages,
    FaDonate,
    FaBookOpen,
    FaPhoneAlt
} from "react-icons/fa";

function TempleServices() {

    const services = [
        {
            icon: <FaVideo />,
            title: "Live Darshan",
            description: "Watch live darshan from anywhere."
        },
        {
            icon: <FaCalendarAlt />,
            title: "Upcoming Events",
            description: "View temple festivals and programs."
        },
        {
            icon: <FaImages />,
            title: "Photo Gallery",
            description: "Explore temple memories."
        },
        {
            icon: <FaDonate />,
            title: "Online Donation",
            description: "Support temple activities."
        },
        {
            icon: <FaBookOpen />,
            title: "Temple History",
            description: "Know the history of the temple."
        },
        {
            icon: <FaPhoneAlt />,
            title: "Contact",
            description: "Get in touch with temple management."
        }
    ];

    return (

        <section id="services" className="services">

            <div className="container">

                <h2 className="text-center mb-5">
                    Temple Services
                </h2>

                <div className="row">

                    {services.map((service, index) => (

                        <div className="col-lg-4 col-md-6 mb-4" key={index}>

                            <div className="service-card">

                                <div className="service-icon">
                                    {service.icon}
                                </div>

                                <h4>{service.title}</h4>

                                <p>{service.description}</p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}

export default TempleServices;