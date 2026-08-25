const pool = require("../config/db");
const cloudinary = require("../config/cloudinary");


// ===============================
// CLOUDINARY UPLOAD
// ===============================
const uploadToCloudinary = (fileBuffer) => {

    return new Promise((resolve, reject) => {

        const uploadStream =
            cloudinary.uploader.upload_stream(

                {
                    folder: "madhav-das/services",
                    resource_type: "image"
                },

                (error, result) => {

                    if (error) {

                        console.error(
                            "Cloudinary Upload Error:",
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


// ===============================
// CLOUDINARY DELETE
// ===============================
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
            "Deleting Cloudinary service image:",
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
            "Cloudinary Delete Error:",
            error.message
        );

    }

};


// ===============================
// GET ALL SERVICES
// ===============================
const getAllServices = async (req, res) => {

    try {

        const result =
            await pool.query(

                `SELECT *
                 FROM temple_services
                 ORDER BY
                    display_order ASC,
                    service_id ASC`

            );


        res.json(
            result.rows
        );

    }
    catch (err) {

        console.error(
            "Get Services Error:",
            err
        );


        res.status(500).json({

            success: false,

            message:
                err.message

        });

    }

};


// ===============================
// ADD SERVICE
// ===============================
const addService = async (req, res) => {

    try {

        console.log(
            "🔥 NEW CLOUDINARY SERVICE CONTROLLER"
        );


        console.log(
            "========== ADD SERVICE =========="
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

            service_name,
            description,
            display_order,
            status

        } = req.body;


        let image_url = "";


        // ===============================
        // UPLOAD IMAGE
        // ===============================

        if (req.file) {

            console.log(
                "Uploading service image to Cloudinary..."
            );


            const result =
                await uploadToCloudinary(
                    req.file.buffer
                );


            image_url =
                result.secure_url;


            console.log(
                "Cloudinary Image URL:",
                image_url
            );

        }
        else {

            console.log(
                "⚠️ No image received"
            );

        }


        // ===============================
        // INSERT DATABASE
        // ===============================

        await pool.query(

            `INSERT INTO temple_services
            (
                service_name,
                description,
                image_url,
                display_order,
                status
            )
            VALUES
            ($1,$2,$3,$4,$5)`,

            [

                service_name,

                description,

                image_url,

                display_order,

                status

            ]

        );


        res.json({

            success: true,

            message:
                "Service Added Successfully",

            image_url

        });

    }
    catch (err) {

        console.error(
            "❌ ADD SERVICE ERROR:",
            err
        );


        res.status(500).json({

            success: false,

            message:
                err.message

        });

    }

};


// ===============================
// UPDATE SERVICE
// ===============================
const updateService = async (req, res) => {

    try {

        console.log(
            "========== UPDATE SERVICE =========="
        );


        const { id } =
            req.params;


        console.log(
            "Service ID:",
            id
        );


        console.log(
            "Body:",
            req.body
        );


        console.log(
            "File:",
            req.file
        );


        const {

            service_name,
            description,
            display_order,
            status

        } = req.body;


        // ===============================
        // GET OLD IMAGE
        // ===============================

        const oldResult =
            await pool.query(

                `SELECT image_url
                 FROM temple_services
                 WHERE service_id=$1`,

                [id]

            );


        if (
            oldResult.rowCount === 0
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Service not found"

            });

        }


        const oldImageUrl =
            oldResult.rows[0].image_url;


        let image_url =
            oldImageUrl;


        // ===============================
        // NEW IMAGE
        // ===============================

        if (req.file) {

            console.log(
                "Uploading new service image to Cloudinary..."
            );


            const result =
                await uploadToCloudinary(
                    req.file.buffer
                );


            image_url =
                result.secure_url;


            console.log(
                "New Cloudinary Image URL:",
                image_url
            );


            // ===========================
            // UPDATE DATABASE
            // ===========================

            await pool.query(

                `UPDATE temple_services
                 SET
                    service_name=$1,
                    description=$2,
                    image_url=$3,
                    display_order=$4,
                    status=$5
                 WHERE service_id=$6`,

                [

                    service_name,

                    description,

                    image_url,

                    display_order,

                    status,

                    id

                ]

            );


            // ===========================
            // DELETE OLD IMAGE
            // ===========================

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

        // ===============================
        // NO NEW IMAGE
        // ===============================

        else {

            await pool.query(

                `UPDATE temple_services
                 SET
                    service_name=$1,
                    description=$2,
                    display_order=$3,
                    status=$4
                 WHERE service_id=$5`,

                [

                    service_name,

                    description,

                    display_order,

                    status,

                    id

                ]

            );

        }


        res.json({

            success: true,

            message:
                "Service Updated Successfully",

            image_url

        });

    }
    catch (err) {

        console.error(
            "❌ UPDATE SERVICE ERROR:",
            err
        );


        res.status(500).json({

            success: false,

            message:
                err.message

        });

    }

};


// ===============================
// DELETE SERVICE
// ===============================
const deleteService = async (req, res) => {

    try {

        console.log(
            "========== DELETE SERVICE =========="
        );


        const { id } =
            req.params;


        // ===============================
        // GET IMAGE
        // ===============================

        const result =
            await pool.query(

                `SELECT image_url
                 FROM temple_services
                 WHERE service_id=$1`,

                [id]

            );


        if (
            result.rowCount === 0
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Service not found"

            });

        }


        const imageUrl =
            result.rows[0].image_url;


        // ===============================
        // DELETE DATABASE RECORD
        // ===============================

        await pool.query(

            `DELETE FROM temple_services
             WHERE service_id=$1`,

            [id]

        );


        // ===============================
        // DELETE CLOUDINARY IMAGE
        // ===============================

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
                "Service Deleted Successfully"

        });

    }
    catch (err) {

        console.error(
            "❌ DELETE SERVICE ERROR:",
            err
        );


        res.status(500).json({

            success: false,

            message:
                err.message

        });

    }

};


// ===============================
// EXPORT
// ===============================

module.exports = {

    getAllServices,
    addService,
    updateService,
    deleteService

};