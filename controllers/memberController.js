const pool = require("../config/db");


// ======================================================
// GET ALL ACTIVE MEMBERS
// ======================================================

const getMembers = async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT *
            FROM member_master
            WHERE status = TRUE
            ORDER BY display_order ASC, member_id ASC
        `);

        res.json(result.rows);

    }
    catch (err) {

        console.error("Get Members Error:", err);

        res.status(500).json({
            message: "Failed to fetch members"
        });

    }

};


// ======================================================
// GET MEMBER BY ID
// ======================================================

const getMemberById = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            SELECT *
            FROM member_master
            WHERE member_id = $1
            `,
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Member not found"
            });

        }

        res.json(result.rows[0]);

    }
    catch (err) {

        console.error("Get Member Error:", err);

        res.status(500).json({
            message: "Failed to fetch member"
        });

    }

};


// ======================================================
// CREATE MEMBER
// ======================================================

const createMember = async (req, res) => {

    try {

        const {
            member_name,
            designation,
            mobile_no,
            email,
            address,
            description,
            display_order,
            status,
            created_by
        } = req.body;


        if (!member_name || !member_name.trim()) {

            return res.status(400).json({
                message: "Member name is required"
            });

        }


        const image_url = req.file
            ? `/uploads/members/${req.file.filename}`
            : null;


        const result = await pool.query(
            `
            INSERT INTO member_master
            (
                member_name,
                designation,
                mobile_no,
                email,
                address,
                image_url,
                description,
                display_order,
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
                $8,
                $9,
                $10,
                CURRENT_TIMESTAMP
            )
            RETURNING *
            `,
            [
                member_name,
                designation || null,
                mobile_no || null,
                email || null,
                address || null,
                image_url,
                description || null,
                display_order || 1,
                status === undefined
                    ? true
                    : status === "true" || status === true,
                created_by || null
            ]
        );


        res.status(201).json({

            message: "Member created successfully",

            member: result.rows[0]

        });

    }
    catch (err) {

        console.error(
            "Create Member Error:",
            err
        );

        res.status(500).json({

            message: "Failed to create member"

        });

    }

};

// ======================================================
// UPDATE MEMBER
// ======================================================

const updateMember = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            member_name,
            designation,
            mobile_no,
            email,
            address,
            description,
            display_order,
            status
        } = req.body;


        if (!member_name || !member_name.trim()) {

            return res.status(400).json({

                message: "Member name is required"

            });

        }


        let query;
        let values;


        // ==========================================
        // NEW IMAGE SELECTED
        // ==========================================

        if (req.file) {

            const image_url =
                `/uploads/members/${req.file.filename}`;


            query = `
                UPDATE member_master
                SET
                    member_name = $1,
                    designation = $2,
                    mobile_no = $3,
                    email = $4,
                    address = $5,
                    image_url = $6,
                    description = $7,
                    display_order = $8,
                    status = $9,
                    modified_on = CURRENT_TIMESTAMP
                WHERE member_id = $10
                RETURNING *
            `;


            values = [

                member_name,

                designation || null,

                mobile_no || null,

                email || null,

                address || null,

                image_url,

                description || null,

                display_order || 1,

                status === undefined
                    ? true
                    : status === "true" || status === true,

                id

            ];

        }

        // ==========================================
        // NO NEW IMAGE
        // KEEP OLD IMAGE
        // ==========================================

        else {

            query = `
                UPDATE member_master
                SET
                    member_name = $1,
                    designation = $2,
                    mobile_no = $3,
                    email = $4,
                    address = $5,
                    description = $6,
                    display_order = $7,
                    status = $8,
                    modified_on = CURRENT_TIMESTAMP
                WHERE member_id = $9
                RETURNING *
            `;


            values = [

                member_name,

                designation || null,

                mobile_no || null,

                email || null,

                address || null,

                description || null,

                display_order || 1,

                status === undefined
                    ? true
                    : status === "true" || status === true,

                id

            ];

        }


        const result = await pool.query(
            query,
            values
        );


        if (result.rows.length === 0) {

            return res.status(404).json({

                message: "Member not found"

            });

        }


        res.json({

            message: "Member updated successfully",

            member: result.rows[0]

        });

    }
    catch (err) {

        console.error(
            "Update Member Error:",
            err
        );

        res.status(500).json({

            message: "Failed to update member"

        });

    }

};


// ======================================================
// DELETE MEMBER
// ======================================================

const deleteMember = async (req, res) => {

    try {

        const { id } = req.params;


        const result = await pool.query(
            `
            DELETE FROM member_master
            WHERE member_id = $1
            RETURNING *
            `,
            [id]
        );


        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Member not found"
            });

        }


        res.json({
            message: "Member deleted successfully"
        });

    }
    catch (err) {

        console.error("Delete Member Error:", err);

        res.status(500).json({
            message: "Failed to delete member"
        });

    }

};


module.exports = {

    getMembers,

    getMemberById,

    createMember,

    updateMember,

    deleteMember

};