const multer = require("multer");


// =========================================
// MEMORY STORAGE
// Cloudinary के लिए file RAM में मिलेगी
// req.file.buffer के रूप में
// =========================================

const storage = multer.memoryStorage();


// =========================================
// FILE FILTER
// =========================================

const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp"
    ];

    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(
            new Error(
                "Only JPG, JPEG, PNG and WEBP images are allowed."
            )
        );

    }

};


// =========================================
// MULTER
// =========================================

const upload = multer({

    storage: storage,

    fileFilter: fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024
    }

});


module.exports = upload;