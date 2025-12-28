import express from "express";
import cors from "cors";
import foodRouter from "./routes/foodRouter.js";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = 3000;

app.use(cors({
    origin: ["http://localhost:5173", /\.onrender\.com$/],
    credentials: true,
}));
app.use(express.json());

connectDB(process.env.MONGO_URL);

app.use("/images", express.static("uploads"));
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});