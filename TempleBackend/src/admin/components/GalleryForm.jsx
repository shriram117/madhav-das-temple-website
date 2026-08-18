import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
function GalleryForm({ loadGallery, editData, closeForm }) {

    const [galleryId, setGalleryId] = useState(0);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {

        if (editData) {

            setGalleryId(editData.gallery_id);
            setTitle(editData.title || "");
            setDescription(editData.description || "");
            setCategory(editData.category || "");
            setImage(null);

        } else {

            setGalleryId(0);
            setTitle("");
            setDescription("");
            setCategory("");
            setImage(null);

        }

    }, [editData]);

    const saveGallery = async () => {

        if (title.trim() === "") {
            alert("Please enter Title.");
            return;
        }

        if (category.trim() === "") {
            alert("Please enter Category.");
            return;
        }

        if (description.trim() === "") {
            alert("Please enter Description.");
            return;
        }

        try {

            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);
            formData.append("category", category);

            if (galleryId === 0) {

                formData.append("created_by", 1);

                if (image) {
                    formData.append("image", image);
                }

                await axios.post(
                    
                    `${API_BASE_URL}/gallery`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );

                alert("Gallery Added Successfully");

            } else {

                // Keep old image if no new image selected
                formData.append("old_image", editData?.image_url || "");

                if (image) {
                    formData.append("image", image);
                }

                await axios.put(
                   
                    `${API_BASE_URL}/gallery/${galleryId}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );

                alert("Gallery Updated Successfully");

            }

            // Reset Form
            await loadGallery();

            setGalleryId(0);
            setTitle("");
            setDescription("");
            setCategory("");
            setImage(null);

            closeForm();

        }
        catch (err) {

            console.error(err);

            alert(err.response?.data?.message || err.message);

        }

    };

    return (

        <div className="card mb-4">

            <div className="card-header">

                <h4>
                    {galleryId === 0
                        ? "🖼 Add Gallery"
                        : "✏ Edit Gallery"}
                </h4>

            </div>

            <div className="card-body">

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label>Title</label>

                        <input
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Category</label>

                        <input
                            className="form-control"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />

                    </div>

                    <div className="col-md-12 mb-3">

                        <label>Description</label>

                        <textarea
                            rows="3"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                    </div>

                    {
                        <div className="col-md-12 mb-3">

                            <label>Select Image</label>

                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                            />

                            {
                                galleryId !== 0 &&
                                <small className="text-muted">
                                    Leave empty if you don't want to change the image.
                                </small>
                            }

                        </div>

                    }

                </div>

                <button
                    className={
                        galleryId === 0
                            ? "btn btn-success"
                            : "btn btn-warning"
                    }
                    onClick={saveGallery}
                >

                    {
                        galleryId === 0
                            ? "Upload Image"
                            : "Update Gallery"
                    }

                </button>

            </div>

        </div>

    );

}

export default GalleryForm;