const pool = require("../config/db");

// Get All Events
const getAllEvents = async (req, res) => {

    console.log("========== EVENT ==========");
    console.log("Body:", req.body);
    console.log("File:", req.file);
    try {

        const result = await pool.query(
            "SELECT * FROM event_master ORDER BY event_id DESC"
        );

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

// Add Event
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

        if (req.file) {

            image_url = "/uploads/events/" + req.file.filename;

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
            message: "Event Added Successfully"

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

// Update Event
const updateEvent = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            title,
            description,
            event_date,
            event_time,
            location
        } = req.body;

        let image_url = req.body.old_image;

        if (req.file) {

            image_url = "/uploads/events/" + req.file.filename;

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
            message: "Event Updated Successfully"

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
// Delete Event
const deleteEvent = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            "DELETE FROM event_master WHERE event_id=$1",
            [id]
        );

        res.json({

            success: true,
            message: "Event Deleted Successfully"

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
// Upcoming Events
const getUpcomingEvents = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT
                event_id,
                title,
                event_date,
                event_time,
                location
             FROM event_master
             WHERE status = true
             ORDER BY event_date ASC
             LIMIT 5`

        );

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

    getAllEvents,
    getUpcomingEvents,
    addEvent,
    updateEvent,
    deleteEvent

};