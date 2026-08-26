import { Routes, Route } from "react-router-dom";

import TempleWebsite from "./pages/TempleWebsite";

import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import Gallery from "./admin/pages/Gallery";
import Events from "./admin/pages/Events";
import Users from "./admin/pages/Users";
import Settings from "./admin/pages/Settings";
import Aarti from "./admin/pages/Aarti";
import Services from "./admin/pages/Services";
import NoticeBoard from "./admin/pages/NoticeBoard";
import Members from "./admin/pages/Members";
import Donation from "./admin/pages/Donation";

import ProtectedRoute from "./admin/components/ProtectedRoute";

import ChatBot from "./ChatBot";


function App() {

    return (

        <Routes>

            {/* =====================================
                PUBLIC WEBSITE
                ChatBot is available only here
            ===================================== */}

            <Route
                path="/"
                element={
                    <>
                        <TempleWebsite />
                        <ChatBot />
                    </>
                }
            />


            {/* =====================================
                LOGIN
            ===================================== */}

            <Route
                path="/login"
                element={<Login />}
            />


            {/* =====================================
                DASHBOARD
            ===================================== */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute permission="dashboard">
                        <Dashboard />
                    </ProtectedRoute>
                }
            />


            {/* =====================================
                GALLERY
            ===================================== */}

            <Route
                path="/admin/gallery"
                element={
                    <ProtectedRoute permission="gallery">
                        <Gallery />
                    </ProtectedRoute>
                }
            />


            {/* =====================================
                EVENTS
            ===================================== */}

            <Route
                path="/admin/events"
                element={
                    <ProtectedRoute permission="events">
                        <Events />
                    </ProtectedRoute>
                }
            />


            {/* =====================================
                DONATIONS
            ===================================== */}

            <Route
                path="/admin/donations"
                element={
                    <ProtectedRoute permission="donations">
                        <Donation />
                    </ProtectedRoute>
                }
            />


            {/* =====================================
                DAILY AARTI
            ===================================== */}

            <Route
                path="/admin/aarti"
                element={
                    <ProtectedRoute permission="aarti">
                        <Aarti />
                    </ProtectedRoute>
                }
            />


            {/* =====================================
                TEMPLE SERVICES
            ===================================== */}

            <Route
                path="/admin/services"
                element={
                    <ProtectedRoute permission="services">
                        <Services />
                    </ProtectedRoute>
                }
            />


            {/* =====================================
                NOTICE BOARD
            ===================================== */}

            <Route
                path="/admin/notices"
                element={
                    <ProtectedRoute permission="notice">
                        <NoticeBoard />
                    </ProtectedRoute>
                }
            />


            {/* =====================================
                MEMBERS
            ===================================== */}

            <Route
                path="/admin/members"
                element={
                    <ProtectedRoute permission="members">
                        <Members />
                    </ProtectedRoute>
                }
            />


            {/* =====================================
                USERS
            ===================================== */}

            <Route
                path="/admin/users"
                element={
                    <ProtectedRoute permission="users">
                        <Users />
                    </ProtectedRoute>
                }
            />


            {/* =====================================
                SETTINGS
            ===================================== */}

            <Route
                path="/admin/settings"
                element={
                    <ProtectedRoute permission="settings">
                        <Settings />
                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}

export default App;