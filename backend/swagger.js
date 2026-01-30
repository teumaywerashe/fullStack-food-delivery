import http from "http";
import fs from "fs";
import path from "path";
import swaggerDocument from "./swagger.js";
import swaggerUI from "swagger-ui-dist";

// Serve Swagger UI
const serveSwagger = (req, res) => {
    if (!req.url.startsWith("/api/docs")) return false;

    const swaggerDistPath = swaggerUI.getAbsoluteFSPath();
    let filePath = req.url.replace("/api/docs", swaggerDistPath);
    if (req.url === "/api/docs" || req.url === "/api/docs/") {
        // Serve index.html
        filePath = path.join(swaggerDistPath, "index.html");
    }

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Not Found");
            return;
        }

        // Inject our swaggerDocument into the index.html
        if (filePath.endsWith("index.html")) {
            const html = data.replace(
                "window.ui = SwaggerUIBundle({",
                `window.ui = SwaggerUIBundle({ spec: ${JSON.stringify(swaggerDocument)}, `
            );
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
            return;
        }

        res.writeHead(200);
        res.end(data);
    });

    return true;
};