import "./Hero.css";
function Hero() {
    return (
        <section id ="home" className="hero">
            <div className="overlay">
                <div className="hero-content">

                    <h4>🙏 Welcome to 🙏</h4>

                    <h1>Shri Madhav Das Ji Temple</h1>

                    <h3>Ghinoi, Rajasthan</h3>

                    <p>
                        A sacred place of devotion, peace, and spiritual heritage.
                    </p>

                    <div className="hero-buttons">
                        <button className="btn-primary">
                            Explore Temple
                        </button>

                        <button className="btn-secondary">
                            Live Darshan
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Hero;