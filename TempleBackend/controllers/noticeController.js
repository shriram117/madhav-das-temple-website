const pool = require("../config/db");


// ======================================================
// GET ALL ACTIVE NOTICES
// ======================================================

const getNotices = async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT *
            FROM notice_master
            WHERE status = TRUE
            ORDER BY notice_date DESC, notice_id DESC
        `);

        res.json(result.rows);

    }
    catch (err) {

        console.error("Get Notices Error:", err);

        res.status(500).json({
            message: "Failed to fetch notices"
        });

    }

};


// ======================================================
// GET NOTICE BY ID
// ======================================================

const getNoticeById = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            SELECT *
            FROM notice_master
            WHERE notice_id = $1
            `,
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Notice not found"
            });

        }

        res.json(result.rows[0]);

    }
    catch (err) {

        console.error("Get Notice Error:", err);

        res.status(500).json({
            message: "Failed to fetch notice"
        });

    }

};


// ======================================================
// CREATE NOTICE
// ======================================================

const createNotice = async (req, res) => {

    try {

        const {
            title,
            description,
            notice_date,
            notice_time,
            location,
            notice_type,
            valid_upto,
            created_by
        } = req.body;


        const result = await pool.query(
            `
            INSERT INTO notice_master
            (
                title,
                description,
                notice_date,
                notice_time,
                location,
                notice_type,
                valid_upto,
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
                $5,
                $6,
                $7,
                TRUE,
                $8,
                CURRENT_TIMESTAMP
            )
            RETURNING *
            `,
            [
                title,
                description,
                notice_date,
                notice_time,
                location,
                notice_type,
                valid_upto,
                created_by || null
            ]
        );


        res.status(201).json({
            message: "Notice created successfully",
            notice: result.rows[0]
        });

    }
    catch (err) {

        console.error("Create Notice Error:", err);

        res.status(500).json({
            message: "Failed to create notice"
        });

    }

};


// ======================================================
// UPDATE NOTICE
// ======================================================

const updateNotice = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            title,
            description,
            notice_date,
            notice_time,
            location,
            notice_type,
            valid_upto,
            status
        } = req.body;


        const result = await pool.query(
            `
            UPDATE notice_master
            SET
                title = $1,
                description = $2,
                notice_date = $3,
                notice_time = $4,
                location = $5,
                notice_type = $6,
                valid_upto = $7,
                status = $8,
                modified_on = CURRENT_TIMESTAMP
            WHERE notice_id = $9
            RETURNING *
            `,
            [
                title,
                description,
                notice_date,
                notice_time,
                location,
                notice_type,
                valid_upto,
                status,
                id
            ]
        );


        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Notice not found"
            });

        }


        res.json({
            message: "Notice updated successfully",
            notice: result.rows[0]
        });

    }
    catch (err) {

        console.error("Update Notice Error:", err);

        res.status(500).json({
            message: "Failed to update notice"
        });

    }

};


// ======================================================
// DELETE NOTICE
// ======================================================

const deleteNotice = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            DELETE FROM notice_master
            WHERE notice_id = $1
            RETURNING *
            `,
            [id]
        );


        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Notice not found"
            });

        }


        res.json({
            message: "Notice deleted successfully"
        });

    }
    catch (err) {

        console.error("Delete Notice Error:", err);

        res.status(500).json({
            message: "Failed to delete notice"
        });

    }

};


module.exports = {
    getNotices,
    getNoticeById,
    createNotice,
    updateNotice,
    deleteNotice
};