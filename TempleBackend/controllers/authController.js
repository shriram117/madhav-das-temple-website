const pool = require("../config/db");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {

    try {

        const { username, password } = req.body;

        const sql = `
            SELECT
                user_id,
                full_name,
                username,
                email,
                mobile_no,
                role,
                status,
                permissions
            FROM users
            WHERE username = $1
              AND password = $2
              AND status = true
        `;

        const result = await pool.query(
            sql,
            [username, password]
        );


        // =========================================
        // INVALID LOGIN
        // =========================================

        if (result.rows.length === 0) {

            return res.status(401).json({

                success: false,
                message: "Invalid Username or Password"

            });

        }


        const user = result.rows[0];


        // =========================================
        // PERMISSIONS
        // =========================================

        let permissions = user.permissions || {};


        // =========================================
        // SUPER ADMIN
        // =========================================

        if (user.role === "Super Admin") {

            permissions = {

                dashboard: true,
                gallery: true,
                events: true,
                donations: true,
                aarti: true,
                services: true,
                notice: true,
                members: true,
                locations: true,
                news: true,
                users: true,
                settings: true

            };

        }


        // =========================================
        // JWT TOKEN
        // =========================================

        const token = jwt.sign(

            {
                id: user.user_id,
                username: user.username,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "8h"
            }

        );


        // =========================================
        // RESPONSE
        // =========================================

        res.json({

            success: true,

            message: "Login Successful",

            token: token,

            user: {

                id: user.user_id,

                username: user.username,

                full_name: user.full_name,

                email: user.email,

                mobile_no: user.mobile_no,

                role: user.role,

                permissions: permissions

            }

        });

    }
    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};


module.exports = {
    login
};