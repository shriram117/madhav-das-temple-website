import "./Donation.css";
import qrCode from "../../assets/images/donation/qr.png";

function Donation() {

    const upiId = "merchant1298050.augp@aubank";

    const copyUPI = async () => {

        try {

            await navigator.clipboard.writeText(upiId);

            alert("UPI ID copied successfully!");

        } catch (error) {

            console.error("Copy UPI Error:", error);

        }

    };


    const donateNow = () => {

        const upiUrl =
            `upi://pay?pa=${upiId}&pn=Shri%20Madhav%20Das%20Ji%20Temple`;

        window.location.href = upiUrl;

    };


    return (

        <section
            id="donation"
            className="donation-section"
            data-aos="fade-left"
        >

            <div className="container">

                {/* HEADER */}

                <div className="donation-heading">

                    <div className="donation-section-label">
                        🪔 Seva & Donation
                    </div>

                    <h2>🙏 Support Shri Madhav Das Ji Temple 🙏</h2>

                    <p>
                        Your generous donation helps us maintain the temple,
                        organize Ramdhuni, Bhajan Sandhya, festivals,
                        and serve devotees throughout the year.
                    </p>

                </div>


                {/* DONATION CARD */}

                <div className="donation-card">

                    <div className="donation-card-title">

                        <span>🙏</span>

                        <h3>
                            Donate to Temple
                        </h3>

                    </div>


                    {/* QR */}

                    <div className="qr-wrapper">

                        <img
                            src={qrCode}
                            alt="Shri Madhav Das Ji Temple Donation QR Code"
                            className="qr-image"
                        />

                    </div>


                    <p className="scan-text">
                        Scan this QR code using any UPI app
                    </p>


                    {/* UPI */}

                    <div className="upi-box">

                        <span className="upi-label">
                            UPI ID
                        </span>

                        <strong>
                            {upiId}
                        </strong>

                    </div>


                    {/* COPY */}

                    <button
                        type="button"
                        className="copy-upi-button"
                        onClick={copyUPI}
                    >
                        📋 Copy UPI ID
                    </button>


                    {/* DONATE */}

                    <button
                        type="button"
                        className="donate-button"
                        onClick={donateNow}
                    >
                        🙏 Donate Now
                    </button>


                    <p className="donation-note">
                        Your support helps in temple maintenance,
                        religious programs and seva activities.
                    </p>

                </div>

            </div>

        </section>

    );

}

export default Donation;