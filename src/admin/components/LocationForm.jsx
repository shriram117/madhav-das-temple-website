import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";

function LocationForm({
    loadLocations,
    editData,
    closeForm
}) {

    const [formData, setFormData] = useState({

        temple_name: "",
        state: "",
        city: "",
        address: "",
        mobile_no: "",
        timings: "",
        google_map_url: "",
        description: "",
        display_order: 1,
        status: true,
        image: null

    });

    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);


    // =========================================
    // LOAD EDIT DATA
    // =========================================

    useEffect(() => {

        if (editData) {

            setFormData({

                temple_name: editData.temple_name || "",
                state: editData.state || "",
                city: editData.city || "",
                address: editData.address || "",
                mobile_no: editData.mobile_no || "",
                timings: editData.timings || "",
                google_map_url: editData.google_map_url || "",
                description: editData.description || "",

                display_order:
                    editData.display_order || 1,

                status:
                    editData.status === undefined
                        ? true
                        : editData.status,

                image: null

            });

            // Existing Cloudinary image
            setImagePreview(editData.image_url || "");

        }
        else {

            setFormData({

                temple_name: "",
                state: "",
                city: "",
                address: "",
                mobile_no: "",
                timings: "",
                google_map_url: "",
                description: "",
                display_order: 1,
                status: true,
                image: null

            });

            setImagePreview("");

        }

    }, [editData]);


    // =========================================
    // HANDLE TEXT / CHECKBOX CHANGE
    // =========================================

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;

        setFormData((previous) => ({

            ...previous,

            [name]:
                type === "checkbox"
                    ? checked
                    : value

        }));

    };


    // =========================================
    // HANDLE IMAGE
    // =========================================

    const handleImageChange = (e) => {

        const file = e.target.files?.[0];

        if (!file) {

            setFormData((previous) => ({
                ...previous,
                image: null
            }));

            return;

        }


        // Maximum 5 MB

        if (file.size > 5 * 1024 * 1024) {

            alert(
                "Image size must be less than 5 MB."
            );

            e.target.value = "";

            return;

        }


        // Allowed image types

        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp"
        ];


        if (!allowedTypes.includes(file.type)) {

            alert(
                "Only JPG, JPEG, PNG and WEBP images are allowed."
            );

            e.target.value = "";

            return;

        }


        setFormData((previous) => ({

            ...previous,

            image: file

        }));


        // Preview selected image

        const previewUrl =
            URL.createObjectURL(file);

        setImagePreview(previewUrl);

    };


    // =========================================
    // VALIDATE FORM
    // =========================================

    const validateForm = () => {

        if (!formData.temple_name.trim()) {

            alert("Please enter temple name.");

            return false;

        }


        // Mobile validation

        if (formData.mobile_no.trim()) {

            const mobile =
                formData.mobile_no.trim();

            const mobileRegex =
                /^[0-9+\-\s]{7,20}$/;

            if (!mobileRegex.test(mobile)) {

                alert(
                    "Please enter a valid mobile number."
                );

                return false;

            }

        }


        // Google Maps URL validation

        if (formData.google_map_url.trim()) {

            try {

                const url =
                    new URL(
                        formData.google_map_url.trim()
                    );

                if (
                    url.protocol !== "http:" &&
                    url.protocol !== "https:"
                ) {

                    alert(
                        "Please enter a valid Google Maps URL."
                    );

                    return false;

                }

            }
            catch {

                alert(
                    "Please enter a valid Google Maps URL."
                );

                return false;

            }

        }


        return true;

    };


    // =========================================
    // SUBMIT
    // =========================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!validateForm()) {

            return;

        }


        setLoading(true);


        try {

            const data = new FormData();


            // =====================================
            // FORM DATA
            // =====================================

            data.append(
                "temple_name",
                formData.temple_name.trim()
            );

            data.append(
                "state",
                formData.state.trim()
            );

            data.append(
                "city",
                formData.city.trim()
            );

            data.append(
                "address",
                formData.address.trim()
            );

            data.append(
                "mobile_no",
                formData.mobile_no.trim()
            );

            data.append(
                "timings",
                formData.timings.trim()
            );

            data.append(
                "google_map_url",
                formData.google_map_url.trim()
            );

            data.append(
                "description",
                formData.description.trim()
            );

            data.append(
                "display_order",
                formData.display_order
            );

            data.append(
                "status",
                formData.status
            );


            // =====================================
            // IMAGE
            // =====================================

            if (formData.image) {

                data.append(
                    "image",
                    formData.image
                );

            }


            // =====================================
            // UPDATE
            // =====================================

            if (editData) {

                await axios.put(

                    `${API_BASE_URL}/locations/${editData.location_id}`,

                    data

                );

                alert(
                    "Temple Location Updated Successfully."
                );

            }


            // =====================================
            // CREATE
            // =====================================

            else {

                data.append(
                    "created_by",
                    "1"
                );


                await axios.post(

                    `${API_BASE_URL}/locations`,

                    data

                );

                alert(
                    "Temple Location Added Successfully."
                );

            }


            // =====================================
            // REFRESH LIST
            // =====================================

            await loadLocations();

            closeForm();

        }
        catch (error) {

            console.error(
                "Location Save Error:",
                error
            );


            alert(

                error.response?.data?.message ||

                error.response?.data?.error ||

                "Unable to save temple location."

            );

        }
        finally {

            setLoading(false);

        }

    };


    // =========================================
    // UI
    // =========================================

    return (

        <div className="card mb-4 shadow-sm">

            <div className="card-header">

                <h4 className="mb-0">

                    {
                        editData
                            ? "✏️ Edit Temple Location"
                            : "📍 Add Temple Location"
                    }

                </h4>

            </div>


            <div className="card-body">

                <form onSubmit={handleSubmit}>


                    {/* =================================
                        TEMPLE NAME
                    ================================= */}

                    <div className="mb-3">

                        <label className="form-label">

                            Temple Name *

                        </label>

                        <input
                            type="text"
                            name="temple_name"
                            className="form-control"
                            value={formData.temple_name}
                            onChange={handleChange}
                            placeholder="Enter temple name"
                            required
                            disabled={loading}
                        />

                    </div>


                    {/* =================================
                        STATE + CITY
                    ================================= */}

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                State

                            </label>

                            <input
                                type="text"
                                name="state"
                                className="form-control"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="Rajasthan / Madhya Pradesh / Bihar"
                                disabled={loading}
                            />

                        </div>


                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                City

                            </label>

                            <input
                                type="text"
                                name="city"
                                className="form-control"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Jaipur / Indore / Patna"
                                disabled={loading}
                            />

                        </div>

                    </div>


                    {/* =================================
                        ADDRESS
                    ================================= */}

                    <div className="mb-3">

                        <label className="form-label">

                            Address

                        </label>

                        <textarea
                            name="address"
                            className="form-control"
                            rows="2"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter complete temple address"
                            disabled={loading}
                        />

                    </div>


                    {/* =================================
                        MOBILE + TIMINGS
                    ================================= */}

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Mobile Number

                            </label>

                            <input
                                type="text"
                                name="mobile_no"
                                className="form-control"
                                value={formData.mobile_no}
                                onChange={handleChange}
                                placeholder="Enter contact number"
                                maxLength="20"
                                disabled={loading}
                            />

                        </div>


                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Darshan / Temple Timings

                            </label>

                            <input
                                type="text"
                                name="timings"
                                className="form-control"
                                value={formData.timings}
                                onChange={handleChange}
                                placeholder="5:30 AM - 9:00 PM"
                                disabled={loading}
                            />

                        </div>

                    </div>


                    {/* =================================
                        GOOGLE MAP
                    ================================= */}

                    <div className="mb-3">

                        <label className="form-label">

                            📍 Google Maps Link

                        </label>

                        <input
                            type="url"
                            name="google_map_url"
                            className="form-control"
                            value={formData.google_map_url}
                            onChange={handleChange}
                            placeholder="https://maps.app.goo.gl/..."
                            disabled={loading}
                        />

                        <small className="text-muted">

                            Google Maps खोलें → Temple search करें →
                            Share → Copy Link → यहाँ paste करें।

                        </small>

                    </div>


                    {/* =================================
                        IMAGE
                    ================================= */}

                    <div className="mb-3">

                        <label className="form-label">

                            🖼️ Temple Photo

                        </label>

                        <input
                            type="file"
                            name="image"
                            className="form-control"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={handleImageChange}
                            disabled={loading}
                        />

                        <small className="text-muted">

                            JPG, JPEG, PNG or WEBP | Maximum 5 MB

                        </small>


                        {/* IMAGE PREVIEW */}

                        {imagePreview && (

                            <div className="mt-3">

                                <p className="mb-2">

                                    <strong>
                                        {formData.image
                                            ? "New Image Preview"
                                            : "Current Image"}
                                    </strong>

                                </p>

                                <img
                                    src={imagePreview}
                                    alt="Temple Preview"
                                    style={{
                                        width: "180px",
                                        height: "130px",
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                        border: "1px solid #ddd",
                                        padding: "3px"
                                    }}
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                    }}
                                />

                            </div>

                        )}

                    </div>


                    {/* =================================
                        DESCRIPTION
                    ================================= */}

                    <div className="mb-3">

                        <label className="form-label">

                            Description

                        </label>

                        <textarea
                            name="description"
                            className="form-control"
                            rows="3"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter temple description"
                            disabled={loading}
                        />

                    </div>


                    {/* =================================
                        DISPLAY ORDER
                    ================================= */}

                    <div className="mb-3">

                        <label className="form-label">

                            Display Order

                        </label>

                        <input
                            type="number"
                            name="display_order"
                            className="form-control"
                            min="1"
                            value={formData.display_order}
                            onChange={handleChange}
                            disabled={loading}
                        />

                    </div>


                    {/* =================================
                        STATUS
                    ================================= */}

                    <div className="form-check mb-3">

                        <input
                            type="checkbox"
                            name="status"
                            className="form-check-input"
                            id="locationStatus"
                            checked={formData.status}
                            onChange={handleChange}
                            disabled={loading}
                        />

                        <label
                            className="form-check-label"
                            htmlFor="locationStatus"
                        >

                            Active Location

                        </label>

                    </div>


                    {/* =================================
                        BUTTONS
                    ================================= */}

                    <button
                        type="submit"
                        className="btn btn-success me-2"
                        disabled={loading}
                    >

                        {loading ? (

                            <>
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                />

                                {editData
                                    ? "Updating..."
                                    : "Saving..."}
                            </>

                        ) : (

                            editData
                                ? "Update Location"
                                : "Save Location"

                        )}

                    </button>


                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={closeForm}
                        disabled={loading}
                    >

                        Cancel

                    </button>

                </form>

            </div>

        </div>

    );

}

export default LocationForm;