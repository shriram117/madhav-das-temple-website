import "./Gallery.css";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import Lightbox from "./Lightbox";
import { getImageUrl } from "../../utils/imageUrl";

function Gallery() {

    const [gallery, setGallery] = useState([]);

    const [selectedIndex, setSelectedIndex] = useState(null);


    useEffect(() => {

        loadGallery();

    }, []);


    const loadGallery = async () => {

        try {

            const response = await api.get("/gallery");

            const activeGallery = response.data.filter(
                item => item.status === true
            );

            setGallery(activeGallery);

        }
        catch (err) {

            console.log("Gallery Load Error:", err);

        }

    };


    const openImage = (index) => {

        setSelectedIndex(index);

    };


    const closeImage = () => {

        setSelectedIndex(null);

    };


    const nextImage = () => {

        setSelectedIndex(
            (selectedIndex + 1) % gallery.length
        );

    };


    const prevImage = () => {

        setSelectedIndex(
            (selectedIndex - 1 + gallery.length) % gallery.length
        );

    };


    return (

        <section
            id="gallery"
            className="gallery-section"
            data-aos="zoom-in"
        >

            <div className="container">

                <h2 className="text-center mb-5">
                    Temple Gallery
                </h2>


                <div className="gallery-grid">

                    {
                        gallery.slice(0, 6).map((item, index) => (

                            <div
                                className="gallery-item"
                                key={item.gallery_id}
                                onClick={() => openImage(index)}
                            >

                                <img
                                    src={getImageUrl(item.image_url)}
                                    alt={item.title}
                                />

                            </div>

                        ))
                    }

                </div>


                <div className="text-center mt-5">

                    <button className="gallery-btn">
                        View All Photos
                    </button>

                </div>

            </div>


            {
                selectedIndex !== null && (

                    <Lightbox

                        image={
                            getImageUrl(
                                gallery[selectedIndex].image_url
                            )
                        }

                        onClose={closeImage}

                        onNext={nextImage}

                        onPrev={prevImage}

                    />

                )
            }

        </section>

    );

}

export default Gallery;