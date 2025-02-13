import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./db.js";
import cookieParser from "cookie-parser";
import user_router from "./router/user-router.js";
import { createAdminUser } from "./controller/user-controller.js";
import User from "./model/user-model.js";
import destination_router from "./router/destination-router.js";
import destination_order_router from "./router/destination-order-router.js";
import souvenier_router from "./router/souvenier-router.js";
import souvenier_order_router from "./router/souvenier-order-router.js";
import hotel_router from "./router/hotel-router.js";
import hotel_order_router from "./router/hotel-order-router.js";
import plane_router from "./router/plane-availability-router.js";
//Routes file paths

const app = express();

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "https://tour-me-frontend-c126k9y9u-kottagenvh.vercel.app",
  "https://tour-me-frontend.vercel.app",
  "https://tour-me-frontend-git-main-kottagenvh.vercel.app/",
  "https://vercel.com/kottagenvh/tour-me-enterprise/2rqvaykMvRXN2P8M4ZVyhQ9igqts",
  "https://tour-me-enterprise.vercel.app",
  
];

app.use(cors({ credentials: true, origin: allowedOrigins }));
app.use(bodyParser.json());
app.use(cookieParser());

// Check for admin user and create one if not exists
const checkAdminUser = async () => {
  try {
    const adminUser = await User.findOne({ role: "admin" });
    if (!adminUser) {
      // Create admin user
      await createAdminUser({
        body: {
          username: "admin@tourme.lk",
          email: "admin@tourme.lk",
          role: "admin",
          approved: "true",
          password: "Admin123",
        },
      });
    }
  } catch (error) {
    console.error("Error checking/admin user:", error);
  }
};

// Call the function to check/admin user before starting the server
checkAdminUser();

//routes are declared here
app.use("/user", user_router);
app.use("/destination", destination_router);
app.use("/destination-order", destination_order_router);
app.use("/souvenier", souvenier_router);
app.use("/souvenier-order", souvenier_order_router);
app.use("/hotel", hotel_router);
app.use("/hotel-order", hotel_order_router);
app.use("/plane", plane_router);

//db connections
db();

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello from express");
});

export default app;
