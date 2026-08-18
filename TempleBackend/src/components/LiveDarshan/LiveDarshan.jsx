import "./LiveDarshan.css";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";

function LiveDarshan() {

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

    // Convert normal YouTube URL to Embed URL
    const getEmbedUrl = (url) => {

        if (!url) return "";

        if (url.includes("youtube.com/watch?v=")) {

            const videoId = url.split("v=")[1].split("&")[0];

            return `https://www.youtube.com/embed/${videoId}`;

        }

        if (url.includes("youtu.be/")) {

            const videoId = url.split("youtu.be/")[1].split("?")[0];

            return `https://www.youtube.com/embed/${videoId}`;

        }

        if (url.includes("youtube.com/live/")) {

            const videoId = url.split("live/")[1].split("?")[0];

            return `https://www.youtube.com/embed/${videoId}`;

        }

        return url;

    };

    return (

        <section className="live-darshan">

            <div className="container">

                <div className="live-card">

                    <span className="live-badge">

                        🔴 LIVE

                    </span>

                    <h2>

                        Live Darshan

                    </h2>

                    <p>

                        Watch Live Darshan from anywhere.

                    </p>

                    {

                        settings.live_darshan_url ?

                            <div className="live-video">

                                <iframe

                                    src={getEmbedUrl(settings.live_darshan_url)}

                                    title="Live Darshan"

                                    frameBorder="0"

                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"

                                    allowFullScreen

                                ></iframe>

                            </div>

                            :

                            <div className="coming-soon">

                                <h4>

                                    Live Darshan Coming Soon

                                </h4>

                                <p>

                                    Please Visit Temple

                                </p>

                            </div>

                    }

                </div>

            </div>

        </section>

    );

}

export default LiveDarshan;