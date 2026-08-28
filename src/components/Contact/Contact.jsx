import "./Contact.css";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";

import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaClock
} from "react-icons/fa";

import {
    GiTempleGate
} from "react-icons/gi";


function Contact() {

    const [settings, setSettings] = useState({});


    // =========================================
    // LOAD SETTINGS
    // =========================================

    useEffect(() => {

        loadSettings();

    }, []);


    const loadSettings = async () => {

        try {

            const response = await axios.get(
                `${API_BASE_URL}/settings`
            );

            console.log(
                "Contact Settings:",
                response.data
            );

            setSettings(response.data);

        }
        catch (err) {

            console.error(
                "Contact Settings Error:",
                err
            );

        }

    };


    // =========================================
    // GOOGLE MAP URL
    // Supports iframe code OR direct URL
    // =========================================

    const getGoogleMapUrl = (mapValue) => {

        const defaultMap =
            "https://www.google.com/maps/embed?pb=!4v1787944650737!6m8!1m7!1sMsbm7CHCMlu2wKMD16PUpg!2m2!1d27.15639959358455!2d75.56262622615263!3f21.306830547492716!4f-22.648376217330465!5f0.7820865974627469";


        if (!mapValue) {

            return defaultMap;

        }


        const value = mapValue.trim();


        // =====================================
        // IF ADMIN SAVED COMPLETE IFRAME CODE
        // =====================================

        if (
            value.includes("<iframe")
        ) {

            const match =
                value.match(
                    /src=["']([^"']+)["']/i
                );


            if (
                match &&
                match[1]
            ) {

                return match[1];

            }

        }


        // =====================================
        // IF ADMIN SAVED DIRECT URL
        // =====================================

        if (
            value.startsWith("http://") ||
            value.startsWith("https://")
        ) {

            return value;

        }


        return defaultMap;

    };


    const mapUrl =
        getGoogleMapUrl(
            settings.google_map
        );


    return (

        <section
            id="contact"
            className="contact-section"
        >

            <div className="container">


                {/* =========================================
                    HEADER
                ========================================= */}

                <div className="contact-heading">


                    <div className="heading-decoration">

                        ✦

                    </div>


                    <h2>

                        <FaMapMarkerAlt />

                        मंदिर से संपर्क करें

                    </h2>


                    <p>

                        श्री श्री 1008 बाबा माधवदास जी महाराज मंदिर,
                        घिनोई

                    </p>


                </div>


                {/* =========================================
                    CONTACT + MAP
                ========================================= */}

                <div className="contact-grid">


                    {/* =====================================
                        CONTACT INFORMATION
                    ===================================== */}

                    <div className="contact-card">


                        <h3>

                            {
                                settings.temple_name ||
                                "श्री श्री 1008 बाबा माधवदास जी महाराज"
                            }

                        </h3>


                        <div className="card-divider">

                            ✦

                        </div>


                        {/* =================================
                            ADDRESS
                        ================================= */}

                        <div className="contact-item">


                            <div className="contact-icon">

                                <FaMapMarkerAlt />

                            </div>


                            <div className="contact-content">

                                <strong>
                                    स्थान
                                </strong>


                                <span>

                                    {
                                        settings.address ||
                                        "Vpo-Ghinoi, Via-Kaladera, Teh-Chomu, Jaipur (Rajasthan) 303702"
                                    }

                                </span>

                            </div>


                        </div>


                        {/* =================================
                            PHONE
                        ================================= */}

                        <div className="contact-item">


                            <div className="contact-icon">

                                <FaPhoneAlt />

                            </div>


                            <div className="contact-content">

                                <strong>
                                    संपर्क नंबर
                                </strong>


                                <span>

                                    {
                                        settings.mobile_no ||
                                        "+91 96379 31008"
                                    }

                                </span>

                            </div>


                        </div>


                        {/* =================================
                            EMAIL
                        ================================= */}

                        <div className="contact-item">


                            <div className="contact-icon">

                                <FaEnvelope />

                            </div>


                            <div className="contact-content">

                                <strong>
                                    ईमेल
                                </strong>


                                <span>

                                    {
                                        settings.email ||
                                        "1008shrimadhavdasji@gmail.com"
                                    }

                                </span>

                            </div>


                        </div>


                        {/* =================================
                            DARSHAN TIME
                        ================================= */}

                        <div className="contact-item">


                            <div className="contact-icon">

                                <FaClock />

                            </div>


                            <div className="contact-content">

                                <strong>
                                    दर्शन समय
                                </strong>


                                <span>
                                    प्रातः 5:00 बजे से दोपहर 12:00 बजे तक
                                </span>


                                <span>
                                    सायं 4:00 बजे से रात्रि 9:00 बजे तक
                                </span>

                            </div>


                        </div>


                    </div>


                    {/* =====================================
                        GOOGLE MAP
                    ===================================== */}

                    <div className="map-card">


                        <div className="map-container">


                            <iframe
                                title="Shri Shri 1008 Baba Madhavdas Ji Maharaj Temple Location"
                                src={mapUrl}
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="strict-origin-when-cross-origin"
                            >
                            </iframe>


                        </div>


                    </div>


                </div>


                {/* =========================================
                    WELCOME SECTION
                ========================================= */}

                <div className="welcome-banner">


                    {/* TEMPLE ICON */}

                    <div className="welcome-icon">

                        <GiTempleGate />

                    </div>


                    {/* TEXT */}

                    <div className="welcome-content">


                        <h3>

                            आपका स्वागत है!

                        </h3>


                        <p>

                            मंदिर में पधारें और बाबा माधवदास जी महाराज
                            के दर्शन कर धन्य हों।

                        </p>


                        <div className="welcome-line">

                            ✦

                        </div>


                    </div>


                </div>


            </div>

        </section>

    );

}


export default Contact;