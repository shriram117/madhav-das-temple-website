const pool = require("../config/db");

// Get All Users
const getAllUsers = async (req, res) => {

    try {

        const result = await pool.query(
            `SELECT
                user_id,
                full_name,
                username,
                email,
                mobile_no,
                role,
                status
             FROM users
             ORDER BY user_id DESC`
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
// Update User
const updateUser = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            full_name,
            username,
            email,
            mobile_no,
            password,
            role,
            status
        } = req.body;

        if (password && password.trim() !== "") {

            await pool.query(

                `UPDATE users
                 SET
                    full_name=$1,
                    username=$2,
                    email=$3,
                    mobile_no=$4,
                    password=$5,
                    role=$6,
                    status=$7,
                    modified_on=NOW()
                 WHERE user_id=$8`,

                [
                    full_name,
                    username,
                    email,
                    mobile_no,
                    password,
                    role,
                    status,
                    id
                ]

            );

        } else {

            await pool.query(

                `UPDATE users
                 SET
                    full_name=$1,
                    username=$2,
                    email=$3,
                    mobile_no=$4,
                    role=$5,
                    status=$6,
                    modified_on=NOW()
                 WHERE user_id=$7`,

                [
                    full_name,
                    username,
                    email,
                    mobile_no,
                    role,
                    status,
                    id
                ]

            );

        }

        res.json({

            success: true,
            message: "User Updated Successfully"

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

// Add User
const addUser = async (req, res) => {

    try {

        const {
            full_name,
            username,
            email,
            password,
            mobile_no,
            role
        } = req.body;

        await pool.query(

            `INSERT INTO users
            (
                full_name,
                username,
                email,
                password,
                mobile_no,
                role
            )
            VALUES
            ($1,$2,$3,$4,$5,$6)`,

            [
                full_name,
                username,
                email,
                password,
                mobile_no,
                role
            ]

        );

        res.json({

            success: true,
            message: "User Added Successfully"

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

// Delete User
const deleteUser = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            "DELETE FROM users WHERE user_id=$1",
            [id]
        );

        res.json({

            success: true,
            message: "User Deleted Successfully"

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

    getAllUsers,
    addUser,
    updateUser,
    deleteUser

};