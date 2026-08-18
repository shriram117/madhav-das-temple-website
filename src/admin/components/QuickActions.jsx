import { Link } from "react-router-dom";
import "./../css/QuickActions.css";

function QuickActions() {

    const actions = [

        {
            title: "Add Gallery",
            icon: "🖼️",
            link: "/admin/gallery",
            color: "#2563eb"
        },

        {
            title: "Add Event",
            icon: "📅",
            link: "/admin/events",
            color: "#16a34a"
        },

        {
            title: "Add Donation",
            icon: "💰",
            link: "/admin/donations",
            color: "#f59e0b"
        },

        {
            title: "Manage Users",
            icon: "👥",
            link: "/admin/users",
            color: "#9333ea"
        }

    ];

    return (

        <div className="dashboard-box">

            <h3>⚡ Quick Actions</h3>

            <div className="quick-actions">

                {
                    actions.map((item, index) => (

                        <Link
                            key={index}
                            to={item.link}
                            className="quick-btn"
                            style={{
                                background: item.color
                            }}
                        >
                            <span>{item.icon}</span>
                            {item.title}
                        </Link>

                    ))
                }

            </div>

        </div>

    );

}

export default QuickActions;