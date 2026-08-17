const pool = require("../config/db");

const checkPermission = (permission) => {

    return async (req, res, next) => {

        try {

            // User ID middleware से आना चाहिए
            const userId = req.user?.id;

            if (!userId) {

                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                });

            }


            // Get user from database
            const result = await pool.query(
                `
                SELECT
                    user_id,
                    username,
                    role,
                    status,
                    permissions
                FROM users
                WHERE user_id = $1
                `,
                [userId]
            );


            if (result.rows.length === 0) {

                return res.status(401).json({
                    success: false,
                    message: "User not found"
                });

            }


            const user = result.rows[0];


            // Check active status
            if (!user.status) {

                return res.status(403).json({
                    success: false,
                    message: "User account is inactive"
                });

            }


            // Super Admin gets full access
            if (user.role === "Super Admin") {

                req.user = user;

                return next();

            }


            // Permission check
            const hasPermission =
                user.permissions?.[permission] === true;


            if (!hasPermission) {

                return res.status(403).json({
                    success: false,
                    message: "You don't have permission to access this resource."
                });

            }


            // Store user in request
            req.user = user;

            next();

        }
        catch (err) {

            console.error(
                "Permission Middleware Error:",
                err
            );

            return res.status(500).json({
                success: false,
                message: "Permission check failed"
            });

        }

    };

};


module.exports = checkPermission;