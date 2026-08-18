const pool = require("../config/db");
const cloudinary = require("../config/cloudinary");

const fs = require("fs");
const path = require("path");


// ============================================
// CLOUDINARY DELETE HELPER
// ============================================

const deleteFromCloudinary = async (imageUrl) => {

    try {

        if (
            !imageUrl ||
            !imageUrl.includes("res.cloudinary.com")
        ) {
            return;
        }

        const url = new URL(imageUrl);

        const parts = url.pathname.split("/");

        const uploadIndex = parts.indexOf("upload");

        if (uploadIndex === -1) {
            return;
        }

        let publicIdParts =
            parts.slice(uploadIndex + 1);

        // Remove version: v1234567890
        if (
            publicIdParts[0] &&
            /^v\d+$/.test(publicIdParts[0])
        ) {
            publicIdParts.shift();
        }

        let publicId =
            publicIdParts.join("/");

        // Remove extension
        publicId =
            publicId.replace(
                /\.[^/.]+$/,
                ""
            );

        console.log(
            "Deleting Cloudinary image:",
            publicId
        );

        await cloudinary.uploader.destroy(
            publicId,
            {
                resource_type: "image"
            }
        );

        console.log(
            "Cloudinary image deleted:",
            publicId
        );

    }
    catch (err) {

        console.error(
            "Cloudinary delete error:",
            err.message
        );

    }

};


// ============================================
// CLOUDINARY UPLOAD HELPER
// ============================================

const uploadToCloudinary = (file) => {

    return new Promise((resolve, reject) => {

        const uploadStream =
            cloudinary.uploader.upload_stream(

                {
                    folder:
                        "madhavdasji/settings",

                    resource_type:
                        "image"
                },

                (error, result) => {

                    if (error) {

                        console.error(
                            "Cloudinary upload error:",
                            error
                        );

                        reject(error);

                        return;
                    }

                    resolve(result);

                }

            );


        uploadStream.end(
            file.buffer
        );

    });

};


// ============================================
// GET SETTINGS
// ============================================

const getSettings = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT *
             FROM temple_settings
             ORDER BY setting_id
             LIMIT 1`

        );


        if (result.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message:
                    "Temple settings not found"

            });

        }


        res.json(
            result.rows[0]
        );

    }
    catch (err) {

        console.error(
            "GET SETTINGS ERROR:",
            err
        );


        res.status(500).json({

            success: false,

            message:
                err.message

        });

    }

};


// ============================================
// UPDATE SETTINGS
// ============================================

const updateSettings = async (req, res) => {

    try {

        console.log(
            "================================="
        );

        console.log(
            "UPDATE SETTINGS"
        );

        console.log(
            "NODE_ENV:",
            process.env.NODE_ENV
        );

        console.log(
            "BODY:",
            req.body
        );

        console.log(
            "FILES:",
            req.files
        );

        console.log(
            "================================="
        );


        // ========================================
        // GET CURRENT SETTINGS
        // ========================================

        const settingResult =
            await pool.query(

                `SELECT
                    setting_id,
                    temple_logo,
                    temple_banner
                 FROM temple_settings
                 ORDER BY setting_id
                 LIMIT 1`

            );


        if (settingResult.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message:
                    "Temple settings record not found"

            });

        }


        const currentSettings =
            settingResult.rows[0];

        const settingId =
            currentSettings.setting_id;


        // ========================================
        // FORM DATA
        // ========================================

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


        // ========================================
        // KEEP OLD IMAGES
        // ========================================

        let temple_logo =
            currentSettings.temple_logo || "";

        let temple_banner =
            currentSettings.temple_banner || "";


        // ========================================
        // TEMPLE LOGO
        // ========================================

        if (
            req.files?.temple_logo?.[0]
        ) {

            const file =
                req.files.temple_logo[0];


            console.log(
                "Uploading temple logo..."
            );


            // ------------------------------------
            // PRODUCTION
            // ------------------------------------

            if (
                process.env.NODE_ENV ===
                "production"
            ) {

                const result =
                    await uploadToCloudinary(
                        file
                    );


                temple_logo =
                    result.secure_url;


                console.log(
                    "New Cloudinary Logo:",
                    temple_logo
                );


                // Delete old image
                await deleteFromCloudinary(
                    currentSettings.temple_logo
                );

            }


            // ------------------------------------
            // LOCAL
            // ------------------------------------

            else {

                const uploadDir =
                    path.join(
                        __dirname,
                        "../uploads/settings"
                    );


                if (
                    !fs.existsSync(uploadDir)
                ) {

                    fs.mkdirSync(
                        uploadDir,
                        {
                            recursive: true
                        }
                    );

                }


                const fileName =
                    Date.now() +
                    "-" +
                    Math.round(
                        Math.random() *
                        1E9
                    ) +
                    path.extname(
                        file.originalname
                    );


                const filePath =
                    path.join(
                        uploadDir,
                        fileName
                    );


                fs.writeFileSync(
                    filePath,
                    file.buffer
                );


                temple_logo =
                    "/uploads/settings/" +
                    fileName;


                console.log(
                    "Local Logo:",
                    temple_logo
                );

            }

        }


        // ========================================
        // TEMPLE BANNER
        // ========================================

        if (
            req.files?.temple_banner?.[0]
        ) {

            const file =
                req.files.temple_banner[0];


            console.log(
                "Uploading temple banner..."
            );


            // ------------------------------------
            // PRODUCTION
            // ------------------------------------

            if (
                process.env.NODE_ENV ===
                "production"
            ) {

                const result =
                    await uploadToCloudinary(
                        file
                    );


                temple_banner =
                    result.secure_url;


                console.log(
                    "New Cloudinary Banner:",
                    temple_banner
                );


                // Delete old image
                await deleteFromCloudinary(
                    currentSettings.temple_banner
                );

            }


            // ------------------------------------
            // LOCAL
            // ------------------------------------

            else {

                const uploadDir =
                    path.join(
                        __dirname,
                        "../uploads/settings"
                    );


                if (
                    !fs.existsSync(uploadDir)
                ) {

                    fs.mkdirSync(
                        uploadDir,
                        {
                            recursive: true
                        }
                    );

                }


                const fileName =
                    Date.now() +
                    "-" +
                    Math.round(
                        Math.random() *
                        1E9
                    ) +
                    path.extname(
                        file.originalname
                    );


                const filePath =
                    path.join(
                        uploadDir,
                        fileName
                    );


                fs.writeFileSync(
                    filePath,
                    file.buffer
                );


                temple_banner =
                    "/uploads/settings/" +
                    fileName;


                console.log(
                    "Local Banner:",
                    temple_banner
                );

            }

        }


        // ========================================
        // UPDATE DATABASE
        // ========================================

        const updateResult =
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

                 WHERE setting_id=$18`,

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
                    live_darshan_url,
                    settingId

                ]

            );


        console.log(
            "ROWS UPDATED:",
            updateResult.rowCount
        );


        // ========================================
        // RESPONSE
        // ========================================

        res.json({

            success: true,

            message:
                "Settings Updated Successfully",

            setting_id:
                settingId,

            temple_logo:
                temple_logo,

            temple_banner:
                temple_banner

        });

    }
    catch (err) {

        console.error(
            "UPDATE SETTINGS ERROR:",
            err
        );


        res.status(500).json({

            success: false,

            message:
                err.message

        });

    }

};


// ============================================
// EXPORT
// ============================================

module.exports = {

    getSettings,
    updateSettings

};