import AdminLayout from "../components/AdminLayout";
import DonationForm from "../components/DonationForm";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import "../css/Donation.css";

function Donation() {

    const [donations, setDonations] = useState([]);
    const [editData, setEditData] = useState(null);
    const [showForm, setShowForm] = useState(false);

    // Filters
    const [search, setSearch] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [purpose, setPurpose] = useState("");

    const [loading, setLoading] = useState(false);


    // =====================================
    // LOAD DONATIONS
    // =====================================

    const loadDonations = async () => {

        try {

            setLoading(true);

            const response = await axios.get(
                `${API_BASE_URL}/donations`
            );

            setDonations(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {

            console.error(
                "Donation Load Error:",
                error
            );

            alert("Unable to load donations.");

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadDonations();

    }, []);


    // =====================================
    // DELETE
    // =====================================

    const deleteDonation = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this donation?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(
                `${API_BASE_URL}/donations/${id}`
            );

            alert("Donation deleted successfully.");

            loadDonations();

        } catch (error) {

            console.error(
                "Delete Donation Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Delete failed."
            );

        }

    };


    // =====================================
    // EDIT
    // =====================================

    const editDonation = (item) => {

        setEditData(item);
        setShowForm(true);

    };


    // =====================================
    // RESET FILTER
    // =====================================

    const resetFilters = () => {

        setSearch("");
        setFromDate("");
        setToDate("");
        setPurpose("");

    };


    // =====================================
    // FILTER DONATIONS
    // =====================================

    const filteredDonations = useMemo(() => {

        return donations.filter((item) => {

            const searchText = search
                .toLowerCase()
                .trim();

            const donorName =
                item.donor_name
                    ?.toLowerCase() || "";

            const mobile =
                item.mobile_no
                    ?.toLowerCase() || "";

            const transactionId =
                item.transaction_id
                    ?.toLowerCase() || "";

            const searchMatch =
                !searchText ||
                donorName.includes(searchText) ||
                mobile.includes(searchText) ||
                transactionId.includes(searchText);


            // Purpose

            const purposeMatch =
                !purpose ||
                item.purpose === purpose;


            // Date

            const donationDate =
                item.donation_date
                    ? String(item.donation_date)
                        .substring(0, 10)
                    : "";


            const fromDateMatch =
                !fromDate ||
                donationDate >= fromDate;


            const toDateMatch =
                !toDate ||
                donationDate <= toDate;


            return (
                searchMatch &&
                purposeMatch &&
                fromDateMatch &&
                toDateMatch
            );

        });

    }, [
        donations,
        search,
        fromDate,
        toDate,
        purpose
    ]);


    // =====================================
    // SUMMARY
    // =====================================

    const totalDonation = useMemo(() => {

        return filteredDonations.reduce(
            (total, item) =>
                total +
                Number(item.amount || 0),
            0
        );

    }, [filteredDonations]);


    const totalDonors =
        filteredDonations.length;


    const activeDonations =
        filteredDonations.filter(
            item => item.status === true
        ).length;


    // =====================================
    // PURPOSE LIST
    // =====================================

    const purposeList = [
        "General Donation",
        "Temple Development",
        "Temple Renovation",
        "Annadan / Bhandara",
        "Gau Seva",
        "Religious Program",
        "Festival / Utsav",
        "Puja / Seva",
        "Maintenance",
        "Construction",
        "Charity / Social Service",
        "Other"
    ];


    // =====================================
    // FORMAT DATE
    // =====================================

    const formatDate = (date) => {

        if (!date) return "-";

        const value =
            String(date).substring(0, 10);

        const parts =
            value.split("-");

        if (parts.length !== 3)
            return value;

        return `${parts[2]}-${parts[1]}-${parts[0]}`;

    };


    return (

        <AdminLayout>

            <div className="donation-page">


                {/* =================================
                    HEADER
                ================================= */}

                <div className="donation-header">

                    <div>

                        <h2>
                            💰 Donation Management
                        </h2>

                        <p>
                            Manage temple donations and donor records
                        </p>

                    </div>


                    <button
                        className="donation-add-btn"
                        onClick={() => {

                            setEditData(null);
                            setShowForm(!showForm);

                        }}
                    >

                        {showForm
                            ? "✕ Close Form"
                            : "+ Add Donation"}

                    </button>

                </div>


                {/* =================================
                    FORM
                ================================= */}

                {showForm && (

                    <DonationForm
                        loadData={loadDonations}
                        editData={editData}
                        closeForm={() => {

                            setShowForm(false);
                            setEditData(null);

                        }}
                    />

                )}


                {/* =================================
                    SUMMARY
                ================================= */}

                <div className="donation-summary">


                    <div className="donation-summary-card">

                        <div className="summary-icon">
                            💰
                        </div>

                        <div>

                            <span>
                                Total Donation
                            </span>

                            <strong>
                                ₹ {totalDonation.toLocaleString("en-IN")}
                            </strong>

                        </div>

                    </div>


                    <div className="donation-summary-card">

                        <div className="summary-icon">
                            👥
                        </div>

                        <div>

                            <span>
                                Total Records
                            </span>

                            <strong>
                                {totalDonors}
                            </strong>

                        </div>

                    </div>


                    <div className="donation-summary-card">

                        <div className="summary-icon">
                            ✅
                        </div>

                        <div>

                            <span>
                                Active Donations
                            </span>

                            <strong>
                                {activeDonations}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* =================================
                    FILTERS
                ================================= */}

                <div className="donation-filter-card">

                    <div className="donation-filter-title">

                        <h3>
                            🔎 Search & Filter
                        </h3>

                        <button
                            type="button"
                            className="donation-reset-btn"
                            onClick={resetFilters}
                        >
                            Reset Filters
                        </button>

                    </div>


                    <div className="donation-filter-grid">


                        {/* SEARCH */}

                        <div className="donation-filter-field">

                            <label>
                                Search
                            </label>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Name, mobile or transaction ID"
                            />

                        </div>


                        {/* FROM DATE */}

                        <div className="donation-filter-field">

                            <label>
                                From Date
                            </label>

                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) =>
                                    setFromDate(e.target.value)
                                }
                            />

                        </div>


                        {/* TO DATE */}

                        <div className="donation-filter-field">

                            <label>
                                To Date
                            </label>

                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) =>
                                    setToDate(e.target.value)
                                }
                            />

                        </div>


                        {/* PURPOSE */}

                        <div className="donation-filter-field">

                            <label>
                                Purpose
                            </label>

                            <select
                                value={purpose}
                                onChange={(e) =>
                                    setPurpose(e.target.value)
                                }
                            >

                                <option value="">
                                    All Purposes
                                </option>

                                {purposeList.map(
                                    (item) => (

                                        <option
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>

                    </div>

                </div>


                {/* =================================
                    TABLE
                ================================= */}

                <div className="donation-table-container">

                    <table className="donation-table">

                        <thead>

                            <tr>

                                <th>
                                    ID
                                </th>

                                <th>
                                    Donor
                                </th>

                                <th>
                                    Mobile
                                </th>

                                <th>
                                    Amount
                                </th>

                                <th>
                                    Date
                                </th>

                                <th>
                                    Payment
                                </th>

                                <th>
                                    Purpose
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan="9"
                                        className="no-donation"
                                    >
                                        Loading donations...
                                    </td>

                                </tr>

                            ) : filteredDonations.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="9"
                                        className="no-donation"
                                    >
                                        No donations found.
                                    </td>

                                </tr>

                            ) : (

                                filteredDonations.map(
                                    (item) => (

                                        <tr
                                            key={
                                                item.donation_id
                                            }
                                        >

                                            <td>
                                                {item.donation_id}
                                            </td>


                                            <td>

                                                <strong>
                                                    {item.donor_name || "-"}
                                                </strong>

                                            </td>


                                            <td>
                                                {item.mobile_no || "-"}
                                            </td>


                                            <td className="amount">

                                                ₹{" "}
                                                {Number(
                                                    item.amount || 0
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}

                                            </td>


                                            <td>
                                                {formatDate(
                                                    item.donation_date
                                                )}
                                            </td>


                                            <td>
                                                {item.payment_mode || "-"}
                                            </td>


                                            <td>
                                                {item.purpose || "-"}
                                            </td>


                                            <td>

                                                {item.status ? (

                                                    <span className="donation-active">
                                                        Active
                                                    </span>

                                                ) : (

                                                    <span className="donation-inactive">
                                                        Inactive
                                                    </span>

                                                )}

                                            </td>


                                            <td>

                                                <button
                                                    className="donation-edit-btn"
                                                    onClick={() =>
                                                        editDonation(item)
                                                    }
                                                >
                                                    Edit
                                                </button>


                                                <button
                                                    className="donation-delete-btn"
                                                    onClick={() =>
                                                        deleteDonation(
                                                            item.donation_id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </table>

                </div>


            </div>

        </AdminLayout>

    );

}

export default Donation;