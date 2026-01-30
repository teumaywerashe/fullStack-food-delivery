export const parseBody = (req) => {

    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                resolve(JSON.parse(body || "{}"));
                console.log(JSON.parse(body));
            } catch (err) {
                reject(err);
                console.log(error);
            }
        });
    });
};