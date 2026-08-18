const pool = require("../config/db");

// Get All Services
const getAllServices = async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT *
            FROM temple_services
            ORDER BY display_order, service_id
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

// Add Service
const addService = async (req, res) => {

    try {

        const {

            service_name,
            description,
            display_order,
            status

        } = req.body;

        const image_url = req.file
            ? "/uploads/services/" + req.file.filename
            : null;

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
            (
                $1,$2,$3,$4,$5
            )`,

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
            message: "Service Added Successfully"

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

// Update Service
const updateService = async (req, res) => {

    try {

        const {

            service_name,
            description,
            display_order,
            status

        } = req.body;

        let sql = "";
        let params = [];

        if (req.file) {

            const image_url =
                "/uploads/services/" + req.file.filename;

            sql = `

                UPDATE temple_services

                SET

                    service_name=$1,

                    description=$2,

                    image_url=$3,

                    display_order=$4,

                    status=$5,

                    modified_on=NOW()

                WHERE service_id=$6

            `;

            params = [

                service_name,

                description,

                image_url,

                display_order,

                status,

                req.params.id

            ];

        }
        else {

            sql = `

                UPDATE temple_services

                SET

                    service_name=$1,

                    description=$2,

                    display_order=$3,

                    status=$4,

                    modified_on=NOW()

                WHERE service_id=$5

            `;

            params = [

                service_name,

                description,

                display_order,

                status,

                req.params.id

            ];

        }

        await pool.query(sql, params);

        res.json({

            success: true,

            message: "Service Updated Successfully"

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

// Delete Service
const deleteService = async (req, res) => {

    try {

        await pool.query(

            "DELETE FROM temple_services WHERE service_id=$1",

            [req.params.id]

        );

        res.json({

            success: true,

            message: "Service Deleted Successfully"

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

    getAllServices,

    addService,

    updateService,

    deleteService

};