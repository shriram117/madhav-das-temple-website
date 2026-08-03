import "./DailyAarti.css";
import { FaSun, FaCloudSun, FaMoon, FaMusic } from "react-icons/fa";

function DailyAarti() {

    const aartiList = [
        {
            icon: <FaSun />,
            title: "Mangla Aarti",
            time: "05:30 AM"
        },
        {
            icon: <FaCloudSun />,
            title: "Morning Aarti",
            time: "08:00 AM"
        },
        {
            icon: <FaMoon />,
            title: "Evening Aarti",
            time: "07:00 PM"
        },
        {
            icon: <FaMusic />,
            title: "Bhajan Sandhya",
            time: "Every Saturday"
        }
    ];

    return (

        <section id="aarti" className="aarti-section">

            <div className="container">

                <h2 className="text-center mb-5">
                    Daily Aarti
                </h2>

                <div className="row">

                    {aartiList.map((item, index) => (

                        <div className="col-lg-3 col-md-6 mb-4" key={index}>

                            <div className="aarti-card">

                                <div className="icon">
                                    {item.icon}
                                </div>

                                <h4>{item.title}</h4>

                                <p>{item.time}</p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}

export default DailyAarti;