import { customEmail } from "../Nodemailer/customeEmail.js";
import HotelOrder from "../model/hotel-order-model.js";
import { updateHotelQuantity } from "./hotel-controller.js";
import { makePayment } from "./payment.js";

//Auto generate invoice number
const generateUniqueInvoiceNumber = async () => {
    let isUnique = false;
    let invoiceNumber;
  
    // Keep generating until a unique invoice number is found
    while (!isUnique) {
      // Generate a random 4-digit number
      invoiceNumber = Math.floor(1000 + Math.random() * 9000);
  
      // Check if the generated number already exists in the database
      const existingOrder = await HotelOrder.findOne({ InvoiceNumber: invoiceNumber });
  
      // If no order with the generated invoice number is found, it's unique
      isUnique = !existingOrder;
    }
  
    return invoiceNumber;
  };

//Create hotel order
export const createHotelOrder = async (req, res) => {
    try {
        const {
            userid,
            selleremail,
            hotelid,
            useremail,
            status,
            TotalRooms,
            total,
            datebook,
            date,
        } = req.body;

        console.log(req.body);

        const InvoiceNo = await generateUniqueInvoiceNumber();

        const hotelOrder = new HotelOrder({
            InvoiceNo: InvoiceNo,
            userid,
            selleremail,
            hotelid,
            useremail,
            status,
            TotalRooms,
            total,
            datebook,
            date,
        });

      const emailStatus = await customEmail(useremail, "Hotel Order", "Thank you for booking with TourMe.lk " + InvoiceNo);
      
        if (!emailStatus) {
            return res.status(400).json({
                message: "Email not sent",
            });
        }

        const paymentStatus = await makePayment(total*100);

        if (!paymentStatus) {
            return res.status(400).json({
                message: "Payment not done",
            });
        }

        const updateNoOfRooms = await updateHotelQuantity(hotelid, TotalRooms);

        if (!updateNoOfRooms) {
            throw new Error("No of rooms update failed!");
        }

        await hotelOrder.save();

        res.status(201).json({
            message: "Hotel order created successfully",
        });

    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Something went wrong" + error.message,
        });
    }
};

//Get all hotel orders
export const getAllHotelOrders = async (req, res) => {
    try {
        const hotelOrders = await HotelOrder.find();
        res.status(200).json(hotelOrders);
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

//Get hotel order by id
export const getHotelOrderById = async (req, res) => {
    try {
        const hotelOrder = await HotelOrder.findById(req.params.id);
        res.status(200).json(hotelOrder);
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

//Get hotel order by user id
export const getHotelOrderByUserId = async (req, res) => {
    try {
        const hotelOrder = await HotelOrder.find({ userid: req.params.userid });
        res.status(200).json(hotelOrder);
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

//Get hotel order by seller email
export const getHotelOrderBySellerEmail = async (req, res) => {
    try {
        const hotelOrder = await HotelOrder.find({ selleremail: req.params.selleremail });
        res.status(200).json(hotelOrder);
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

//Get hotel order by hotel id
export const getHotelOrderByHotelId = async (req, res) => {
    try {
        const hotelOrder = await HotelOrder.find({ hotelid: req.params.hotelid });
        res.status(200).json(hotelOrder);
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

//Cancel hotel order
export const cancelHotelOrder = async (req, res) => {
    try {
        const hotelOrder = await HotelOrder.findById(req.params.id);
        hotelOrder.status = "Canceled";
        await hotelOrder.save();
        res.status(200).json({
            message: "Hotel order canceled successfully",
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

//Delete hotel order
export const deleteHotelOrder = async (req, res) => {
    try {
        await HotelOrder.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Hotel order deleted successfully",
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};








