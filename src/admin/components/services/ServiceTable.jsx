import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../config/api";

function ServiceTable({

    data,

    loadServices,

    editRow

}) {

    const [search, setSearch] = useState("");

    const deleteService = async (id) => {

        if (!window.confirm("Are you sure you want to delete this service?")) {

            return;

        }

        try {

            await axios.delete(

                `${API_BASE_URL}/services/${id}`

            );

            alert("Service Deleted Successfully");

            loadServices();

        }
        catch (err) {

            console.log(err);

            alert("Delete Failed");

        }

    };

    const filteredData = data.filter((item) =>

        item.service_name
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (
                <>

            <div className="row mb-3">

                <div className="col-md-4">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Service..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

            </div>

            <div className="table-responsive">

                <table className="table table-bordered table-hover align-middle">

                    <thead className="table-dark">

                        <tr>

                            <th style={{ width: "70px" }}>

                                #

                            </th>

                            <th style={{ width: "120px" }}>

                                Image

                            </th>

                            <th>

                                Service Name

                            </th>

                            <th>

                                Description

                            </th>

                            <th style={{ width: "120px" }}>

                                Order

                            </th>

                            <th style={{ width: "120px" }}>

                                Status

                            </th>

                            <th style={{ width: "180px" }}>

                                Action

                            </th>

                        </tr>

                    </thead>

                    <tbody>
                        {

                            filteredData.length > 0 ?

                                filteredData.map((item, index) => (

                                    <tr key={item.service_id}>

                                        <td>

                                            {index + 1}

                                        </td>

                                        <td>

                                            {

                                                item.image_url ?

                                                    <img

                                                        src={`http://localhost:5000${item.image_url}`}

                                                        alt="Service"

                                                        style={{

                                                            width: "80px",

                                                            height: "60px",

                                                            objectFit: "cover",

                                                            borderRadius: "8px"

                                                        }}

                                                    />

                                                    :

                                                    <span className="text-muted">

                                                        No Image

                                                    </span>

                                            }

                                        </td>

                                        <td>

                                            {item.service_name}

                                        </td>

                                        <td>

                                            {item.description}

                                        </td>

                                        <td>

                                            {item.display_order}

                                        </td>

                                        <td>

                                            {

                                                item.status ?

                                                    <span className="badge bg-success">

                                                        Active

                                                    </span>

                                                    :

                                                    <span className="badge bg-danger">

                                                        Inactive

                                                    </span>

                                            }

                                        </td>

                                        <td>
                                            <button
                                                className="btn btn-sm btn-primary me-2"
                                                onClick={() => editRow(item)}
                                            >
                                                ✏ Edit
                                            </button>

                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => deleteService(item.service_id)}
                                            >
                                                🗑 Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                                :

                                (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="text-center text-muted"
                                        >

                                            No Services Found

                                        </td>

                                    </tr>

                                )

                        }

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default ServiceTable;