import { useEffect, useState } from "react";
import axios from "axios";
///import API_BASE_URL from "../../../config/api";
import API_BASE_URL, { SERVER_URL } from "../../../config/api";
function ServiceForm({

    editData,
    loadServices,
    closeForm

}) {

    const [serviceName, setServiceName] = useState("");

    const [description, setDescription] = useState("");

    const [displayOrder, setDisplayOrder] = useState(1);

    const [status, setStatus] = useState(true);

    const [image, setImage] = useState(null);

    const [oldImage, setOldImage] = useState("");

    useEffect(() => {

        if (editData) {

            setServiceName(editData.service_name);

            setDescription(editData.description || "");

            setDisplayOrder(editData.display_order);

            setStatus(editData.status);

            setOldImage(editData.image_url);

        }

    }, [editData]);

    const saveService = async () => {

        try {

            const formData = new FormData();

            formData.append("service_name", serviceName);
            formData.append("description", description);
            formData.append("display_order", displayOrder);
            formData.append("status", status);

            if (image) {

                formData.append("image", image);

            }

            if (editData) {

                await axios.put(

                    `${API_BASE_URL}/services/${editData.service_id}`,

                    formData,

                    {

                        headers: {

                            "Content-Type": "multipart/form-data"

                        }

                    }

                );

            }
            else {

                await axios.post(

                    `${API_BASE_URL}/services`,

                    formData,

                    {

                        headers: {

                            "Content-Type": "multipart/form-data"

                        }

                    }

                );

            }

            alert("Service Saved Successfully");

            loadServices();

            closeForm();

        }
        catch (err) {

            console.log(err);

            alert(

                err.response?.data?.message ||

                "Save Failed"

            );

        }

    };
    return (

        <div className="card shadow-sm mb-4">

            <div className="card-header bg-primary text-white">

                <h5 className="mb-0">

                    {

                        editData

                            ? "✏ Edit Temple Service"

                            : "➕ Add Temple Service"

                    }

                </h5>

            </div>

            <div className="card-body">

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Service Name

                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={serviceName}
                            onChange={(e) =>
                                setServiceName(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

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

                    <div className="col-md-12 mb-3">

                        <label className="form-label">

                            Description

                        </label>

                        <textarea
                            rows="4"
                            className="form-control"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Service Image

                        </label>

                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={(e) =>
                                setImage(e.target.files[0])
                            }
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Status

                        </label>

                        <select
                            className="form-select"
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

                    {

                        oldImage && (

                            <div className="col-md-12 mb-3">

                                <label className="form-label">

                                    Current Image

                                </label>

                                <br />

                                <img
                                                                        src={`${SERVER_URL}${oldImage}`}
                                    alt="Service"
                                    className="img-thumbnail"
                                    style={{
                                        width: "200px",
                                        height: "120px",
                                        objectFit: "cover"
                                    }}
                                />

                            </div>

                        )

                    }
                    <div className="col-md-12 text-end">

                        <button
                            type="button"
                            className="btn btn-secondary me-2"
                            onClick={closeForm}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={saveService}
                        >
                            {
                                editData
                                    ? "Update Service"
                                    : "Save Service"
                            }
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ServiceForm;