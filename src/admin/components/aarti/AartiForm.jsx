import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../config/api";

function AartiForm({

    editData,
    loadAarti,
    closeForm

}) {

    const [aartiName, setAartiName] = useState("");
    const [aartiTime, setAartiTime] = useState("");
    const [description, setDescription] = useState("");
    const [displayOrder, setDisplayOrder] = useState(1);
    const [status, setStatus] = useState(true);

    useEffect(() => {

        if (editData) {

            setAartiName(editData.aarti_name);
            setAartiTime(editData.aarti_time);
            setDescription(editData.description || "");
            setDisplayOrder(editData.display_order);
            setStatus(editData.status);

        }

    }, [editData]);

    const saveAarti = async () => {

        try {

            const data = {

                aarti_name: aartiName,
                aarti_time: aartiTime,
                description: description,
                display_order: displayOrder,
                status: status

            };

            if (editData) {

                await axios.put(

                    `${API_BASE_URL}/aarti/${editData.aarti_id}`,

                    data

                );

            }
            else {

                await axios.post(

                    `${API_BASE_URL}/aarti`,

                    data

                );

            }

            alert("Saved Successfully");

            loadAarti();

            closeForm();

        }
        catch (err) {

            console.log(err);

            alert("Save Failed");

        }

    };

    return (

        <div className="card mb-4">

            <div className="card-header">

                <h5>

                    {

                        editData

                            ? "✏ Edit Aarti"

                            : "➕ Add Aarti"

                    }

                </h5>

            </div>

            <div className="card-body">

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label>

                            Aarti Name

                        </label>

                        <input

                            className="form-control"

                            value={aartiName}

                            onChange={(e) =>
                                setAartiName(e.target.value)
                            }

                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>

                            Aarti Time

                        </label>

                        <input

                            className="form-control"

                            placeholder="05:30 AM"

                            value={aartiTime}

                            onChange={(e) =>
                                setAartiTime(e.target.value)
                            }

                        />

                    </div>

                    <div className="col-md-12 mb-3">

                        <label>

                            Description

                        </label>

                        <textarea

                            rows="3"

                            className="form-control"

                            value={description}

                            onChange={(e) =>
                                setDescription(e.target.value)
                            }

                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>

                            Display Order

                        </label>

                        <input

                            type="number"

                            className="form-control"

                            value={displayOrder}

                            onChange={(e) =>
                                setDisplayOrder(e.target.value)
                            }

                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>

                            Status

                        </label>

                        <select

                            className="form-control"

                            value={status}

                            onChange={(e) =>
                                setStatus(e.target.value === "true")
                            }

                        >

                            <option value="true">

                                Active

                            </option>

                            <option value="false">

                                Inactive

                            </option>

                        </select>

                    </div>

                </div>

                <div className="text-end">

                    <button

                        className="btn btn-secondary me-2"

                        onClick={closeForm}

                    >

                        Cancel

                    </button>

                    <button

                        className="btn btn-success"

                        onClick={saveAarti}

                    >

                        Save

                    </button>

                </div>

            </div>

        </div>

    );

}

export default AartiForm;