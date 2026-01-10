import jwt from "jsonwebtoken";

const authMiddleWare = async(req, res, next) => {


    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, msg: "not authorised access" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        // console.log(req.userId);
        next()
    } catch (error) {
        res.json({ success: false, msg: "error" })
    }


};

export default authMiddleWare;