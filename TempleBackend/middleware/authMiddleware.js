const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {

    try {

        const authHeader = req.headers["authorization"];

        if (!authHeader) {

            return res.status(401).json({
                success: false,
                message: "Authorization token required"
            });

        }


        const token = authHeader.split(" ")[1];

        if (!token) {

            return res.status(401).json({
                success: false,
                message: "Invalid authorization format"
            });

        }


        jwt.verify(
            token,
            process.env.JWT_SECRET,
            (err, user) => {

                if (err) {

                    return res.status(403).json({
                        success: false,
                        message: "Invalid or expired token"
                    });

                }


                req.user = user;

                next();

            }
        );

    }
    catch (err) {

        console.error("Auth Middleware Error:", err);

        return res.status(500).json({
            success: false,
            message: "Authentication failed"
        });

    }

};

module.exports = authenticateToken;