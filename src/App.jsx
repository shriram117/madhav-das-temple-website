import { Routes, Route } from "react-router-dom";

import TempleWebsite from "./pages/TempleWebsite";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import Gallery from "./admin/pages/Gallery";
import Events from "./admin/pages/Events";
import Users from "./admin/pages/Users";
function App() {
    return (
        <Routes>

            <Route path="/" element={<TempleWebsite />} />

            <Route path="/login" element={<Login />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/gallery" element={<Gallery />} />
            <Route path="/admin/events" element={<Events />} />
            <Route path="/admin/users" element={<Users />} />
        </Routes>
    );
}

export default App;