import { createDestinationOrder, getDestinationOrders, getDestinationOrder, getDestinationOrderByUserEmail, getDestinationOrderBySellerEmail, deleteDestinationOrder } from "../controller/destination-order-controller.js";
import express from "express";

const destination_order_router = express.Router();

destination_order_router.post("/create-destination-order", createDestinationOrder);
destination_order_router.get("/get-all-destination-order", getDestinationOrders);
destination_order_router.get("/get-destination-order/:id", getDestinationOrder);
destination_order_router.get("/get-destination-order-by-user-email/:useremail", getDestinationOrderByUserEmail);
destination_order_router.get("/get-destination-order-by-seller-email/:selleremail", getDestinationOrderBySellerEmail);
destination_order_router.delete("/delete-destination-order/:id", deleteDestinationOrder);

export default destination_order_router;