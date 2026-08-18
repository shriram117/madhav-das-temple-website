import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";

function DonationForm({ loadData, editData, closeForm }) {

    const [formData, setFormData] = useState({
        donor_name: "",
        mobile_no: "",
        email: "",
        amount: "",
        donation_date: "",
        payment_mode: "UPI",
        transaction_id: "",
        purpose: "",
        remarks: "",
        status: true
    });

    useEffect(() => {

        if (editData) {

            setFormData({
                donor_name: editData.donor_name || "",
                mobile_no: editData.mobile_no || "",
                email: editData.email || "",
                amount: editData.amount || "",
                donation_date: editData.donation_date
                    ? editData.donation_date.substring(0, 10)
                    : "",
                payment_mode: editData.payment_mode || "UPI",
                transaction_id: editData.transaction_id || "",
                purpose: editData.purpose || "",
                remarks: editData.remarks || "",
                status: editData.status ?? true
            });

        } else {

            setFormData({
                donor_name: "",
                mobile_no: "",
                email: "",
                amount: "",
                donation_date: new Date()
                    .toISOString()
                    .substring(0, 10),
                payment_mode: "UPI",
                transaction_id: "",
                purpose: "",
                remarks: "",
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

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                : value
        }));

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.donor_name.trim()) {

            alert("Donor name is required");

            return;
        }

        if (!formData.amount) {

            alert("Donation amount is required");

            return;
        }

        try {

            if (editData) {

                await axios.put(
                    `${API_BASE_URL}/donations/${editData.donation_id}`,
                    formData
                );

                alert("Donation updated successfully");

            } else {

                await axios.post(
                    `${API_BASE_URL}/donations`,
                    {
                        ...formData,
                        created_by: 1
                    }
                );

                alert("Donation added successfully");

            }

            await loadData();

            closeForm();

        } catch (error) {

            console.error(
                "Donation Save Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to save donation"
            );

        }

    };


    return (

        <div className="donation-form-card">

            <div className="donation-form-header">

                <h3>
                    {editData
                        ? "✏️ Edit Donation"
                        : "➕ Add Donation"}
                </h3>

                <button
                    type="button"
                    className="donation-close-btn"
                    onClick={closeForm}
                >
                    ✕
                </button>

            </div>


            <form
                className="donation-form"
                onSubmit={handleSubmit}
            >

                <div className="donation-form-grid">


                    {/* DONOR NAME */}

                    <div className="donation-field">

                        <label>
                            Donor Name *
                        </label>

                        <input
                            type="text"
                            name="donor_name"
                            value={formData.donor_name}
                            onChange={handleChange}
                            placeholder="Enter donor name"
                        />

                    </div>


                    {/* MOBILE */}

                    <div className="donation-field">

                        <label>
                            Mobile Number
                        </label>

                        <input
                            type="text"
                            name="mobile_no"
                            value={formData.mobile_no}
                            onChange={handleChange}
                            placeholder="Enter mobile number"
                        />

                    </div>


                    {/* EMAIL */}

                    <div className="donation-field">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                        />

                    </div>


                    {/* AMOUNT */}

                    <div className="donation-field">

                        <label>
                            Amount *
                        </label>

                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="Enter donation amount"
                            min="1"
                            step="0.01"
                        />

                    </div>


                    {/* DATE */}

                    <div className="donation-field">

                        <label>
                            Donation Date
                        </label>

                        <input
                            type="date"
                            name="donation_date"
                            value={formData.donation_date}
                            onChange={handleChange}
                        />

                    </div>


                    {/* PAYMENT MODE */}

                    <div className="donation-field">

                        <label>
                            Payment Mode
                        </label>

                        <select
                            name="payment_mode"
                            value={formData.payment_mode}
                            onChange={handleChange}
                        >

                            <option value="UPI">
                                UPI
                            </option>

                            <option value="Cash">
                                Cash
                            </option>

                            <option value="Bank Transfer">
                                Bank Transfer
                            </option>

                            <option value="Cheque">
                                Cheque
                            </option>

                            <option value="Other">
                                Other
                            </option>

                        </select>

                    </div>


                    {/* TRANSACTION ID */}

                    <div className="donation-field">

                        <label>
                            Transaction ID
                        </label>

                        <input
                            type="text"
                            name="transaction_id"
                            value={formData.transaction_id}
                            onChange={handleChange}
                            placeholder="Transaction / Reference ID"
                        />

                    </div>


                    {/* PURPOSE */}

                    <div className="donation-field">

                        <label>
                            Payment Mode
                        </label>

                    <select
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        required
                    >
                        <option value="">
                            Select Purpose
                        </option>

                        <option value="General Donation">
                            General Donation
                        </option>

                        <option value="Temple Development">
                            Temple Development
                        </option>

                        <option value="Temple Renovation">
                            Temple Renovation
                        </option>

                        <option value="Annadan / Bhandara">
                            Annadan / Bhandara
                        </option>

                        <option value="Gau Seva">
                            Gau Seva
                        </option>

                        <option value="Religious Program">
                            Religious Program
                        </option>

                        <option value="Festival / Utsav">
                            Festival / Utsav
                        </option>

                        <option value="Puja / Seva">
                            Puja / Seva
                        </option>

                        <option value="Maintenance">
                            Maintenance
                        </option>

                        <option value="Construction">
                            Construction
                        </option>

                        <option value="Charity / Social Service">
                            Charity / Social Service
                        </option>

                        <option value="Other">
                            Other
                        </option>
                    </select>
                    </div>
                    {/* REMARKS */}

                    <div className="donation-field full-width">

                        <label>
                            Remarks
                        </label>

                        <textarea
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Enter remarks"
                        />

                    </div>


                    {/* STATUS */}

                    {editData && (

                        <div className="donation-field">

                            <label>
                                Status
                            </label>

                            <select
                                name="status"
                                value={
                                    formData.status
                                        ? "true"
                                        : "false"
                                }
                                onChange={(e) => {

                                    setFormData((prev) => ({
                                        ...prev,
                                        status:
                                            e.target.value === "true"
                                    }));

                                }}
                            >

                                <option value="true">
                                    Active
                                </option>

                                <option value="false">
                                    Inactive
                                </option>

                            </select>

                        </div>

                    )}

                </div>


                {/* ACTIONS */}

                <div className="donation-form-actions">

                    <button
                        type="button"
                        className="donation-cancel-btn"
                        onClick={closeForm}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="donation-save-btn"
                    >
                        {editData
                            ? "Update Donation"
                            : "Save Donation"}
                    </button>

                </div>

            </form>

        </div>

    );

}

export default DonationForm;