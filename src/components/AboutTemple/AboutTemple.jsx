import "./AboutTemple.css";
import templeImage from "../../assets/images/temple/front.jpg";

function AboutTemple() {
    return (
        <section id="about"  className="about-section" data-aos="fade-up">

            <div className="container">

                <div className="row align-items-center">

                    <div className="col-lg-6">

                        <img
                            src={templeImage}
                            alt="Shri Madhav Das Ji Temple"
                            className="about-image"
                        />

                    </div>

                    <div className="col-lg-6">

                        <span className="section-tag">
                            ABOUT TEMPLE
                        </span>

                        <h2>
                            Shri Madhav Das Ji Temple
                        </h2>

                        <p>
                            Shri Madhav Das Ji Temple, situated in Ghinoi,
                            Rajasthan, is a sacred place of faith and
                            devotion. Devotees visit the temple daily for
                            darshan, bhajan, seva, and spiritual peace.
                        </p>

                        <p>
                            The temple hosts religious events, Ramdhuni,
                            festivals, and social activities throughout the year.
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