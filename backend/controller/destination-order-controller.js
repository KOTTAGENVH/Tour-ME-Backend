import { customEmail } from "../Nodemailer/customeEmail.js";
import DestinationOrder from "../model/destination-order.js";
import { updateDestinationTickets } from "./destination-controller.js";
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
    const existingOrder = await DestinationOrder.findOne({ InvoiceNumber: invoiceNumber });

    // If no order with the generated invoice number is found, it's unique
    isUnique = !existingOrder;
  }

  return invoiceNumber;
};

// Create Destination Order
export const createDestinationOrder = async (req, res) => {
  try {
    const {
      userid,
      selleremail,
      destinationid,
      useremail,
      productname,
      status,
      Totaltickets,
      total,
      datebook,
      date,
    } = req.body;

    // Generate a unique 4-digit invoice number
    const invoiceNumber = await generateUniqueInvoiceNumber();
    const destinationorder = new DestinationOrder({
      InvoiceNo: invoiceNumber,
      userid,
      selleremail,
      destinationid,
      useremail,
      productname,
      status,
      Totaltickets,
      total,
      datebook,
      date,
    });

    const updateNoOfTickets = await updateDestinationTickets(destinationid, Totaltickets);

    if (!updateNoOfTickets) {
      throw new Error("No of tickets update failed!");
    }

    const emailStatus = customEmail(useremail, "Your Booking is Confirmed", "Thank you for booking with us. Your booking is confirmed." + "Your Invoice Number is " + invoiceNumber);

    if (!emailStatus) {
      throw new Error("Email sending failed!");
    }

    const paymentStatus = await makePayment(total * 100);
    
    if (!paymentStatus) {
      throw new Error("Payment failed!");
    }
    
    await destinationorder.save();
    res.status(201).json(destinationorder);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//Get All Destination Orders
export const getDestinationOrders = async (req, res) => {
  try {
    const destinationorders = await DestinationOrder.find();

    res.status(200).json(destinationorders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Get Destination Order By ID
export const getDestinationOrder = async (req, res) => {
  try {
    const destinationorder = await DestinationOrder.findById(req.params.id);

    res.status(200).json(destinationorder);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Get Destination Order By User Email
export const getDestinationOrderByUserEmail = async (req, res) => {
  try {
    const destinationorder = await DestinationOrder.find({
      useremail: req.params.useremail,
    });

    res.status(200).json(destinationorder);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Delete Destination Order
export const deleteDestinationOrder = async (req, res) => {
  try {
    await DestinationOrder.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Destination Order deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Get Destination Order By Seller Email
export const getDestinationOrderBySellerEmail = async (req, res) => {
  try {
    const destinationorder = await DestinationOrder.find({
      selleremail: req.params.selleremail,
    });

    res.status(200).json(destinationorder);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
