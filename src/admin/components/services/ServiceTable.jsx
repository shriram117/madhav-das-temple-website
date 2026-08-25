import { useState } from "react";
import axios from "axios";

import API_BASE_URL, {
    SERVER_URL
} from "../../../config/api";


function ServiceTable({
    data = [],
    loadServices,
    editRow
}) {

    const [search, setSearch] = useState("");


    // ======================================================
    // IMAGE URL
    // ======================================================

    const getImageUrl = (imageUrl) => {

        if (!imageUrl) {
            return "";
        }

        const url = String(imageUrl).trim();


        // Cloudinary / Complete URL
        if (
            url.startsWith("http://") ||
            url.startsWith("https://")
        ) {

            return url;

        }


        // Old Local Image
        return `${SERVER_URL}${url}`;

    };


    // ======================================================
    // DELETE SERVICE
    // ======================================================

    const deleteService = async (id) => {

        if (
            !window.confirm(
                "Are you sure you want to delete this service?"
            )
        ) {
            return;
        }


        try {

            await axios.delete(
                `${API_BASE_URL}/services/${id}`
            );


            alert(
                "Service Deleted Successfully"
            );


            await loadServices();

        }
        catch (err) {

            console.error(
                "Delete Service Error:",
                err
            );


            alert(
                err.response?.data?.message ||
                "Delete Failed"
            );

        }

    };


    // ======================================================
    // SEARCH
    // ======================================================

    const filteredData = data.filter(
        (item) =>
            item.service_name
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
    );


    // ======================================================
    // UI
    // ======================================================

    return (

        <>


            {/* ==================================================
                SEARCH
            ================================================== */}

            <div className="row mb-2">

                <div className="col-md-4">

                    <input
                        type="text"
                        id="serviceSearch"
                        name="serviceSearch"
                        className="form-control"
                        placeholder="Search Service..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </div>

            </div>


            {/* ==================================================
                TABLE
            ================================================== */}

            <div className="table-responsive">

                <table className="table table-bordered table-striped">


                    {/* ==================================================
                        HEADER
                    ================================================== */}

                    <thead>

                        <tr>
                       
                            <th>ID</th>
                            <th>Image</th>
                            <th>Service Name</th>

                            <th>Description</th>

                            <th>Order</th>

                            <th>Status</th>

                            <th>Action</th>

                          
                        </tr>

                    </thead>


                    {/* ==================================================
                        BODY
                    ================================================== */}

                    <tbody>

                        {filteredData.length > 0 ? (

                            filteredData.map(
                                (item, index) => (

                                    <tr
                                        key={
                                            item.service_id
                                        }
                                    >


                                        {/* ============================
                                            #
                                        ============================ */}

                                        <td>
                                            {index + 1}
                                        </td>


                                        {/* ============================
                                            IMAGE
                                        ============================ */}

                                        <td>

                                            {item.image_url ? (

                                                <img
                                                    src={
                                                        getImageUrl(
                                                            item.image_url
                                                        )
                                                    }
                                                    alt={
                                                        item.service_name ||
                                                        "Service"
                                                    }
                                                    width="90"
                                                    height="60"
                                                    style={{
                                                        width: "60px",
                                                        height: "48px",
                                                        objectFit: "cover",
                                                        borderRadius: "6px",
                                                        display: "block"
                                                    }}
                                                    onError={(e) => {

                                                        console.error(
                                                            "SERVICE IMAGE ERROR:",
                                                            e.currentTarget.src
                                                        );

                                                    }}
                                                />

                                            ) : (

                                                <span className="text-muted">
                                                    No Image
                                                </span>

                                            )}

                                        </td>


                                        {/* ============================
                                            SERVICE NAME
                                        ============================ */}

                                        <td>

                                            {
                                                item.service_name
                                            }

                                        </td>


                                        {/* ============================
                                            DESCRIPTION
                                        ============================ */}

                                        <td>

                                            {
                                                item.description
                                            }

                                        </td>


                                        {/* ============================
                                            ORDER
                                        ============================ */}

                                        <td>

                                            {
                                                item.display_order
                                            }

                                        </td>


                                        {/* ============================
                                            STATUS
                                        ============================ */}

                                        <td>

                                            {
                                                item.status === true
                                                    ? (

                                                        <span className="badge bg-success">
                                                            Active
                                                        </span>

                                                    )
                                                    : (

                                                        <span className="badge bg-danger">
                                                            Inactive
                                                        </span>

                                                    )
                                            }

                                        </td>


                                        {/* ============================
                                            ACTION
                                        ============================ */}

                                        <td>

                                            <button
                                                type="button"
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() =>
                                                    editRow(
                                                        item
                                                    )
                                                }
                                            >
                                                ✏️ Edit
                                            </button>


                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    deleteService(
                                                        item.service_id
                                                    )
                                                }
                                            >
                                                🗑️ Delete
                                            </button>

                                        </td>

                                    </tr>

                                )

                            )

                        ) : (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="text-center text-muted"
                                >
                                    No Services Found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </>

    );

}


export default ServiceTable;