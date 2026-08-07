import { Link, useLocation } from "react-router-dom";
import "../css/Sidebar.css";

function Sidebar() {

    const location = useLocation();

    const menus = [

        {
            name: "Dashboard",
            path: "/dashboard",
            icon: "📊"
        },

        {
            name: "Gallery",
            path: "/admin/gallery",
            icon: "🖼️"
        },

        {
            name: "Events",
            path: "/admin/events",
            icon: "📅"
        },

        {
            name: "Donations",
            path: "/admin/donations",
            icon: "💰"
        },

        {
            name: "Daily Aarti",
            path: "/admin/aarti",
            icon: "🛕"
        },
        // 👇 ADD THIS
        {
            name: "Temple Services",
            path: "/admin/services",
            icon: "🙏"
        },
        {
            name: "News",
            path: "/admin/news",
            icon: "📰"
        },

        {
            name: "Users",
            path: "/admin/users",
            icon: "👥"
        },

        {
            name: "Settings",
            path: "/admin/settings",
            icon: "⚙️"
        }

    ];

    return (

        <div className="sidebar">

            <div className="sidebar-logo">

                🛕
                <h4>Temple Admin</h4>

            </div>

            <ul>

                {
                    menus.map((menu) => (

                        <li
                            key={menu.path}
                            className={
                                location.pathname === menu.path
                                    ? "active"
                                    : ""
                            }
                        >

                            <Link to={menu.path}>

                                <span>{menu.icon}</span>

                                {menu.name}

                            </Link>

                        </li>

                    ))
                }

            </ul>

            <div className="logout">

                <Link to="/login">

                    🚪 Logout

                </Link>

            </div>

        </div>

    );

}

export default Sidebar;