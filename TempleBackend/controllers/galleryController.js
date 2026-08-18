const pool = require("../config/db");

// Get All Gallery
const getAllGallery = async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM gallery ORDER BY gallery_id DESC"
        );

        res.json(result.rows);

    }
    catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Add Gallery
const addGallery = async (req, res) => {

    try {

        const {
            title,
            description,
            category,
            created_by
        } = req.body;

        let image_url = "";

        if (req.file) {

            image_url = "/uploads/gallery/" + req.file.filename;

        }

        await pool.query(

            `INSERT INTO gallery
            (
                title,
                description,
                image_url,
                category,
                created_by
            )
            VALUES
            ($1,$2,$3,$4,$5)`,

            [
                title,
                description,
                image_url,
                category,
                created_by
            ]

        );

        res.json({

            success: true,

            message: "Gallery Image Uploaded Successfully"

        });

    }
    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

// Delete Gallery

const deleteGallery = async (req, res) => {

    try {

        await pool.query(

            "DELETE FROM gallery WHERE gallery_id=$1",

            [req.params.id]

        );

        res.json({

            success: true,

            message: "Deleted Successfully"

        });

    }
    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

// Update Gallery
const updateGallery = async (req, res) => {

    try {

        const {
            title,
            description,
            category,
            old_image
        } = req.body;

        let image_url = old_image;

        if (req.file) {
            image_url = "/uploads/gallery/" + req.file.filename;
        }

        await pool.query(

            `UPDATE gallery
             SET
                title=$1,
                description=$2,
                category=$3,
                image_url=$4,
                modified_on=NOW()
             WHERE gallery_id=$5`,

            [
                title,
                description,
                category,
                image_url,
                req.params.id
            ]

        );

        res.json({

            success: true,
            message: "Gallery Updated Successfully"

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

// Dashboard Recent Gallery
const getRecentGallery = async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT gallery_id,
                   title,
                   image_url,
                   created_on
            FROM gallery
            ORDER BY gallery_id DESC
            LIMIT 4
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
module.exports = {

    getAllGallery,
    getRecentGallery,
    addGallery,
    updateGallery,
    deleteGallery

};