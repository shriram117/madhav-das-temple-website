function Dashboard() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <div style={{ padding: "30px" }}>

            <h1>🛕 Madhav Das Ji Temple</h1>

            <hr />

            <h2>Welcome</h2>

            <h3>{user.full_name}</h3>

            <p>Role : {user.role}</p>

            <button
                onClick={() => {

                    localStorage.removeItem("user");

                    window.location.href = "/";

                }}
            >
                Logout
            </button>

        </div>

    );

}

export default Dashboard;