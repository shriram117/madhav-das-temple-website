import { Navigate } from "react-router-dom";

function ProtectedRoute({ permission, children }) {

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    console.log("================================");
    console.log("PATH:", window.location.pathname);
    console.log("PERMISSION PROP:", permission);
    console.log("USER:", user);
    console.log(
        "USER PERMISSION:",
        user?.permissions?.[permission]
    );
    console.log("================================");


    if (!user) {
        return <Navigate to="/login" replace />;
    }


    if (user.role === "Super Admin") {
        return children;
    }


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
                    You don't have permission to access this page.
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