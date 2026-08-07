import "./Navbar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { getImageUrl } from "../../utils/imageUrl";
function Navbar() {

    const [settings, setSettings] = useState({});
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {

        loadSettings();

        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);

    const loadSettings = async () => {

        try {

            const response = await axios.get(
                `${API_BASE_URL}/settings`
            );

            setSettings(response.data);

        }
        catch (err) {

            console.log(err);

        }

    };

    return (

        <nav className={`navbar navbar-expand-lg ${scrolled ? "scrolled" : ""}`}>

            <div className="container">

                <Link to="/" className="logo">

                    {
                        settings.temple_logo ?

                            <img
                                src={getImageUrl(settings.temple_logo)}
                                alt="Temple Logo"
                                className="logo-image"
                            />

                            :

                            <span className="logo-icon">
                                🛕
                            </span>
                    }

                    <span className="logo-text">

                        {
                            settings.temple_name ||
                            "Shri Madhav Das Ji"
                        }

                    </span>

                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menu"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="menu"
                >

                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <a className="nav-link" href="#home">Home</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#about">About</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#services">Services</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#gallery">Gallery</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#aarti">Aarti</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#contact">Contact</a>
                        </li>

                        <li className="nav-item ms-lg-3">

                            <Link
                                to="/login"
                                className="login-btn"
                            >
                                Admin Login
                            </Link>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;