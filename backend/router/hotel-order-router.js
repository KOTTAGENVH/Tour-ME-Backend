
import express from 'express';
import { createHotelOrder, getAllHotelOrders, getHotelOrderByHotelId,getHotelOrderById,getHotelOrderBySellerEmail,getHotelOrderByUserId,cancelHotelOrder,deleteHotelOrder } from '../controller/hotel-order-controller.js';

const hotel_order_router = express.Router();

hotel_order_router.post('/order-hotel-room', createHotelOrder);
hotel_order_router.get('/get-all-hotel-orders', getAllHotelOrders);
hotel_order_router.get('/get-hotel-order-by-id/:id', getHotelOrderById);
hotel_order_router.get('/get-hotel-order-by-userid/:userid', getHotelOrderByUserId);
hotel_order_router.get('/get-hotel-order-by-selleremail/:selleremail', getHotelOrderBySellerEmail);
hotel_order_router.get('/get-hotel-order-by-hotelid/:hotelid', getHotelOrderByHotelId);
hotel_order_router.put('/cancel-hotel-order/:id', cancelHotelOrder);
hotel_order_router.delete('/delete-hotel-order/:id', deleteHotelOrder);

export default hotel_order_router;

