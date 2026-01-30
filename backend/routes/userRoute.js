import { registerUser, loginUser, getAllUsers } from "../controllers/userControler.js";

export const handleUserRoutes = async(req, res) => {

    if (!req.url.startsWith("/user")) return false;

    const urlParts = req.url.split("/").filter(Boolean);
    const method = req.method;


    if (method === "POST" && urlParts[1] === "register") {

        await registerUser(req, res);
        return true;
    }


    if (method === "POST" && urlParts[1] === "login") {

        await loginUser(req, res);
        return true;
    }


    if (method === "GET" && urlParts.length === 1) {

        await getAllUsers(req, res);
        return true;
    }

    return false;
};