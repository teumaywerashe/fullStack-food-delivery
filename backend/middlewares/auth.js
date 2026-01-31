import jwt from "jsonwebtoken";

const authMiddleware = (req, res) => {
    try {

        const token = req.headers["token"] || req.headers["authorization"].split(" ")[1];

        if (!token) {
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, msg: "Not authorized: No token provided" }));
            return false;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;

        if (req.body && typeof req.body === 'object') {
            req.body.userId = decoded.id;
        }

        return true;
    } catch (error) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, msg: "Invalid or expired token" }));
        return false;
    }
};

export default authMiddleware;