import "./../css/DashboardCards.css";

function DashboardCards({ cards }) {

    return (

        <div className="dashboard-cards">

            {
                cards.map((card, index) => (

                    <div
                        key={index}
                        className="dashboard-card"
                        style={{
                            borderTop: `5px solid ${card.color}`
                        }}
                    >

                        <div className="card-icon">

                            {card.icon}

                        </div>

                        <h2>{card.value}</h2>

                        <p>{card.title}</p>

                        <button
                            className="view-btn"
                            style={{
                                color: card.color
                            }}
                        >
                            View All →
                        </button>

                    </div>

                ))
            }

        </div>

    );

}

export default DashboardCards;