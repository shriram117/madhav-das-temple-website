import { Navigate } from "react-router-dom";

function ProtectedRoute({ permission, children }) {

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    console.log("========== PROTECTED ROUTE ==========");
    console.log("Current Path:", window.location.pathname);
    console.log("Required Permission:", permission);
    console.log("User:", user);
    console.log(
        "User Permission:",
        user?.permissions?.[permission]
    );
    console.log("=====================================");


    // Not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }


    // Super Admin
    if (user.role === "Super Admin") {
        return children;
    }


    // Permission check
    if (user?.permissions?.[permission] !== true) {

        return (

            <div
                style={{
                    padding: "50px",
                    textAlign: "center"
                }}
            >

                <h2>🚫 Access Denied</h2>

                <p>
                    You don't have permission
                    to access this page.
                </p>

                <p>
                    Required Permission:
                    <strong> {permission}</strong>
                </p>

            </div>

        );

    }


    return children;
}

export default ProtectedRoute;