import { addDestination, getAllDestinations, getDestinationById, updateDestination, deleteDestination, updateRating, getDestinationByUserEmail } from "../controller/destination-controller.js";
import express from "express";

const destination_router = express.Router();

destination_router.post("/add-destination", addDestination);
destination_router.get("/get-all-destinations", getAllDestinations);
destination_router.get("/get-destination-by-id/:id", getDestinationById);
destination_router.patch("/update-destination/:id", updateDestination);
destination_router.delete("/delete-destination/:id", deleteDestination);
destination_router.patch("/update-rating/:id", updateRating);
destination_router.get("/get-destination-by-useremail/:useremail", getDestinationByUserEmail);

export default destination_router;