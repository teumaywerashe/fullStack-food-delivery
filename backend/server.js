import http from "http";
import fs from "fs";
import path from "path";
import "dotenv/config.js";
import connectDB from "./config/db.js";

import { handleFoodRoutes } from "./routes/foodRoute.js";
import { handleUserRoutes } from "./routes/userRoute.js";
import { handleCartRoutes } from "./routes/cartRoute.js";
import { handleOrderRoutes } from "./routes/orderRoute.js";
import { handleNotificationRoutes } from "./routes/notificationRoute.js";

const PORT = process.env.PORT || 4000;

const __dirname = process.cwd();
const clientDistPath = path.join(__dirname, "../frontend/dist");

const parseJsonBody = (req) =>
    new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (err) {
                reject(err);
            }
        });
    });

const setCors = (res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, token");
};



const serveReactStatic = (req, res) => {
    let filePath = path.join(clientDistPath, req.url === "/" ? "index.html" : req.url);
    if (!filePath.startsWith(clientDistPath)) return false;
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) return false;

    const ext = path.extname(filePath);
    const contentTypes = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".svg": "image/svg+xml",
        ".ico": "image/x-icon",
        ".json": "application/json",
    };

    res.writeHead(200, { "Content-Type": contentTypes[ext] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
    return true;
};

const serveImages = (req, res) => {

    if (!req.url.startsWith("/images")) return false;

    const imageName = req.url.replace("/images/", "");
    const filePath = path.join(__dirname, "uploads", imageName);

    if (!fs.existsSync(filePath)) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, msg: "Image not found" }));
        return true;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentTypes = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png" };

    res.writeHead(200, { "Content-Type": contentTypes[ext] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
    return true;
};

const server = http.createServer(async(req, res) => {
    setCors(res);

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    if (serveReactStatic(req, res)) return;
    if (serveImages(req, res)) return;

    if (req.url === "/health" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Server is healthy");
        return;
    }


    if (["POST", "PATCH", "DELETE"].includes(req.method)) {
        const contentType = req.headers["content-type"] || "";
        if (!contentType.includes("multipart/form-data")) {
            try {
                req.body = await parseJsonBody(req);
            } catch {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: false, msg: "Invalid JSON" }));
                return;
            }
        }
    }


    if (await handleFoodRoutes(req, res)) return;
    if (await handleUserRoutes(req, res)) return;
    if (await handleCartRoutes(req, res)) return;
    if (await handleOrderRoutes(req, res)) return;
    if (await handleNotificationRoutes(req, res)) return;


    if (req.method === "GET") {
        const indexPath = path.join(clientDistPath, "index.html");
        if (fs.existsSync(indexPath)) {
            res.writeHead(200, { "Content-Type": "text/html" });
            fs.createReadStream(indexPath).pipe(res);
            return;
        }
    }


    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: false, msg: "Route not found" }));
});


const startServer = async() => {
    try {

        const uploadPath = path.join(__dirname, "uploads");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
            console.log("📁 Created 'uploads' directory");
        }

        await connectDB(process.env.MONGO_URL);
        console.log("✅ DB connected");

        server.listen(PORT, () => {});
    } catch (err) {
        console.error("⚠️ Server startup failed:", err.message);
    }
};

startServer();