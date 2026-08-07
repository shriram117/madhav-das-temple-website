import "./Footer.css";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";

import {
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt
} from "react-icons/fa";

function Footer() {

    const [settings, setSettings] = useState({});

    useEffect(() => {

        loadSettings();

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

        <footer className="footer">

            <div className="container">

                <div className="row">

                    <div className="col-lg-4">

                        <h3>

                            🛕 {settings.temple_name || "Shri Madhav Das Ji Temple"}

                        </h3>

                        <p>

                            {settings.about_temple || "Temple Information"}

                        </p>

                    </div>

                    <div className="col-lg-2">

                        <h4>Quick Links</h4>

                        <ul>

                            <li><a href="#home">Home</a></li>

                            <li><a href="#about">About</a></li>

                            <li><a href="#gallery">Gallery</a></li>

                            <li><a href="#aarti">Daily Aarti</a></li>

                            <li><a href="#contact">Contact</a></li>

                        </ul>

                    </div>

                    <div className="col-lg-3">

                        <h4>Contact</h4>

                        <p>

                            <FaPhoneAlt /> {settings.mobile_no}

                        </p>

                        <p>

                            <FaEnvelope /> {settings.email}

                        </p>

                        <p>

                            <FaMapMarkerAlt /> {settings.address}

                        </p>

                    </div>

                    <div className="col-lg-3">

                        <h4>Follow Us</h4>

                        <div className="social-icons">

                            {

                                settings.facebook_url && (

                                    <a
                                        href={settings.facebook_url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >

                                        <FaFacebook />

                                    </a>

                                )

                            }

                            {

                                settings.instagram_url && (

                                    <a
                                        href={settings.instagram_url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >

                                        <FaInstagram />

                                    </a>

                                )

                            }

                            {

                                settings.youtube_url && (

                                    <a
                                        href={settings.youtube_url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >

                                        <FaYoutube />

                                    </a>

                                )

                            }

                        </div>

                    </div>

                </div>

                <hr />

                <div className="copyright">

                    © {new Date().getFullYear()} {settings.temple_name} | Developed By <strong>Shriram Sharma</strong>

                </div>

            </div>

        </footer>

    );

}

export default Footer;