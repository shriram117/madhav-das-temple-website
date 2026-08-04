import AdminLayout from "../components/AdminLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Gallery.css";
import GalleryForm from "../components/GalleryForm";
function Gallery() {

    const [gallery, setGallery] = useState([]);
    const [editData, setEditData] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const loadGallery = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/gallery"
            );

            setGallery(response.data);

        } catch (error) {

            console.log(error);

            alert("Unable to load gallery.");

        }

    };
    const deleteGallery = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this image?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(
                "http://localhost:5000/api/gallery/" + id
            );

            alert("Gallery Deleted Successfully");

            loadGallery();

        } catch (err) {

            console.error(err);

            alert(err.response?.data?.message || "Delete Failed");

        }

    };

    const editGallery = (item) => {

        setEditData(item);

        setShowForm(true);

    };

    useEffect(() => {

        loadGallery();

    }, []);

    return (

        <AdminLayout>
        <div className="gallery-page">

            <div className="gallery-header">

                <h2>🖼 Gallery Management</h2>

                    <button
                        className="btn btn-primary"
                        onClick={() => {

                            setEditData(null);

                            setShowForm(!showForm);

                        }}
                    >
                        {showForm ? "Close Form" : "+ Add Image"}
                    </button>

            </div>

                {
                    showForm && (

                        <GalleryForm
                            loadGallery={loadGallery}
                            editData={editData}
                            closeForm={() => {

                                setShowForm(false);

                                setEditData(null);

                            }}
                        />

                    )
                }
            <table className="table table-bordered table-striped">

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
                   gallery.map((item) => (

                    <tr key={item.gallery_id}>

                        <td>{item.gallery_id}</td>

                        <td>

                               <img
                                   src={`http://localhost:5000${item.image_url}`}
                                   alt={item.title}
                                   width="100"
                                   height="70"
                                   style={{
                                       objectFit: "cover",
                                       borderRadius: "8px",
                                       border: "1px solid #ddd"
                                   }}
                                   onError={(e) => {
                                       console.log("Image URL:", e.target.src);
                                       e.target.src = "https://via.placeholder.com/100x70?text=No+Image";
                                   }}
                               />

                        </td>

                        <td>{item.title}</td>

                        <td>{item.description}</td>

                        <td>{item.category}</td>

                        <td>
                            <span
                                className={
                                    item.status
                                        ? "status-active"
                                        : "status-inactive"
                                }
                            >
                                {item.status ? "Active" : "Inactive"}
                            </span>
                        </td>

                        <td>

                               <button
                                   className="btn btn-warning btn-sm me-2"
                                   onClick={() => editGallery(item)}
                               >
                                   Edit
                               </button>

                               <button
                                   className="btn btn-danger btn-sm"
                                   onClick={() => deleteGallery(item.gallery_id)}
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
        </AdminLayout>

    );

}

export default Gallery;