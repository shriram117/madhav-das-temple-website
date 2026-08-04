import { Routes, Route } from "react-router-dom";

import TempleWebsite from "./pages/TempleWebsite";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";

function App() {
    return (
        <Routes>

            <Route path="/" element={<TempleWebsite />} />

            <Route path="/login" element={<Login />} />

            <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
    );
}

export default App;