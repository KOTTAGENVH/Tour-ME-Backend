import { addHotel, getAllCategories, getAllHotels, getHotelsByCategory, getHotelsByLocation, getHotelsByRating, getHotelsByUseremail, getSingleHotel, updateHotel, updateHotelRating, deleteHotel } from "../controller/hotel-controller.js";
import express from "express";

const hotel_router = express.Router();

hotel_router.post("/add-hotel", addHotel);
hotel_router.get("/get-all-hotels", getAllHotels);
hotel_router.get("/get-single-hotel/:id", getSingleHotel);
hotel_router.patch("/update-hotel/:id", updateHotel);
hotel_router.delete("/delete-hotel/:id", deleteHotel);
hotel_router.get("/get-hotels-by-category/:category", getHotelsByCategory);
hotel_router.get("/get-hotels-by-location/:location", getHotelsByLocation);
hotel_router.get("/get-hotels-by-rating/:rating", getHotelsByRating);
hotel_router.get("/get-hotels-by-useremail/:useremail", getHotelsByUseremail);
hotel_router.patch("/update-hotel-rating/:id", updateHotelRating);
hotel_router.get("/get-all-categories", getAllCategories);

export default hotel_router;