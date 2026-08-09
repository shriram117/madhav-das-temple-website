import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Dashboard.css";
import AdminLayout from "../components/AdminLayout";
import DashboardCards from "../components/DashboardCards";
import RecentGallery from "../components/RecentGallery";
import UpcomingEvents from "../components/UpcomingEvents";
import QuickActions from "../components/QuickActions";
import API_BASE_URL from "../../config/api";
function Dashboard() {

    const [dashboard, setDashboard] = useState({

        gallery: 0,
        events: 0,
        donations: 0,
        users: 0

    });

    const loadDashboard = async () => {

        try {

            const response = await axios.get(
                `${API_BASE_URL}/dashboard`
            );

            setDashboard({

                gallery: Number(response.data.gallery),
                events: Number(response.data.events),
                donations: Number(response.data.donations),
                users: Number(response.data.users)

            });

        }
        catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        loadDashboard();

    }, []);

    const cards = [

        {
            title: "Gallery Images",
            value: dashboard.gallery,
            icon: "🖼️",
            color: "#3498db"
        },
        {
            title: "Events",
            value: dashboard.events,
            icon: "📅",
            color: "#27ae60"
        },
        {
            title: "Donations",
            value: "₹" + dashboard.donations,
            icon: "💰",
            color: "#f39c12"
        },
        {
            title: "Users",
            value: dashboard.users,
            icon: "👥",
            color: "#9b59b6"
        }

    ];

    return (

        <AdminLayout>

            <h2 className="page-title">
                Dashboard
            </h2>

            <DashboardCards cards={cards} />
            <QuickActions />
            <div className="dashboard-grid">

                <RecentGallery />

                <UpcomingEvents />

            </div>

        </AdminLayout>

    );

}

export default Dashboard;