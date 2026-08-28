const pool = require("../config/db");
const cloudinary = require("../config/cloudinary");


// ======================================================
// CLOUDINARY UPLOAD
// ======================================================

const uploadToCloudinary = (fileBuffer) => {

    return new Promise((resolve, reject) => {

        const uploadStream =
            cloudinary.uploader.upload_stream(

                {
                    folder: "madhav-das/gallery",
                    resource_type: "image"
                },

                (error, result) => {

                    if (error) {

                        console.error(
                            "Cloudinary Gallery Upload Error:",
                            error
                        );

                        reject(error);

                    } else {

                        resolve(result);

                    }

                }

            );

        uploadStream.end(fileBuffer);

    });

};


// ======================================================
// CLOUDINARY DELETE
// ======================================================

const deleteFromCloudinary = async (imageUrl) => {

    try {

        if (!imageUrl) {
            return;
        }


        // Only Cloudinary images
        if (
            !imageUrl.includes(
                "res.cloudinary.com"
            )
        ) {

            return;

        }


        const parts =
            imageUrl.split("/upload/");


        if (parts.length !== 2) {
            return;
        }


        let publicId =
            parts[1];


        // Remove version
        publicId =
            publicId.replace(
                /^v\d+\//,
                ""
            );


        // Remove extension
        publicId =
            publicId.replace(
                /\.[^/.]+$/,
                ""
            );


        console.log(
            "Deleting Cloudinary gallery image:",
            publicId
        );


        await cloudinary.uploader.destroy(

            publicId,

            {
                resource_type: "image"
            }

        );

    }
    catch (error) {

        console.error(
            "Cloudinary Gallery Delete Error:",
            error.message
        );

    }

};


// ======================================================
// GET ALL GALLERY
// ======================================================

const getAllGallery = async (req, res) => {

    try {

        const result =
            await pool.query(

                `SELECT *
                 FROM gallery
                 ORDER BY gallery_id DESC`

            );


        res.json(
            result.rows
        );

    }
    catch (err) {

        console.error(
            "Get Gallery Error:",
            err
        );


        res.status(500).json({

            success: false,

            message:
                err.message

        });

    }

};


// ======================================================
// ADD GALLERY
// ======================================================

const addGallery = async (req, res) => {

    try {

        console.log(
            "🔥 NEW CLOUDINARY GALLERY CONTROLLER"
        );


        console.log(
            "========== ADD GALLERY =========="
        );


        console.log(
            "BODY:",
            req.body
        );


        console.log(
            "FILE:",
            req.file
        );


        const {

            title,
            description,
            category,
            created_by

        } = req.body;


        let image_url = "";


        // ==================================================
        // UPLOAD IMAGE
        // ==================================================

        if (req.file) {

            console.log("========== GALLERY FILE DEBUG ==========");

            console.log("Original Name:", req.file.originalname);
            console.log("Mimetype:", req.file.mimetype);
            console.log("Size:", req.file.size);
            console.log("Buffer Exists:", !!req.file.buffer);
            console.log(
                "Buffer Length:",
                req.file.buffer?.length
            );

            if (
                !req.file.buffer ||
                req.file.buffer.length === 0
            ) {

                return res.status(400).json({
                    success: false,
                    message: "Uploaded image file is empty."
                });

            }

            console.log(
                "Uploading gallery image to Cloudinary..."
            );

            const result =
                await uploadToCloudinary(
                    req.file.buffer
                );

            image_url =
                result.secure_url;

            console.log(
                "Cloudinary Gallery Image URL:",
                image_url
            );

        }
        else {

            return res.status(400).json({
                success: false,
                message: "Please select an image."
            });

        }


        // ==================================================
        // INSERT DATABASE
        // ==================================================

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

            message:
                "Gallery Image Uploaded Successfully",

            image_url

        });

    }
    catch (err) {

        console.error(
            "❌ ADD GALLERY ERROR:",
            err
        );


        res.status(500).json({

            success: false,

            message:
                err.message

        });

    }

};


// ======================================================
// UPDATE GALLERY
// ======================================================

