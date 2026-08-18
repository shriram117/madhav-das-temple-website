const pool = require("../config/db");

// Get All Aarti
const getAllAarti = async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT *
            FROM daily_aarti
            ORDER BY display_order, aarti_id
        `);

        res.json(result.rows);

    }
    catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// Add Aarti
const addAarti = async (req, res) => {

    try {

        const {
            aarti_name,
            aarti_time,
            description,
            display_order,
            status
        } = req.body;

        await pool.query(

            `INSERT INTO daily_aarti
            (
                aarti_name,
                aarti_time,
                description,
                display_order,
                status
            )
            VALUES
            (
                $1,$2,$3,$4,$5
            )`,

            [
                aarti_name,
                aarti_time,
                description,
                display_order,
                status
            ]

        );

        res.json({
            success: true,
            message: "Aarti Added Successfully"
        });

    }
    catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// Update Aarti
const updateAarti = async (req, res) => {

    try {

        const {
            aarti_name,
            aarti_time,
            description,
            display_order,
            status
        } = req.body;

        await pool.query(

            `UPDATE daily_aarti
             SET
                aarti_name=$1,
                aarti_time=$2,
                description=$3,
                display_order=$4,
                status=$5,
                modified_on=NOW()
             WHERE aarti_id=$6`,

            [
                aarti_name,
                aarti_time,
                description,
                display_order,
                status,
                req.params.id
            ]

        );

        res.json({
            success: true,
            message: "Aarti Updated Successfully"
        });

    }
    catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// Delete Aarti
const deleteAarti = async (req, res) => {

    try {

        await pool.query(

            "DELETE FROM daily_aarti WHERE aarti_id=$1",

            [req.params.id]

        );

        res.json({
            success: true,
            message: "Aarti Deleted Successfully"
        });

    }
    catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = {

    getAllAarti,
    addAarti,
    updateAarti,
    deleteAarti

};