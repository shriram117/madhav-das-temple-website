import "./Contact.css";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";

import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope
} from "react-icons/fa";

function Contact() {

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

        <section id="contact" className="contact-section">

            <div className="container">

                <h2 className="text-center mb-5">

                    Contact Us

                </h2>

                <div className="row">

                    <div className="col-lg-5">

                        <div className="contact-card">

                            <h3>

                                {
                                    settings.temple_name ||
                                    "Shri Madhav Das Ji Temple"
                                }

                            </h3>

                            <p>

                                <FaMapMarkerAlt className="icon" />

                                {
                                    settings.address ||
                                    "Temple Address"
                                }

                            </p>

                            <p>

                                <FaPhoneAlt className="icon" />

                                {
                                    settings.mobile_no ||
                                    "+91-XXXXXXXXXX"
                                }

                            </p>

                            <p>

                                <FaEnvelope className="icon" />

                                {
                                    settings.email ||
                                    "info@temple.com"
                                }

                            </p>

                        </div>

                    </div>

                    <div className="col-lg-7">

                        <div className="map-container">

                            {
                                settings.google_map ?

                                    <iframe
                                        title="Temple Location"
                                        src={settings.google_map}
                                        width="100%"
                                        height="350"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        allowFullScreen
                                    ></iframe>

                                    :

                                    <iframe
                                        title="Temple Location"
                                        src="https://www.google.com/maps?q=Ghinoi,Jaipur,Rajasthan&output=embed"
                                        width="100%"
                                        height="350"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                    ></iframe>
                            }

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default Contact;