import { useState, useEffect } from "react";
import api from "../../config/axios";

function GalleryForm({ loadGallery, editData, closeForm }) {

    const [galleryId, setGalleryId] = useState(0);

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [category, setCategory] = useState("");

    const [image, setImage] = useState(null);

    const [saving, setSaving] = useState(false);


    // =====================================================
    // LOAD EDIT DATA
    // =====================================================

    useEffect(() => {

        if (editData) {

            setGalleryId(
                editData.gallery_id
            );

            setTitle(
                editData.title || ""
            );

            setDescription(
                editData.description || ""
            );

            setCategory(
                editData.category || ""
            );

            // Important:
            // Existing image is NOT put into file input.
            setImage(null);

        }
        else {

            setGalleryId(0);

            setTitle("");

            setDescription("");

            setCategory("");

            setImage(null);

        }

    }, [editData]);


    // =====================================================
    // IMAGE SELECT
    // =====================================================

    const handleImageChange = (e) => {

        const selectedFile =
            e.target.files?.[0];


        if (!selectedFile) {

            setImage(null);

            return;

        }


        // Check image type

        if (
            !selectedFile.type.startsWith(
                "image/"
            )
        ) {

            alert(
                "Please select a valid image file."
            );

            e.target.value = "";

            setImage(null);

            return;

        }


        // Check size - 5 MB

        if (
            selectedFile.size >
            5 * 1024 * 1024
        ) {

            alert(
                "Image size must be less than 5 MB."
            );

            e.target.value = "";

            setImage(null);

            return;

        }


        console.log(
            "Selected Gallery Image:",
            selectedFile.name
        );

        console.log(
            "Image Size:",
            selectedFile.size
        );

        console.log(
            "Image Type:",
            selectedFile.type
        );


        setImage(
            selectedFile
        );

    };


    // =====================================================
    // SAVE GALLERY
    // =====================================================

    const saveGallery = async () => {

        // -------------------------------------------------
        // VALIDATION
        // -------------------------------------------------

        if (
            title.trim() === ""
        ) {

            alert(
                "Please enter Title."
            );

            return;

        }


        if (
            category.trim() === ""
        ) {

            alert(
                "Please enter Category."
            );

            return;

        }


        if (
            description.trim() === ""
        ) {

            alert(
                "Please enter Description."
            );

            return;

        }


        // -------------------------------------------------
        // NEW GALLERY = IMAGE REQUIRED
        // -------------------------------------------------

        if (
            galleryId === 0 &&
            !image
        ) {

            alert(
                "Please select a Gallery image."
            );

            return;

        }


        // -------------------------------------------------
        // IMAGE VALIDATION
        // -------------------------------------------------

        if (image) {

            if (
                !image.type.startsWith(
                    "image/"
                )
            ) {

                alert(
                    "Please select a valid image file."
                );

                return;

            }


            if (
                image.size >
                5 * 1024 * 1024
            ) {

                alert(
                    "Image size must be less than 5 MB."
                );

                return;

            }

        }


        try {

            setSaving(true);


            // =================================================
            // FORM DATA
            // =================================================

            const formData =
                new FormData();


            formData.append(
                "title",
                title.trim()
            );


            formData.append(
                "description",
                description.trim()
            );


            formData.append(
                "category",
                category.trim()
            );


            // =================================================
            // ADD
            // =================================================

            if (
                galleryId === 0
            ) {

                formData.append(
                    "created_by",
                    "1"
                );


                // Image is required for new Gallery

                formData.append(
                    "image",
                    image
                );


                console.log(
                    "Adding Gallery..."
                );

                console.log(
                    "Image:",
                    image.name
                );

                console.log(
                    "FormData image:",
                    formData.get("image")
                );


                const response =
                    await api.post(
                        "/gallery",
                        formData
                    );


                console.log(
                    "Gallery Add Response:",
                    response.data
                );


                alert(
                    response.data?.message ||
                    "Gallery Added Successfully"
                );

            }


            // =================================================
            // UPDATE
            // =================================================

            else {

                /*
                    If user doesn't select a new image,
                    backend keeps the existing Cloudinary URL.
                */

                if (
                    editData?.image_url
                ) {

                    formData.append(
                        "old_image",
                        editData.image_url
                    );

                }
                else {

                    formData.append(
                        "old_image",
                        ""
                    );

                }


                // New image only if selected

                if (image) {

                    formData.append(
                        "image",
                        image
                    );

                    console.log(
                        "Updating Gallery with new image:",
                        image.name
                    );

                }
                else {

                    console.log(
                        "Updating Gallery without changing image"
                    );

                }


                console.log(
                    "FormData image:",
                    formData.get("image")
                );


                const response =
                    await api.put(
                        `/gallery/${galleryId}`,
                        formData
                    );


                console.log(
                    "Gallery Update Response:",
                    response.data
                );


                alert(
                    response.data?.message ||
                    "Gallery Updated Successfully"
                );

            }


            // =================================================
            // RELOAD
            // =================================================

            await loadGallery();


            // =================================================
            // RESET
            // =================================================

            setGalleryId(0);

            setTitle("");

            setDescription("");

            setCategory("");

            setImage(null);


            closeForm();

        }
        catch (err) {

            console.error(
                "Gallery Save Error:",
                err
            );


            console.error(
                "Response:",
                err.response?.data
            );


            alert(
                err.response?.data?.message ||
                err.message ||
                "Gallery Save Failed"
            );

        }
        finally {

            setSaving(false);

        }

    };


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="card mb-4">

            <div className="card-header">

                <h4>

                    {
                        galleryId === 0
                            ? "🖼 Add Gallery"
                            : "✏ Edit Gallery"
                    }

                </h4>

            </div>


            <div className="card-body">

                <div className="row">


                    {/* =================================================
                        TITLE
                    ================================================= */}

                    <div className="col-md-6 mb-3">

                        <label>
                            Title
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={
                                (e) =>
                                    setTitle(
                                        e.target.value
                                    )
                            }
                            placeholder="Enter gallery title"
                            disabled={saving}
                        />

                    </div>


                    {/* =================================================
                        CATEGORY
                    ================================================= */}

                    <div className="col-md-6 mb-3">

                        <label>
                            Category
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={category}
                            onChange={
                                (e) =>
                                    setCategory(
                                        e.target.value
                                    )
                            }
                            placeholder="Enter category"
                            disabled={saving}
                        />

                    </div>


                    {/* =================================================
                        DESCRIPTION
                    ================================================= */}

                    <div className="col-md-12 mb-3">

                        <label>
                            Description
                        </label>

                        <textarea
                            rows="3"
                            className="form-control"
                            value={description}
                            onChange={
                                (e) =>
                                    setDescription(
                                        e.target.value
                                    )
                            }
                            placeholder="Enter description"
                            disabled={saving}
                        />

                    </div>


                    {/* =================================================
                        IMAGE
                    ================================================= */}

                    <div className="col-md-12 mb-3">

                        <label>
                            Select Image
                        </label>

                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={
                                handleImageChange
                            }
                            disabled={saving}
                        />


                        {/* ADD */}

                        {
                            galleryId === 0 && (

                                <small className="text-danger">

                                    Image is required.

                                </small>

                            )
                        }


                        {/* EDIT */}

                        {
                            galleryId !== 0 && (

                                <small className="text-muted">

                                    Leave empty if you don't
                                    want to change the image.

                                </small>

                            )
                        }


                        {/* SELECTED IMAGE */}

                        {
                            image && (

                                <div
                                    className="mt-2"
                                >

                                    <strong>
                                        Selected:
                                    </strong>

                                    {" "}

                                    {image.name}

                                    {" "}

                                    (
                                    {
                                        (
                                            image.size /
                                            1024 /
                                            1024
                                        ).toFixed(2)
                                    }
                                    {" MB"}
                                    )

                                </div>

                            )
                        }

                    </div>

                </div>


                {/* =================================================
                    SAVE BUTTON
                ================================================= */}

                <button

                    type="button"

                    className={
                        galleryId === 0
                            ? "btn btn-success"
                            : "btn btn-warning"
                    }

                    onClick={
                        saveGallery
                    }

                    disabled={saving}

                >

                    {
                        saving
                            ? "Uploading..."
                            : galleryId === 0
                                ? "Upload Image"
                                : "Update Gallery"
                    }

                </button>


                {/* CLOSE */}

                <button

                    type="button"

                    className="btn btn-secondary ms-2"

                    onClick={
                        closeForm
                    }

                    disabled={saving}

                >

                    Cancel

                </button>

            </div>

        </div>

    );

}

export default GalleryForm;