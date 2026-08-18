import "./Donation.css";
import qrCode from "../../assets/images/donation/qr.png";

function Donation() {
    return (
        <section id="donation" className="donation-section" data-aos="fade-left">

            <div className="container">

                <h2>🙏 Support Shri Madhav Das Ji Temple 🙏</h2>

                <p className="donation-text">
                    Your generous donation helps us maintain the temple,
                    organize Ramdhuni, Bhajan Sandhya, festivals, and
                    serve devotees throughout the year.
                </p>

                <div className="donation-card">

                    <img
                        src={qrCode}
                        alt="Temple Donation QR"
                        className="qr-image"
                    />

                    <h4>UPI ID</h4>

                    <h5>merchant1298050.augp@aubank</h5>

                    <p>
                        Scan the QR code using any UPI app.
                    </p>

                    <button className="donate-button">
                        Donate Now
                    </button>

                </div>

            </div>

        </section>
    );
}

export default Donation;