const pool = require("../config/db");

// Get Temple Settings
const getSettings = async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM temple_settings LIMIT 1"
        );

        res.json(result.rows[0]);

    }
    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

// Update Temple Settings
const updateSettings = async (req, res) => {

    try {

        const {

            temple_name,
            about_temple,
            address,
            city,
            state,
            pincode,
            mobile_no,
            whatsapp_no,
            email,
            website,
            facebook_url,
            instagram_url,
            youtube_url,
            google_map,
            live_darshan_url

        } = req.body;

        let temple_logo = req.body.old_logo;
        let temple_banner = req.body.old_banner;

        if (req.files?.temple_logo) {

            temple_logo =
                "/uploads/settings/" +
                req.files.temple_logo[0].filename;

        }

        if (req.files?.temple_banner) {

            temple_banner =
                "/uploads/settings/" +
                req.files.temple_banner[0].filename;

        }

        await pool.query(

            `UPDATE temple_settings
             SET

                temple_name=$1,
                about_temple=$2,
                temple_logo=$3,
                temple_banner=$4,
                address=$5,
                city=$6,
                state=$7,
                pincode=$8,
                mobile_no=$9,
                whatsapp_no=$10,
                email=$11,
                website=$12,
                facebook_url=$13,
                instagram_url=$14,
                youtube_url=$15,
                google_map=$16,
                live_darshan_url=$17,
                modified_on=NOW()

             WHERE setting_id=1`,

            [

                temple_name,
                about_temple,
                temple_logo,
                temple_banner,
                address,
                city,
                state,
                pincode,
                mobile_no,
                whatsapp_no,
                email,
                website,
                facebook_url,
                instagram_url,
                youtube_url,
                google_map,
                live_darshan_url

            ]

        );

        res.json({

            success: true,
            message: "Settings Updated Successfully"

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

    getSettings,
    updateSettings

};