const updateGallery = async (req, res) => {

    try {

        console.log(
            "========== UPDATE GALLERY =========="
        );


        const { id } =
            req.params;


        console.log(
            "Gallery ID:",
            id
        );


        console.log(
            "BODY:",
            req.body
        );


        console.log(
            "FILE:",
            req.file
        );


        const {

            title,
            description,
            category

        } = req.body;


        // ==================================================
        // GET OLD IMAGE
        // ==================================================

        const oldResult =
            await pool.query(

                `SELECT image_url
                 FROM gallery
                 WHERE gallery_id=$1`,

                [id]

            );


        if (
            oldResult.rowCount === 0
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Gallery item not found"

            });

        }


        const oldImageUrl =
            oldResult.rows[0].image_url;


        let image_url =
            oldImageUrl;


        // ==================================================
        // NEW IMAGE
        // ==================================================

        if (req.file) {

            console.log(
                "Uploading new gallery image to Cloudinary..."
            );


            const result =
                await uploadToCloudinary(
                    req.file.buffer
                );


            image_url =
                result.secure_url;


            console.log(
                "New Cloudinary Gallery Image URL:",
                image_url
            );


            // ==================================================
            // UPDATE DATABASE
            // ==================================================

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

                    id

                ]

            );


            // ==================================================
            // DELETE OLD CLOUDINARY IMAGE
            // ==================================================

            if (
                oldImageUrl &&
                oldImageUrl.includes(
                    "res.cloudinary.com"
                )
            ) {

                await deleteFromCloudinary(
                    oldImageUrl
                );

            }

        }

        // ==================================================
        // NO NEW IMAGE
        // ==================================================

        else {

            await pool.query(

                `UPDATE gallery
                 SET
                    title=$1,
                    description=$2,
                    category=$3,
                    modified_on=NOW()
                 WHERE gallery_id=$4`,

                [

                    title,

                    description,

                    category,

                    id

                ]

            );

        }


        res.json({

            success: true,

            message:
                "Gallery Updated Successfully",

            image_url

        });

    }
    catch (err) {

        console.error(
            "❌ UPDATE GALLERY ERROR:",
            err
        );


        res.status(500).json({

            success: false,

            message:
                err.message

        });

    }

};


// ======================================================
// DELETE GALLERY
// ======================================================

const deleteGallery = async (req, res) => {

    try {

        console.log(
            "========== DELETE GALLERY =========="
        );


        const { id } =
            req.params;


        // ==================================================
        // GET IMAGE
        // ==================================================

        const result =
            await pool.query(

                `SELECT image_url
                 FROM gallery
                 WHERE gallery_id=$1`,

                [id]

            );


        if (
            result.rowCount === 0
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Gallery item not found"

            });

        }


        const imageUrl =
            result.rows[0].image_url;


        // ==================================================
        // DELETE DATABASE RECORD
        // ==================================================

        await pool.query(

            `DELETE FROM gallery
             WHERE gallery_id=$1`,

            [id]

        );


        // ==================================================
        // DELETE CLOUDINARY IMAGE
        // ==================================================

        if (
            imageUrl &&
            imageUrl.includes(
                "res.cloudinary.com"
            )
        ) {

            await deleteFromCloudinary(
                imageUrl
            );

        }


        res.json({

            success: true,

            message:
                "Gallery Deleted Successfully"

        });

    }
    catch (err) {

        console.error(
            "❌ DELETE GALLERY ERROR:",
            err
        );


        res.status(500).json({

            success: false,

            message:
                err.message

        });

    }

};


// ======================================================
// RECENT GALLERY
// ======================================================

const getRecentGallery = async (req, res) => {

    try {

        const result =
            await pool.query(`

                SELECT
                    gallery_id,
                    title,
                    image_url,
                    created_on

                FROM gallery

                WHERE status = true

                ORDER BY gallery_id DESC

                LIMIT 4

            `);


        res.json(
            result.rows
        );

    }
    catch (err) {

        console.error(
            "Get Recent Gallery Error:",
            err
        );


        res.status(500).json({

            success: false,

            message:
                err.message

        });

    }

};


// ======================================================
// EXPORT
// ======================================================

module.exports = {

    getAllGallery,
    getRecentGallery,
    addGallery,
    updateGallery,
    deleteGallery

};