import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";

function MemberForm({
    loadMembers,
    editData,
    closeForm
}) {

    const [formData, setFormData] = useState({

        member_name: "",
        designation: "",
        mobile_no: "",
        email: "",
        address: "",
        image_url: "",
        description: "",
        display_order: 1,
        status: true

    });


    useEffect(() => {

        if (editData) {

            setFormData({

                member_name: editData.member_name || "",
                designation: editData.designation || "",
                mobile_no: editData.mobile_no || "",
                email: editData.email || "",
                address: editData.address || "",
                image_url: editData.image_url || "",
                description: editData.description || "",
                display_order: editData.display_order || 1,
                status:
                    editData.status === undefined
                        ? true
                        : editData.status

            });

        }
        else {

            setFormData({

                member_name: "",
                designation: "",
                mobile_no: "",
                email: "",
                address: "",
                image_url: "",
                description: "",
                display_order: 1,
                status: true

            });

        }

    }, [editData]);


    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;

        setFormData({

            ...formData,

            [name]:
                type === "checkbox"
                    ? checked
                    : value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.member_name.trim()) {

            alert("Please enter member name.");

            return;

        }


        try {

            const data = new FormData();

            data.append(
                "member_name",
                formData.member_name
            );

            data.append(
                "designation",
                formData.designation
            );

            data.append(
                "mobile_no",
                formData.mobile_no
            );

            data.append(
                "email",
                formData.email
            );

            data.append(
                "address",
                formData.address
            );

            data.append(
                "description",
                formData.description
            );

            data.append(
                "display_order",
                formData.display_order
            );

            data.append(
                "status",
                formData.status
            );


            if (formData.image) {

                data.append(
                    "image",
                    formData.image
                );

            }


            if (editData) {

                await axios.put(

                    `${API_BASE_URL}/members/${editData.member_id}`,

                    data

                );

                alert(
                    "Member Updated Successfully"
                );

            }
            else {

                data.append(
                    "created_by",
                    "1"
                );


                await axios.post(

                    `${API_BASE_URL}/members`,

                    data

                );

                alert(
                    "Member Added Successfully"
                );

            }


            await loadMembers();

            closeForm();

        }
        catch (error) {

            console.error(
                "Member Save Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to save member."
            );

        }

    };

    return (

        <div className="card mb-4 shadow-sm">

            <div className="card-header">

                <h4 className="mb-0">

                    {
                        editData
                            ? "✏️ Edit Member"
                            : "👥 Add Member"
                    }

                </h4>

            </div>


            <div className="card-body">

                <form onSubmit={handleSubmit}>

                    {/* MEMBER NAME */}

                    <div className="mb-3">

                        <label className="form-label">

                            Member Name *

                        </label>

                        <input
                            type="text"
                            name="member_name"
                            className="form-control"
                            value={formData.member_name}
                            onChange={handleChange}
                            placeholder="Enter member name"
                            required
                        />

                    </div>


                    {/* DESIGNATION */}

                    <div className="mb-3">

                        <label className="form-label">

                            Designation

                        </label>

                        <input
                            type="text"
                            name="designation"
                            className="form-control"
                            value={formData.designation}
                            onChange={handleChange}
                            placeholder="President / Secretary / Treasurer"
                        />

                    </div>


                    {/* MOBILE + EMAIL */}

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
                                placeholder="Enter mobile number"
                            />

                        </div>


                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Email

                            </label>

                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                            />

                        </div>

                    </div>


                    {/* ADDRESS */}

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
                            placeholder="Enter address"
                        />

                    </div>


                    {/* IMAGE URL */}

                    <div className="mb-3">

                        <label className="form-label">

                            Member Photo

                        </label>

                        <input
                            type="file"
                            name="image"
                            className="form-control"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={(e) => {

                                setFormData({

                                    ...formData,

                                    image: e.target.files[0]

                                });

                            }}
                        />

                        <small className="text-muted">

                            JPG, PNG or WEBP | Maximum 5 MB

                        </small>

                    </div>


                    {/* DESCRIPTION */}

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
                            placeholder="Enter member description"
                        />

                    </div>


                    {/* DISPLAY ORDER */}

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
                        />

                    </div>


                    {/* STATUS */}

                    <div className="form-check mb-3">

                        <input
                            type="checkbox"
                            name="status"
                            className="form-check-input"
                            id="memberStatus"
                            checked={formData.status}
                            onChange={handleChange}
                        />

                        <label
                            className="form-check-label"
                            htmlFor="memberStatus"
                        >

                            Active Member

                        </label>

                    </div>


                    {/* BUTTONS */}

                    <button
                        type="submit"
                        className="btn btn-success me-2"
                    >

                        {
                            editData
                                ? "Update Member"
                                : "Save Member"
                        }

                    </button>


                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={closeForm}
                    >

                        Cancel

                    </button>

                </form>

            </div>

        </div>

    );

}

export default MemberForm;