import { Link, useLocation } from "react-router-dom";
import "../css/Sidebar.css";

function Sidebar() {

    const location = useLocation();

    // =====================================
    // GET LOGGED-IN USER
    // =====================================

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );


    // =====================================
    // USER PERMISSIONS
    // =====================================

    const permissions =
        user?.permissions || {};


    // =====================================
    // MENU LIST
    // =====================================

    const menus = [

        {
            name: "Dashboard",
            path: "/dashboard",
            icon: "📊",
            permission: "dashboard"
        },

        {
            name: "Gallery",
            path: "/admin/gallery",
            icon: "🖼️",
            permission: "gallery"
        },

        {
            name: "Events",
            path: "/admin/events",
            icon: "📅",
            permission: "events"
        },

        {
            name: "Donations",
            path: "/admin/donations",
            icon: "💰",
            permission: "donations"
        },

        {
            name: "Daily Aarti",
            path: "/admin/aarti",
            icon: "🛕",
            permission: "aarti"
        },

        {
            name: "Temple Services",
            path: "/admin/services",
            icon: "🙏",
            permission: "services"
        },

        {
            name: "Notice Board",
            path: "/admin/notices",
            icon: "📢",
            permission: "notice"
        },

        {
            name: "Members",
            path: "/admin/members",
            icon: "👥",
            permission: "members"
        },

        {
            name: "News",
            path: "/admin/news",
            icon: "📰",
            permission: "news"
        },

        {
            name: "Users",
            path: "/admin/users",
            icon: "👤",
            permission: "users"
        },

        {
            name: "Settings",
            path: "/admin/settings",
            icon: "⚙️",
            permission: "settings"
        }

    ];


    // =====================================
    // FILTER MENUS
    // =====================================

    const allowedMenus = menus.filter(
        (menu) =>
            permissions[menu.permission] === true
    );


    return (

        <div className="sidebar">

            {/* =================================
                LOGO
            ================================= */}

            <div className="sidebar-logo">

                🛕
                <h4>
                    Temple Admin
                </h4>

            </div>


            {/* =================================
                MENU
            ================================= */}

            <ul>

                {
                    allowedMenus.map(
                        (menu) => (

                            <li
                                key={menu.path}
                                className={
                                    location.pathname === menu.path
                                        ? "active"
                                        : ""
                                }
                            >

                                <Link
                                    to={menu.path}
                                >

                                    <span>
                                        {menu.icon}
                                    </span>

                                    {menu.name}

                                </Link>

                            </li>

                        )
                    )

                }

            </ul>


            {/* =================================
                LOGOUT
            ================================= */}

            <div className="logout">

                <Link to="/login">

                    🚪 Logout

                </Link>

            </div>

        </div>

    );

}

export default Sidebar;