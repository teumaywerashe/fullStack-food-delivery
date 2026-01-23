import express from "express";
import cors from "cors";
import foodRouter from "./routes/foodRouter.js";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { notificationRouter } from "./routes/notificationRoute.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            /\.onrender\.com$/,
        ],
        credentials: true,
    }),
);
app.use(express.json());


app.get('/', (req, res) => {
    res.send('server is running successfully')
})

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use("/images", express.static("uploads"));
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/notification", notificationRouter);
const start = async() => {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
};
start();