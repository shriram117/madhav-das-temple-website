import "./Gallery.css";

import img1 from "../../assets/images/gallery/1.JPG";
import img2 from "../../assets/images/gallery/2.JPG";
import img3 from "../../assets/images/gallery/3.JPG";
import img4 from "../../assets/images/gallery/4.JPG";
import img5 from "../../assets/images/gallery/5.JPG";
import img6 from "../../assets/images/gallery/6.JPG";

function Gallery() {

    const images = [
        img1,
        img2,
        img3,
        img4,
        img5,
        img6
    ];

    return (

        <section id="gallery"  className="gallery-section" data-aos="zoom-in">

            <div className="container">

                <h2 className="text-center mb-5">
                    Temple Gallery
                </h2>

                <div className="gallery-grid">

                    {images.map((image, index) => (

                        <div className="gallery-item" key={index}>

                            <img src={image} alt="Temple Gallery" />

                        </div>

                    ))}

                </div>

                <div className="text-center mt-5">

                    <button className="gallery-btn">
                        View All Photos
                    </button>

                </div>

            </div>

        </section>

    );

}

export default Gallery;