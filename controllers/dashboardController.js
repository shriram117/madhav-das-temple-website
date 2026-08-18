const pool = require("../config/db");

const getDashboard = async (req, res) => {

    try {

        const gallery = await pool.query(
            "SELECT COUNT(*) FROM gallery"
        );

        const events = await pool.query(
            "SELECT COUNT(*) FROM event_master"
        );

        const users = await pool.query(
            "SELECT COUNT(*) FROM users"
        );

        res.json({

            gallery: gallery.rows[0].count,
            events: events.rows[0].count,
            users: users.rows[0].count,
            donations: 0

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

    getDashboard

};