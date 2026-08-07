const pool = require("../config/db");

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const sql = `
    SELECT *
    FROM admin_users
    WHERE username = $1
      AND password = $2
      AND status = 'true'
`;

        const result = await pool.query(sql, [username, password]);

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid Username or Password"
            });
        }

        res.json({
            success: true,
            message: "Login Successful",
            user: {
                id: result.rows[0].id,
                username: result.rows[0].username,
                full_name: result.rows[0].full_name,
                role: result.rows[0].role
            }
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = { login };