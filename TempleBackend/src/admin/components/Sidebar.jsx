import { Link, useLocation } from "react-router-dom";
import "../css/Sidebar.css";

function Sidebar() {

    const location = useLocation();

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const permissions = user?.permissions || {};


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

        // =====================================
        // TEMPLE LOCATIONS
        // ALWAYS SHOW IN SIDEBAR
        // =====================================

        {
            name: "Temple Locations",
            path: "/admin/locations",
            icon: "📍",
            permission: "locations",
            alwaysShow: true
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
    // FILTER MENU
    // =====================================

    const allowedMenus = menus.filter(
        (menu) =>
            menu.alwaysShow === true ||
            permissions[menu.permission] === true
    );


    return (

        <div className="sidebar">

            {/* =====================================
                LOGO / TITLE
            ===================================== */}

            <div className="sidebar-header">

                <span className="sidebar-logo">
                    🛕
                </span>

                <span>
                    Temple Admin
                </span>

            </div>


            {/* =====================================
                MENU
            ===================================== */}

            <div className="sidebar-menu">

                {allowedMenus.map((menu) => (

                    <Link
                        key={menu.path}
                        to={menu.path}
                        className={
                            location.pathname === menu.path
                                ? "sidebar-link active"
                                : "sidebar-link"
                        }
                    >

                        <span className="sidebar-icon">
                            {menu.icon}
                        </span>

                        <span>
                            {menu.name}
                        </span>

                    </Link>

                ))}

            </div>


            {/* =====================================
                LOGOUT
            ===================================== */}

            <div className="sidebar-footer">

                <Link
                    to="/logout"
                    className="sidebar-link logout-link"
                >

                    <span className="sidebar-icon">
                        📕
                    </span>

                    <span>
                        Logout
                    </span>

                </Link>

            </div>

        </div>

    );
}

export default Sidebar;