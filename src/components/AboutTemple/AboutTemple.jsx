import "./AboutTemple.css";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { getImageUrl } from "../../utils/imageUrl";
function AboutTemple() {

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

        <section
            id="about"
            className="about-section"
            data-aos="fade-up"
        >

            <div className="container">

                <div className="row align-items-center">

                    <div className="col-lg-6">

                        {
                            settings.temple_banner ?

                                <img
                                    src={getImageUrl(settings.temple_banner)}
                                    alt={settings.temple_name}
                                    className="about-image"
                                />

                                :

                                <div className="about-image-placeholder">

                                    No Image

                                </div>
                        }

                    </div>

                    <div className="col-lg-6">

                        <span className="section-tag">

                            ABOUT TEMPLE

                        </span>

                        <h2>

                            {
                                settings.temple_name ||
                                "Shri Madhav Das Ji Temple"
                            }

                        </h2>

                        <p>

                            {
                                settings.about_temple ||
                                "Temple information will appear here."
                            }

                        </p>

                        <p>

                            <strong>Address :</strong> {settings.address}

                            <br />

                            <strong>City :</strong> {settings.city}

                            <br />

                            <strong>State :</strong> {settings.state}

                            <br />

                            <strong>Pincode :</strong> {settings.pincode}

                        </p>

                        <button className="read-more">

                            Read More

                        </button>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default AboutTemple;