const pool = require("../config/db");

// =====================================
// GET ALL DONATIONS
// =====================================
const getAllDonations = async (req, res) => {
    try {

        const result = await pool.query(`
            SELECT
                donation_id,
                donor_name,
                mobile_no,
                email,
                amount,
                donation_date,
                payment_mode,
                transaction_id,
                purpose,
                remarks,
                status,
                created_by,
                created_on,
                modified_on
            FROM donation_master
            ORDER BY donation_id DESC
        `);

        res.status(200).json(result.rows);

    } catch (error) {

        console.error("Get Donations Error:", error);

        res.status(500).json({
            message: "Unable to fetch donations",
            error: error.message
        });

    }
};


// =====================================
// GET DONATION BY ID
// =====================================
const getDonationById = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            SELECT *
            FROM donation_master
            WHERE donation_id = $1
            `,
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Donation not found"
            });

        }

        res.status(200).json(result.rows[0]);

    } catch (error) {

        console.error("Get Donation Error:", error);

        res.status(500).json({
            message: "Unable to fetch donation",
            error: error.message
        });

    }

};


// =====================================
// ADD DONATION
// =====================================
const addDonation = async (req, res) => {

    try {

        const {
            donor_name,
            mobile_no,
            email,
            amount,
            donation_date,
            payment_mode,
            transaction_id,
            purpose,
            remarks,
            created_by
        } = req.body;


        if (!donor_name) {

            return res.status(400).json({
                message: "Donor name is required"
            });

        }


        if (!amount) {

            return res.status(400).json({
                message: "Donation amount is required"
            });

        }


        const result = await pool.query(
            `
            INSERT INTO donation_master
            (
                donor_name,
                mobile_no,
                email,
                amount,
                donation_date,
                payment_mode,
                transaction_id,
                purpose,
                remarks,
                status,
                created_by,
                created_on
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4,
                COALESCE($5, CURRENT_DATE),
                $6,
                $7,
                $8,
                $9,
                TRUE,
                $10,
                CURRENT_TIMESTAMP
            )
            RETURNING *
            `,
            [
                donor_name,
                mobile_no || null,
                email || null,
                amount,
                donation_date || null,
                payment_mode || null,
                transaction_id || null,
                purpose || null,
                remarks || null,
                created_by || null
            ]
        );


        res.status(201).json({
            message: "Donation added successfully",
            donation: result.rows[0]
        });

    } catch (error) {

        console.error("Add Donation Error:", error);

        res.status(500).json({
            message: "Unable to add donation",
            error: error.message
        });

    }

};


// =====================================
// UPDATE DONATION
// =====================================
const updateDonation = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            donor_name,
            mobile_no,
            email,
            amount,
            donation_date,
            payment_mode,
            transaction_id,
            purpose,
            remarks,
            status
        } = req.body;


        const result = await pool.query(
            `
            UPDATE donation_master
            SET
                donor_name = $1,
                mobile_no = $2,
                email = $3,
                amount = $4,
                donation_date = $5,
                payment_mode = $6,
                transaction_id = $7,
                purpose = $8,
                remarks = $9,
                status = $10,
                modified_on = CURRENT_TIMESTAMP
            WHERE donation_id = $11
            RETURNING *
            `,
            [
                donor_name,
                mobile_no || null,
                email || null,
                amount,
                donation_date || null,
                payment_mode || null,
                transaction_id || null,
                purpose || null,
                remarks || null,
                status ?? true,
                id
            ]
        );


        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Donation not found"
            });

        }


        res.status(200).json({
            message: "Donation updated successfully",
            donation: result.rows[0]
        });

    } catch (error) {

        console.error("Update Donation Error:", error);

        res.status(500).json({
            message: "Unable to update donation",
            error: error.message
        });

    }

};


// =====================================
// DELETE DONATION
// =====================================
const deleteDonation = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            DELETE FROM donation_master
            WHERE donation_id = $1
            RETURNING *
            `,
            [id]
        );


        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Donation not found"
            });

        }


        res.status(200).json({
            message: "Donation deleted successfully"
        });

    } catch (error) {

        console.error("Delete Donation Error:", error);

        res.status(500).json({
            message: "Unable to delete donation",
            error: error.message
        });

    }

};


// =====================================
// DONATION SUMMARY
// =====================================
const getDonationSummary = async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT
                COUNT(*)::integer AS total_donations,
                COALESCE(SUM(amount), 0)::numeric AS total_amount,
                COALESCE(
                    SUM(
                        CASE
                            WHEN status = TRUE
                            THEN amount
                            ELSE 0
                        END
                    ),
                    0
                )::numeric AS active_amount
            FROM donation_master
        `);


        res.status(200).json(result.rows[0]);

    } catch (error) {

        console.error("Donation Summary Error:", error);

        res.status(500).json({
            message: "Unable to fetch donation summary",
            error: error.message
        });

    }

};


module.exports = {
    getAllDonations,
    getDonationById,
    addDonation,
    updateDonation,
    deleteDonation,
    getDonationSummary
};