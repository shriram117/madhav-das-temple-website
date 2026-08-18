import axios from "axios";
import API_BASE_URL from "../../../config/api";

function AartiTable({

    data,
    loadAarti,
    editRow

}) {

    const deleteAarti = async (id) => {

        if (!window.confirm("Are you sure you want to delete this Aarti?")) {

            return;

        }

        try {

            await axios.delete(
                `${API_BASE_URL}/aarti/${id}`
            );

            alert("Deleted Successfully");

            loadAarti();

        }
        catch (err) {

            console.log(err);

            alert("Delete Failed");

        }

    };

    return (

        <div className="card">

            <div className="card-header">

                <h5 className="mb-0">

                    🪔 Daily Aarti List

                </h5>

            </div>

            <div className="card-body">

                <div className="table-responsive">

                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">

                            <tr>

                                <th>#</th>

                                <th>Aarti Name</th>

                                <th>Time</th>

                                <th>Description</th>

                                <th>Order</th>

                                <th>Status</th>

                                <th width="150">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                data.length === 0 ?

                                    (

                                        <tr>

                                            <td
                                                colSpan="7"
                                                className="text-center"
                                            >

                                                No Records Found

                                            </td>

                                        </tr>

                                    )

                                    :

                                    data.map((item, index) => (

                                        <tr key={item.aarti_id}>

                                            <td>

                                                {index + 1}

                                            </td>

                                            <td>

                                                {item.aarti_name}

                                            </td>

                                            <td>

                                                {item.aarti_time}

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

                                                    className="btn btn-warning btn-sm me-2"

                                                    onClick={() =>
                                                        editRow(item)
                                                    }

                                                >

                                                    Edit

                                                </button>

                                                <button

                                                    className="btn btn-danger btn-sm"

                                                    onClick={() =>
                                                        deleteAarti(item.aarti_id)
                                                    }

                                                >

                                                    Delete

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default AartiTable;