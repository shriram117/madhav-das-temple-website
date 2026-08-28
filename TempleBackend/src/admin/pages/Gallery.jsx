import AdminLayout from "../components/AdminLayout";
import { useEffect, useState } from "react";

import "../css/Gallery.css";

import GalleryForm from "../components/GalleryForm";

import api from "../../config/axios";

import { SERVER_URL } from "../../config/api";


function Gallery() {

    const [gallery, setGallery] = useState([]);

    const [editData, setEditData] = useState(null);

    const [showForm, setShowForm] = useState(false);


    // =========================================
    // IMAGE URL
    // =========================================

    const getImageUrl = (imageUrl) => {

        if (!imageUrl) {
            return "";
        }

        // Cloudinary URL
        if (
            imageUrl.startsWith("http://") ||
            imageUrl.startsWith("https://")
        ) {

            return imageUrl;

        }

        // Old local upload URL
        return `${SERVER_URL}${imageUrl}`;

    };


    // =========================================
    // LOAD GALLERY
    // =========================================

    const loadGallery = async () => {

        try {

            const response =
                await api.get("/gallery");

            setGallery(
                response.data
            );

        }
        catch (error) {

            console.log(
                "Gallery Load Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to load gallery."
            );

        }

    };


    // =========================================
    // DELETE GALLERY
    // =========================================

    const deleteGallery = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this image?"
            );

        if (!confirmDelete) {
            return;
        }


        try {

            await api.delete(
                `/gallery/${id}`
            );


            alert(
                "Gallery Deleted Successfully"
            );


            await loadGallery();

        }
        catch (err) {

            console.error(
                "Delete Gallery Error:",
                err
            );


            alert(
                err.response?.data?.message ||
                "Delete Failed"
            );

        }

    };


    // =========================================
    // EDIT GALLERY
    // =========================================

    const editGallery = (item) => {

        setEditData(item);

        setShowForm(true);

    };


    // =========================================
    // ADD NEW
    // =========================================

    const openAddForm = () => {

        setEditData(null);

        setShowForm(true);

    };


    // =========================================
    // CLOSE FORM
    // =========================================

    const closeForm = () => {

        setShowForm(false);

        setEditData(null);

    };


    // =========================================
    // LOAD ON PAGE OPEN
    // =========================================

    useEffect(() => {

        loadGallery();

    }, []);


    return (

        <AdminLayout>

            <div className="gallery-page">


                {/* =====================================
                    HEADER
                ===================================== */}

                <div className="gallery-header">

                    <h2>
                        🖼 Gallery Management
                    </h2>


                    <button
                        className="btn btn-primary"
                        onClick={() => {

                            if (showForm) {

                                closeForm();

                            }
                            else {

                                openAddForm();

                            }

                        }}
                    >

                        {
                            showForm
                                ? "Close Form"
                                : "+ Add Image"
                        }

                    </button>

                </div>


                {/* =====================================
                    FORM
                ===================================== */}

                {
                    showForm && (

                        <GalleryForm

                            loadGallery={
                                loadGallery
                            }

                            editData={
                                editData
                            }

                            closeForm={
                                closeForm
                            }

                        />

                    )
                }


                {/* =====================================
                    TABLE
                ===================================== */}

                <table
                    className="table table-bordered table-striped"
                >

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Preview</th>

                            <th>Title</th>

                            <th>Description</th>

                            <th>Category</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>


                    <tbody>

                        {
                            gallery.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        style={{
                                            textAlign: "center"
                                        }}
                                    >

                                        No gallery images found.

                                    </td>

                                </tr>

                            ) : (

                                gallery.map((item) => (

                                    <tr
                                        key={
                                            item.gallery_id
                                        }
                                    >

                                        {/* ID */}

                                        <td>
                                            {
                                                item.gallery_id
                                            }
                                        </td>


                                        {/* IMAGE */}

                                        <td>
                                            <img
                                                src={getImageUrl(item.image_url)}
                                                alt={item.title || "Gallery"}
                                                className="gallery-preview"
                                                onError={(e) => {
                                                    console.log(
                                                        "Image failed:",
                                                        e.currentTarget.src
                                                    );
                                                }}
                                            />
                                        </td>

                                                ) : (

                                                    <span>
                                                        No Image
                                                    </span>

                                                )

                                            }

                                        </td>


                                        {/* TITLE */}

                                        <td>
                                            {
                                                item.title
                                            }
                                        </td>


                                        {/* DESCRIPTION */}

                                        <td>
                                            {
                                                item.description
                                            }
                                        </td>


                                        {/* CATEGORY */}

                                        <td>
                                            {
                                                item.category
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
                                                    editGallery(
                                                        item
                                                    )
                                                }

                                            >

                                                Edit

                                            </button>


                                            <button

                                                className="btn btn-danger btn-sm"

                                                onClick={() =>
                                                    deleteGallery(
                                                        item.gallery_id
                                                    )
                                                }

                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )
                        }

                    </tbody>

                </table>

            </div>

        </AdminLayout>

    );

}


export default Gallery;