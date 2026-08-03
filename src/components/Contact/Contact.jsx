import "./Contact.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

function Contact() {
    return (
        <section id="contact"  className="contact-section">

            <div className="container">

                <h2 className="text-center mb-5">
                    Contact Us
                </h2>

                <div className="row">

                    <div className="col-lg-5">

                        <div className="contact-card">

                            <h3>Shri Madhav Das Ji Temple</h3>

                            <p>
                                <FaMapMarkerAlt className="icon" />
                                Ghinoi, Chomu, Jaipur, Rajasthan
                            </p>

                            <p>
                                <FaPhoneAlt className="icon" />
                                +91-8740881142
                            </p>

                            <p>
                                <FaEnvelope className="icon" />
                                1008shrimadhavdasji@gmail.com
                            </p>

                        </div>

                    </div>

                    <div className="col-lg-7">

                        <div className="map-container">

                            <iframe
                                title="Temple Location"
                                src="https://www.google.com/maps?q=Ghinoi,Jaipur,Rajasthan&output=embed"
                                width="100%"
                                height="350"
                                style={{ border: 0 }}
                                loading="lazy"
                            ></iframe>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Contact;