import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import "./TempleLocations.css";

function TempleLocations() {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadLocations = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/locations`);

                console.log("Temple Locations:", response.data);

                setLocations(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Temple Locations Error:", error);
                setLocations([]);
            } finally {
                setLoading(false);
            }
        };

        loadLocations();
    }, []);

    if (loading) {
        return (
            <section className="temple-locations-section">
                <div className="temple-locations-container">
                    <p className="locations-loading">मंदिरों की जानकारी लोड हो रही है...</p>
                </div>
            </section>
        );
    }

    if (locations.length === 0) {
        return null;
    }

    return (
        <section className="temple-locations-section">
            <div className="temple-locations-container">

                <div className="temple-locations-heading">
                    <span>🛕</span>
                    <h2>श्री बाबा माधवदास जी के प्रमुख मंदिर</h2>
                   
                </div>

                <div className="temple-locations-grid">
                    {locations.map((item) => (
                        <div
                            className="temple-location-card"
                            key={item.location_id}
                        >

                            <div className="temple-location-image">
                                {item.image_url ? (
                                    <img
                                        src={item.image_url}
                                        alt={item.temple_name}
                                        onError={(e) => {
                                            e.target.style.display = "none";
                                        }}
                                    />
                                ) : (
                                    <div className="location-no-image">
                                        🛕
                                    </div>
                                )}
                            </div>

                            <div className="temple-location-content">

                                <h3>{item.temple_name}</h3>

                                {(item.city || item.state) && (
                                    <div className="location-place">
                                        📍 {item.city || ""}
                                        {item.city && item.state ? ", " : ""}
                                        {item.state || ""}
                                    </div>
                                )}

                                {item.address && (
                                    <p>
                                        <strong>पता:</strong> {item.address}
                                    </p>
                                )}

                                {item.mobile_no && (
                                    <a
                                        href={`tel:${item.mobile_no}`}
                                        className="location-contact-btn"
                                    >
                                        📞 Call Now
                                    </a>
                                )}

                                {item.timings && (
                                    <p>
                                        <strong>समय:</strong> {item.timings}
                                    </p>
                                )}

                                {item.description && (
                                    <p className="location-description">
                                        {item.description}
                                    </p>
                                )}

                                {item.google_map_url && (
                                    <a
                                        href={item.google_map_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="location-directions-btn"
                                    >
                                        📍 Directions
                                    </a>
                                )}

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default TempleLocations;