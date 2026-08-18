import Sidebar from "./Sidebar";
import Header from "./Header";

function AdminLayout({ children }) {

    return (

        <>
            <Sidebar />
            <Header />

            <div
                style={{
                    marginLeft: "250px",
                    marginTop: "60px",
                    padding: "25px",
                    minHeight: "calc(100vh - 70px)",
                    background: "#f3f4f6"
                }}
            >
                {children}
            </div>
        </>

    );

}

export default AdminLayout;