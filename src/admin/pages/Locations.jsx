import AdminLayout from "../components/AdminLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Locations.css";
import LocationForm from "../components/LocationForm";
import API_BASE_URL, {
    SERVER_URL
} from "../../config/api";

function Locations() {

    const [locations, setLocations] = useState([]);

    const [editData, setEditData] = useState(null);

    const [showForm, setShowForm] = useState(false);


    // =========================================
    // LOAD LOCATIONS
    // =========================================

    const loadLocations = async () => {

        try {

            const response = await axios.get(
                `${API_BASE_URL}/locations`
            );

            setLocations(response.data);

        }
        catch (error) {

            console.error(
                "Load Locations Error:",
                error
            );

            alert("Unable to load temple locations.");

        }

    };


    // =========================================
    // DELETE LOCATION
    // =========================================

    const deleteLocation = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this temple location?"
        );

        if (!confirmDelete) return;


        try {

            await axios.delete(
                `${API_BASE_URL}/locations/${id}`
            );

            alert(
                "Temple Location Deleted Successfully"
            );

            loadLocations();

        }
        catch (error) {

            console.error(
                "Delete Location Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Delete Failed"
            );

        }

    };


    // =========================================
    // EDIT LOCATION
    // =========================================

    const editLocation = (item) => {

        setEditData(item);

        setShowForm(true);

    };


    // =========================================
    // LOAD ON PAGE OPEN
    // =========================================

    useEffect(() => {

        loadLocations();

    }, []);


    return (

        <AdminLayout>

            <div className="locations-page">


                {/* =====================================
                    HEADER
                ===================================== */}

                <div className="locations-header">

                    <h2>
                        📍 Temple Locations
                    </h2>


                    <button
                        className="btn btn-primary"
                        onClick={() => {

                            setEditData(null);

                            setShowForm(!showForm);

                        }}
                    >

                        {
                            showForm
                                ? "Close Form"
                                : "+ Add Location"
                        }

                    </button>

                </div>


                {/* =====================================
                    FORM
                ===================================== */}

                {
                    showForm && (

                        <LocationForm

                            loadLocations={loadLocations}

                            editData={editData}

                            closeForm={() => {

                                setShowForm(false);

                                setEditData(null);

                            }}

                        />

                    )
                }


                {/* =====================================
                    TABLE
                ===================================== */}

                <div className="table-responsive">

                    <table className="table table-bordered table-striped">

                        <thead>

                            <tr>

                                <th>ID</th>

                                <th>Photo</th>

                                <th>Temple Name</th>

                                <th>State</th>

                                <th>City</th>

                                <th>Mobile</th>

                                <th>Timings</th>

                                <th>Status</th>

                                <th>Action</th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                locations.map((item) => (

                                    <tr
                                        key={
                                            item.location_id
                                        }
                                    >

                                        {/* ID */}

                                        <td>
                                            {
                                                item.location_id
                                            }
                                        </td>


                                        {/* PHOTO */}

                                        <td>

                                            {
                                                item.image_url ? (

                                                    <img

                                                        src={
                                                            item.image_url.startsWith(
                                                                "http"
                                                            )
                                                                ? item.image_url
                                                                : `${SERVER_URL}${item.image_url}`
                                                        }

                                                        alt={
                                                            item.temple_name
                                                        }

                                                        width="70"

                                                        height="70"

                                                        style={{
                                                            objectFit:
                                                                "cover",

                                                            borderRadius:
                                                                "8px",

                                                            border:
                                                                "1px solid #ddd"
                                                        }}

                                                        onError={(
                                                            e
                                                        ) => {

                                                            e.target.style.display =
                                                                "none";

                                                        }}

                                                    />

                                                ) : (

                                                    <span>
                                                        🛕
                                                    </span>

                                                )
                                            }

                                        </td>


                                        {/* TEMPLE NAME */}

                                        <td>
                                            {
                                                item.temple_name
                                            }
                                        </td>


                                        {/* STATE */}

                                        <td>
                                            {
                                                item.state ||
                                                "-"
                                            }
                                        </td>


                                        {/* CITY */}

                                        <td>
                                            {
                                                item.city ||
                                                "-"
                                            }
                                        </td>


                                        {/* MOBILE */}

                                        <td>
                                            {
                                                item.mobile_no ||
                                                "-"
                                            }
                                        </td>


                                        {/* TIMINGS */}

                                        <td>
                                            {
                                                item.timings ||
                                                "-"
                                            }
                                        </td>


                                        {/* STATUS */}

                                        <td>

                                            <span

                                                className={
                                                    item.status
                                                        ? "status-active"
                                                        : "status-inactive"
                                                }

                                            >

                                                {
                                                    item.status
                                                        ? "Active"
                                                        : "Inactive"
                                                }

                                            </span>

                                        </td>


                                        {/* ACTION */}

                                        <td>

                                            <button

                                                className="btn btn-warning btn-sm me-2"

                                                onClick={() =>
                                                    editLocation(
                                                        item
                                                    )
                                                }

                                            >

                                                Edit

                                            </button>


                                            <button

                                                className="btn btn-danger btn-sm"

                                                onClick={() =>
                                                    deleteLocation(
                                                        item.location_id
                                                    )
                                                }

                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                ))
                            }


                            {/* NO DATA */}

                            {
                                locations.length === 0 && (

                                    <tr>

                                        <td
                                            colSpan="9"
                                            className="text-center"
                                        >

                                            No Temple Locations Found

                                        </td>

                                    </tr>

                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>

    );

}

export default Locations;