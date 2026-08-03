import "./Footer.css";
import { FaFacebook, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">

            <div className="container">

                <div className="row">

                    <div className="col-lg-4">

                        <h3>🛕 Shri Madhav Das Ji Temple</h3>

                        <p>
                            A sacred place of devotion, peace, and spirituality
                            located in Ghinoi, Rajasthan.
                        </p>

                    </div>

                    <div className="col-lg-2">

                        <h4>Quick Links</h4>

                        <ul>

                            <li>Home</li>

                            <li>About</li>

                            <li>Gallery</li>

                            <li>Events</li>

                            <li>Donation</li>

                        </ul>

                    </div>

                    <div className="col-lg-3">

                        <h4>Contact</h4>

                        <p><FaPhoneAlt /> +91-8740881142</p>

                        <p><FaEnvelope />1008shrimadhavdasji@gmail.com</p>

                        <p><FaMapMarkerAlt /> Ghinoi, Rajasthan</p>

                    </div>

                    <div className="col-lg-3">

                        <h4>Follow Us</h4>

                        <div className="social-icons">

                            <FaFacebook />

                            <FaInstagram />

                            <FaYoutube />

                        </div>

                    </div>

                </div>

                <hr />

                <div className="copyright">

                    © 2026 Shriram Sharma Developer | All Rights Reserved

                </div>

            </div>

        </footer>
    );
}

export default Footer;