import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg">

            <div className="container">

                <a href="/" className="logo">

                    🛕 Shri Madhav Das Ji

                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menu"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="menu">

                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <a className="nav-link" href="#home">Home</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#about">About</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#gallery">Gallery</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#events">Events</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#contact">Contact</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link"  href="#donation">
                            Donate
                        </a>
                        </li>
                    </ul>

                   

                </div>

            </div>

        </nav>
    );
}

export default Navbar;