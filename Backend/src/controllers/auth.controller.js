const jwt = require('jsonwebtoken');

const login = (req, res) => {
    try {
        const { username, password } = req.body;

        if (username === 'GeekRoomJims' && password === 'GeekRoom@Jims@1234567@') {
            const token = jwt.sign(
                { id: 'admin', role: 'admin' },
                process.env.JWT_SECRET || 'fallback_secret_key_geekroom',
                { expiresIn: '1d' }
            );

            return res.status(200).json({
                success: true,
                token
            });
        }

        return res.status(401).json({
            success: false,
            message: 'Invalid username or password'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error during login'
        });
    }
};

module.exports = { login };
