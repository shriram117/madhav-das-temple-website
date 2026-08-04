import "../css/Header.css";

function Header() {

    const adminName = "Admin";

    return (

        <div className="header">

            <div className="header-left">

                <h3>🛕 Shri Madhav Das Ji Temple</h3>

            </div>

            <div className="header-right">

                <span className="welcome">
                    Welcome, {adminName}
                </span>

                <button className="profile-btn">
                    👤
                </button>

            </div>

        </div>

    );

}

export default Header;