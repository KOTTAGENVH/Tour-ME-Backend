import {
  createSouvenierOrder,
  deleteSouvenierOrder,
  getAllSouvenierOrders,
  updateSouvenierOrder,
  getSouvenierOrder,
  getSouvenierOrdersBySellerEmail,
  getSouvenierOrdersByUserEmail,
} from "../controller/souvenier-order-controller.js";
import express from "express";

const souvenier_order_router = express.Router();

souvenier_order_router.post("/create-souvenier-order", createSouvenierOrder);
souvenier_order_router.get("/get-all-souvenier-orders", getAllSouvenierOrders);
souvenier_order_router.get(
  "/get-single-souvenier-order/:id",
  getSouvenierOrder
);
souvenier_order_router.patch(
  "/update-souvenier-order/:id",
  updateSouvenierOrder
);
souvenier_order_router.delete(
  "/delete-souvenier-order/:id",
  deleteSouvenierOrder
);
souvenier_order_router.get(
  "/get-souvenier-order-by-useremail/:useremail",
  getSouvenierOrdersByUserEmail
);
souvenier_order_router.get(
  "/get-souvenier-order-by-selleremail/:selleremail",
  getSouvenierOrdersBySellerEmail
);

export default souvenier_order_router;
