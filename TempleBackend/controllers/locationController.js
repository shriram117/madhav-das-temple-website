const pool = require("../config/db");
const cloudinary = require("../config/cloudinary");


// =========================================
// CLOUDINARY UPLOAD
// =========================================

const uploadToCloudinary = (buffer) => {

    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(

            {
                folder: "madhav-das/locations",
                resource_type: "image"
            },

            (error, result) => {

                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }

            }

        );

        stream.end(buffer);

    });

};


// =========================================
// GET ALL ACTIVE LOCATIONS
// =========================================

const getLocations = async (req, res) => {

    try {

        const result = await pool.query(`

            SELECT
                location_id,
                temple_name,
                state,
                city,
                address,
                mobile_no,
                timings,
                image_url,
                google_map_url,
                description,
                display_order,
                status,
                created_by,
                created_on,
                modified_on

            FROM temple_locations

            WHERE status = TRUE

            ORDER BY
                display_order ASC,
                location_id ASC

        `);


        res.json(result.rows);

    }

    catch (error) {

        console.error(
            "Get Locations Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to fetch temple locations"

        });

    }

};


// =========================================
// GET LOCATION BY ID
// =========================================

const getLocationById = async (req, res) => {

    try {

        const { id } = req.params;


        const result = await pool.query(

            `

            SELECT *

            FROM temple_locations

            WHERE location_id = $1

            `,

            [id]

        );


        if (result.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message:
                    "Temple location not found"

            });

        }


        res.json(result.rows[0]);

    }

    catch (error) {

        console.error(
            "Get Location By ID Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to fetch temple location"

        });

    }

};


// =========================================
// CREATE LOCATION
// =========================================

const createLocation = async (req, res) => {

    try {

        const {

            temple_name,
            state,
            city,
            address,
            mobile_no,
            timings,
            google_map_url,
            description,
            display_order,
            status,
            created_by

        } = req.body;


        // =====================================
        // VALIDATION
        // =====================================

        if (!temple_name || !temple_name.trim()) {

            return res.status(400).json({

                success: false,

                message:
                    "Temple name is required"

            });

        }


        // =====================================
        // CLOUDINARY IMAGE
        // =====================================

        let image_url = null;


        if (req.file) {

            const uploadResult =
                await uploadToCloudinary(
                    req.file.buffer
                );


            image_url =
                uploadResult.secure_url;

        }


        // =====================================
        // DATABASE INSERT
        // =====================================

        const result = await pool.query(

            `

            INSERT INTO temple_locations (

                temple_name,
                state,
                city,
                address,
                mobile_no,
                timings,
                image_url,
                google_map_url,
                description,
                display_order,
                status,
                created_by,
                created_on,
                modified_on

            )

            VALUES (

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
                $11,
                $12,
                CURRENT_TIMESTAMP,
                CURRENT_TIMESTAMP

            )

            RETURNING *

            `,

            [

                temple_name.trim(),

                state || null,

                city || null,

                address || null,

                mobile_no || null,

                timings || null,

                image_url,

                google_map_url || null,

                description || null,

                display_order
                    ? Number(display_order)
                    : 0,

                status !== undefined
                    ? status === "true" || status === true
                    : true,

                created_by
                    ? Number(created_by)
                    : null

            ]

        );


        res.status(201).json({

            success: true,

            message:
                "Temple location created successfully",

            data:
                result.rows[0]

        });

    }

    catch (error) {

        console.error(
            "Create Location Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to create temple location"

        });

    }

};


// =========================================
// UPDATE LOCATION
// =========================================

const updateLocation = async (req, res) => {

    try {

        const { id } = req.params;


        const {

            temple_name,
            state,
            city,
            address,
            mobile_no,
            timings,
            google_map_url,
            description,
            display_order,
            status

        } = req.body;


        // =====================================
        // VALIDATION
        // =====================================

        if (!temple_name || !temple_name.trim()) {

            return res.status(400).json({

                success: false,

                message:
                    "Temple name is required"

            });

        }


        // =====================================
        // GET OLD IMAGE
        // =====================================

        const existing = await pool.query(

            `

            SELECT image_url

            FROM temple_locations

            WHERE location_id = $1

            `,

            [id]

        );


        if (existing.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message:
                    "Temple location not found"

            });

        }


        const oldImage =
            existing.rows[0].image_url;


        // =====================================
        // IMAGE
        // =====================================

        let image_url = oldImage;


        if (req.file) {

            const uploadResult =
                await uploadToCloudinary(
                    req.file.buffer
                );


            image_url =
                uploadResult.secure_url;

        }


        // =====================================
        // UPDATE DATABASE
        // =====================================

        const result = await pool.query(

            `

            UPDATE temple_locations

            SET

                temple_name = $1,
                state = $2,
                city = $3,
                address = $4,
                mobile_no = $5,
                timings = $6,
                image_url = $7,
                google_map_url = $8,
                description = $9,
                display_order = $10,
                status = $11,
                modified_on = CURRENT_TIMESTAMP

            WHERE location_id = $12

            RETURNING *

            `,

            [

                temple_name.trim(),

                state || null,

                city || null,

                address || null,

                mobile_no || null,

                timings || null,

                image_url,

                google_map_url || null,

                description || null,

                display_order
                    ? Number(display_order)
                    : 0,

                status !== undefined
                    ? status === "true" || status === true
                    : true,

                id

            ]

        );


        res.json({

            success: true,

            message:
                "Temple location updated successfully",

            data:
                result.rows[0]

        });

    }

    catch (error) {

        console.error(
            "Update Location Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to update temple location"

        });

    }

};


// =========================================
// DELETE LOCATION
// =========================================

const deleteLocation = async (req, res) => {

    try {

        const { id } = req.params;


        const result = await pool.query(

            `

            DELETE FROM temple_locations

            WHERE location_id = $1

            RETURNING *

            `,

            [id]

        );


        if (result.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message:
                    "Temple location not found"

            });

        }


        res.json({

            success: true,

            message:
                "Temple location deleted successfully"

        });

    }

    catch (error) {

        console.error(
            "Delete Location Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to delete temple location"

        });

    }

};


// =========================================
// EXPORT
// =========================================

module.exports = {

    getLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation

};