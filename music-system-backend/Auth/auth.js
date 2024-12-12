const JWT_TOKEN = process.env.JWT_TOKEN;
const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"] || req.body.token || req.query.token;
    console.log("Received Token:", token);

    if (!token) {
        return res.json({ message: "Authorization required", success: false });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimStart();
    }

    try {
        const jwtPayload = jwt.verify(token, process.env.JWT_TOKEN || 'kanchan');
        console.log("Decoded JWT Payload:", jwtPayload);  // Log the decoded payload
        res.locals.jwtPayload = jwtPayload;
        req.user = jwtPayload;  // Attach the user info (e.g., user id) to the request object
        next();
    } catch (error) {
        return res.send({ message: 'Unauthorised Request.', error: error.message, success: false });
    }
};

module.exports = Auth;
