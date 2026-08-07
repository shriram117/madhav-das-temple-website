import "./Hero.css";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { getImageUrl } from "../../utils/imageUrl";
function Hero() {

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
            id="home"
            className="hero"
            style={{
                backgroundImage: settings.temple_banner
                    ? `url(${getImageUrl(settings.temple_banner)})`
                    : "none"
            }}
          
        >

            <div className="overlay">

                <div className="hero-content">

                    <div className="hero-buttons">

                        <button className="btn-primary">

                            Explore Temple

                        </button>

                        <button className="btn-secondary">

                            Live Darshan

                        </button>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default Hero;