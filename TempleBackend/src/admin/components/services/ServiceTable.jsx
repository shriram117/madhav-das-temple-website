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

        const url =
            String(imageUrl).trim();


        // ----------------------------------------------
        // CLOUDINARY / FULL URL
        // ----------------------------------------------

        if (
            url.startsWith("http://") ||
            url.startsWith("https://")
        ) {

            return url;

        }


        // ----------------------------------------------
        // OLD LOCAL IMAGE
        // ----------------------------------------------

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

    const filteredData =
        data.filter((item) => {

            return item.service_name
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                );

        });


    // ======================================================
    // UI
    // ======================================================

    return (

        <>


            {/* =================================================
                SEARCH
            ================================================= */}

            <div className="row mb-3">

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


            {/* =================================================
                TABLE
            ================================================= */}

            <div className="table-responsive">

                <table
                    className="
                        table
                        table-bordered
                        table-hover
                        align-middle
                    "
                >


                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <thead className="table-dark">

                        <tr>

                            <th
                                style={{
                                    width: "70px"
                                }}
                            >
                                #
                            </th>


                            <th
                                style={{
                                    width: "120px"
                                }}
                            >
                                Image
                            </th>


                            <th>
                                Service Name
                            </th>


                            <th>
                                Description
                            </th>


                            <th
                                style={{
                                    width: "120px"
                                }}
                            >
                                Order
                            </th>


                            <th
                                style={{
                                    width: "120px"
                                }}
                            >
                                Status
                            </th>


                            <th
                                style={{
                                    width: "180px"
                                }}
                            >
                                Action
                            </th>

                        </tr>

                    </thead>


                    {/* =================================================
                        BODY
                    ================================================= */}

                    <tbody>

                        {filteredData.length > 0 ? (

                            filteredData.map(
                                (item, index) => (

                                    <tr
                                        key={
                                            item.service_id
                                        }
                                    >


                                        {/* =================================
                                            NUMBER
                                        ================================= */}

                                        <td>

                                            {
                                                index + 1
                                            }

                                        </td>


                                        {/* =================================
                                            IMAGE
                                        ================================= */}

                                        <td>

                                            {
                                                item.image_url ? (

                                                    <img
                                                        src={item.image_url}
                                                        width="90"
                                                        height="60"
                                                        alt={item.title || "Event"}
                                                        style={{
                                                            objectFit: "cover",
                                                            borderRadius: "8px"
                                                        }}
                                                        onError={(e) => {
                                                            console.log("IMAGE LOAD ERROR:", item.image_url);
                                                            e.currentTarget.src = "/no-image.png";
                                                        }}
                                                    />

                                                ) : (

                                                    <span
                                                        className="text-muted"
                                                    >
                                                        No Image
                                                    </span>

                                                )
                                            }

                                        </td>


                                        {/* =================================
                                            SERVICE NAME
                                        ================================= */}

                                        <td>

                                            {
                                                item.service_name
                                            }

                                        </td>


                                        {/* =================================
                                            DESCRIPTION
                                        ================================= */}

                                        <td>

                                            {
                                                item.description
                                            }

                                        </td>


                                        {/* =================================
                                            DISPLAY ORDER
                                        ================================= */}

                                        <td>

                                            {
                                                item.display_order
                                            }

                                        </td>


                                        {/* =================================
                                            STATUS
                                        ================================= */}

                                        <td>

                                            {
                                                item.status === true
                                                    ? (

                                                        <span
                                                            className="service-status">                                                            "
                                                        
                                                            Active
                                                        </span>

                                                    )
                                                    : (

                                                        <span
                                                            className="
                                                                badge
                                                                bg-danger
                                                            "
                                                        >
                                                            Inactive
                                                        </span>

                                                    )
                                            }

                                        </td>


                                        {/* =================================
                                            ACTION
                                        ================================= */}

                                        <td>

                                            <button
                                                type="button"
                                                className="edit-btn"
                                                onClick={() => editRow(item)}
                                            >
                                                ✏️ Edit
                                            </button>

                                            <button
                                                type="button"
                                                className="delete-btn"
                                                onClick={() => deleteService(item.service_id)}
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
                                    className="
                                        text-center
                                        text-muted
                                    "
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