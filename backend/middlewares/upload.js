import fs from "fs";
import path from "path";

const uploadSingle = (req) => {
    return new Promise((resolve) => {
        const contentType = req.headers["content-type"];
        if (!contentType || !contentType.includes("multipart/form-data")) {
            resolve();
            return;
        }

        const boundary = contentType.split("boundary=")[1];
        let buffer = Buffer.alloc(0);

        req.on("data", chunk => {
            buffer = Buffer.concat([buffer, chunk]);
        });

        req.on("end", () => {
            const parts = buffer.toString().split(`--${boundary}`);

            for (const part of parts) {
                if (part.includes("filename=")) {
                    const filename = `${Date.now()}.jpg`;
                    const fileData = part.split("\r\n\r\n")[1].split("\r\n")[0];

                    if (!fileData) continue;

                    fs.writeFileSync(path.join("uploads", filename), fileData, "binary");
                    req.file = { filename }; // 👈 HERE
                }
            }
            resolve();
        });
    });
};

export default uploadSingle;