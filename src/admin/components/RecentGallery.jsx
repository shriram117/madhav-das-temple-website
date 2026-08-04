import { useEffect, useState } from "react";
import axios from "axios";
import "./../css/RecentGallery.css";

function RecentGallery() {

    const [gallery, setGallery] = useState([]);

    useEffect(() => {

        loadRecentGallery();

    }, []);

    const loadRecentGallery = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/gallery/recent"
            );

            setGallery(response.data);

        }
        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="recent-gallery">

            <div className="card-header">

                <h3>📷 Recent Gallery</h3>

                <button>
                    View All
                </button>

            </div>

            {
                gallery.map((item) => (

                    <div
                        key={item.gallery_id}
                        className="gallery-item"
                    >

                        <img
                            src={`http://localhost:5000${item.image_url}`}
                            alt={item.title}
                        />

                        <div>

                            <h5>{item.title}</h5>

                            <small>

                                {new Date(item.created_on).toLocaleDateString()}

                            </small>

                        </div>

                    </div>

                ))
            }

        </div>

    );

}

export default RecentGallery;