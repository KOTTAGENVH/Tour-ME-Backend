import { createUser, loginUser, forgetPassword, getAllUsers, getUserById, deleteUser, updateUser, blockUser, getAllCustomerUsers, getAllDestinationUsers, getAllHotelUsers, getAllSouvnierUsers } from "../controller/user-controller.js";
import express from "express";

const user_router = express.Router();

user_router.post("/create-user", createUser);
user_router.post("/login-user", loginUser);
user_router.patch("/forget-password", forgetPassword);
user_router.get("/get-all-users", getAllUsers);
user_router.get("/get-user-by-id/:id", getUserById);
user_router.delete("/delete-user/:id", deleteUser);
user_router.patch("/update-user/:id", updateUser);
user_router.patch("/block-user/:id", blockUser);
user_router.get("/get-all-customer-users", getAllCustomerUsers);
user_router.get("/get-all-destination-users", getAllDestinationUsers);
user_router.get("/get-all-hotel-users", getAllHotelUsers);
user_router.get("/get-all-souvnier-users", getAllSouvnierUsers);

export default user_router;