const pool = require("../config/db");
const cloudinary = require("../config/cloudinary");


// ===============================
// CLOUDINARY UPLOAD
// ===============================
const uploadToCloudinary = (fileBuffer) => {

    return new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "madhav-das/events",
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

        if (!imageUrl.includes("res.cloudinary.com")) {
            return;
        }

        const parts = imageUrl.split("/upload/");

        if (parts.length !== 2) {
            return;
        }

        let publicId = parts[1];

        // Remove version
        publicId = publicId.replace(/^v\d+\//, "");

        // Remove extension
        publicId = publicId.replace(/\.[^/.]+$/, "");

        console.log("Deleting Cloudinary image:", publicId);

        await cloudinary.uploader.destroy(publicId, {
            resource_type: "image"
        });

    }
    catch (error) {

        console.error("Cloudinary Delete Error:", error.message);

    }

};


// ===============================
// GET ALL EVENTS
// ===============================
const getAllEvents = async (req, res) => {

    try {

        const result = await pool.query(
            `SELECT *
             FROM event_master
             ORDER BY event_id DESC`
        );

        res.json(result.rows);

    }
    catch (err) {

        console.error("Get Events Error:", err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


// ===============================
// ADD EVENT
// ===============================
const addEvent = async (req, res) => {

    try {

        const {
            title,
            description,
            event_date,
            event_time,
            location,
            created_by
        } = req.body;

        let image_url = "";


        // Upload image to Cloudinary
        if (req.file) {

            console.log("Uploading event image to Cloudinary...");

            const result = await uploadToCloudinary(
                req.file.buffer
            );

            image_url = result.secure_url;

            console.log(
                "Cloudinary Image URL:",
                image_url
            );

        }


        await pool.query(

            `INSERT INTO event_master
            (
                title,
                description,
                event_date,
                event_time,
                location,
                image_url,
                created_by
            )
            VALUES
            ($1,$2,$3,$4,$5,$6,$7)`,

            [
                title,
                description,
                event_date,
                event_time,
                location,
                image_url,
                created_by
            ]

        );


        res.json({

            success: true,
            message: "Event Added Successfully",
            image_url

        });

    }
    catch (err) {

        console.error(
            "❌ ADD EVENT ERROR:",
            err
        );

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};


// ===============================
// UPDATE EVENT
// ===============================
const updateEvent = async (req, res) => {

    try {

        console.log("========== UPDATE EVENT ==========");

        const { id } = req.params;

        console.log("Event ID:", id);
        console.log("Body:", req.body);
        console.log("File:", req.file);


        const {
            title,
            description,
            event_date,
            event_time,
            location
        } = req.body;


        // Get existing image from database
        const oldResult = await pool.query(

            `SELECT image_url
             FROM event_master
             WHERE event_id=$1`,

            [id]

        );


        if (oldResult.rowCount === 0) {

            return res.status(404).json({

                success: false,
                message: "Event not found"

            });

        }


        const oldImageUrl =
            oldResult.rows[0].image_url;


        let image_url = oldImageUrl;


        // =====================================
        // NEW IMAGE UPLOADED
        // =====================================
        if (req.file) {

            console.log(
                "Uploading new event image to Cloudinary..."
            );


            // Upload NEW image first
            const result = await uploadToCloudinary(
                req.file.buffer
            );


            image_url = result.secure_url;


            console.log(
                "New Cloudinary URL:",
                image_url
            );


            // Delete OLD image
            if (oldImageUrl) {

                await deleteFromCloudinary(
                    oldImageUrl
                );

            }

        }


        await pool.query(

            `UPDATE event_master
             SET
                title=$1,
                description=$2,
                event_date=$3,
                event_time=$4,
                location=$5,
                image_url=$6,
                modified_on=NOW()
             WHERE event_id=$7`,

            [
                title,
                description,
                event_date,
                event_time,
                location,
                image_url,
                id
            ]

        );


        res.json({

            success: true,
            message: "Event Updated Successfully",
            image_url

        });

    }
    catch (err) {

        console.error(
            "❌ UPDATE EVENT ERROR:",
            err
        );

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};


// ===============================
// DELETE EVENT
// ===============================
const deleteEvent = async (req, res) => {

    try {

        const { id } = req.params;


        // Get image before deleting event
        const result = await pool.query(

            `SELECT image_url
             FROM event_master
             WHERE event_id=$1`,

            [id]

        );


        if (result.rowCount === 0) {

            return res.status(404).json({

                success: false,
                message: "Event not found"

            });

        }


        const imageUrl =
            result.rows[0].image_url;


        // Delete database record
        await pool.query(

            `DELETE FROM event_master
             WHERE event_id=$1`,

            [id]

        );


        // Delete Cloudinary image
        if (imageUrl) {

            await deleteFromCloudinary(
                imageUrl
            );

        }


        res.json({

            success: true,
            message: "Event Deleted Successfully"

        });

    }
    catch (err) {

        console.error(
            "❌ DELETE EVENT ERROR:",
            err
        );

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};


// ===============================
// UPCOMING EVENTS
// ===============================
const getUpcomingEvents = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT
                event_id,
                title,
                event_date,
                event_time,
                location,
                image_url
             FROM event_master
             WHERE status = true
             ORDER BY event_date ASC
             LIMIT 5`

        );

        res.json(result.rows);

    }
    catch (err) {

        console.error(
            "Upcoming Events Error:",
            err
        );

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};


module.exports = {

    getAllEvents,
    getUpcomingEvents,
    addEvent,
    updateEvent,
    deleteEvent

};