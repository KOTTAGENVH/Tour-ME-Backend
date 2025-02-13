import SouvenierOrder from "../model/souvenier-order.js";
import { customEmail } from "../Nodemailer/customeEmail.js";
import { makePayment } from "./payment.js";
import { updateQuantity } from "./souvenier-controller.js";

//Auto generate invoice number
const generateUniqueInvoiceNumber = async () => {
    let isUnique = false;
    let invoiceNumber;

    // Keep generating until a unique invoice number is found
    while (!isUnique) {
        // Generate a random 4-digit number
        invoiceNumber = Math.floor(1000 + Math.random() * 9000);

        // Check if the generated number already exists in the database
        const existingOrder = await SouvenierOrder.findOne({ InvoiceNumber: invoiceNumber });

        // If no order with the generated invoice number is found, it's unique
        isUnique = !existingOrder;
    }

    return invoiceNumber;
};

// Create Souvenier Order

export const createSouvenierOrder = async (req, res) => {
    try {
        const {
            userid,
            selleremail,
            souvenierid,
            useremail,
            productname,
            state,
            total,
            date,
        } = req.body;

        // Generate a unique 4-digit invoice number
        const invoiceNumber = await generateUniqueInvoiceNumber();
        const souvenierorder = new SouvenierOrder({
            InvoiceNo: invoiceNumber,
            userid: userid,
            selleremail: selleremail,
            souvenierid: souvenierid,
            useremail: useremail,
            productname: productname,
            state: state,
            total: total,
            date: date,
        });

        const emailStatus = await customEmail(useremail, "Souvenier Order Placed", "Your Souvenier Order with " + productname + " has been placed successfully");

        if (emailStatus.error) {
            return res.status(400).json({ error: emailStatus.error, message: "Email failed" });
        }

        const paymentStatus = await makePayment(total * 100);

        if (paymentStatus.error) {
            return res.status(400).json({ error: paymentStatus.error, message: "Payment failed" });
        }

        const updateNoOfSouveniers = await updateQuantity(souvenierid, total);

        if (!updateNoOfSouveniers) {
            throw new Error("No of souveniers update failed!");
        }

        const createdSouvenierOrder = await souvenierorder.save();

        res.status(201).json(createdSouvenierOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Souvenier Orders
export const getAllSouvenierOrders = async (req, res) => {
    try {
        const souvenierorders = await SouvenierOrder.find();
        res.status(200).json(souvenierorders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Get Souvenier Orders by user email
export const getSouvenierOrdersByUserEmail = async (req, res) => {
    try {
        const { useremail } = req.params;
        const souvenierorders = await SouvenierOrder.find({ useremail: useremail });
        res.status(200).json(souvenierorders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get Souvenier Orders by seller email
export const getSouvenierOrdersBySellerEmail = async (req, res) => {
    try {
        const { selleremail } = req.params;
        const souvenierorders = await SouvenierOrder.find({ selleremail: selleremail });
        res.status(200).json(souvenierorders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get Souvenier Order by ID
export const getSouvenierOrder = async (req, res) => {
    try {
        const souvenierorder = await SouvenierOrder.findById(req.params.id);
        res.status(200).json(souvenierorder);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Update Souvenier Order
export const updateSouvenierOrder = async (req, res) => {
    try {
        const { state } = req.body;

        const souvenierorder = await SouvenierOrder.findById(req.params.id);

        if (souvenierorder) {
            souvenierorder.state = state;

            const updatedSouvenierOrder = await souvenierorder.save();
            res.status(200).json(updatedSouvenierOrder);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Souvenier Order
export const deleteSouvenierOrder = async (req, res) => {
    try {
        await SouvenierOrder.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Souvenier Order deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//Update Souvenier Quantity
export const updateSouvenierQuantity = async (req, res) => {
    try {
        const { quantity } = req.body;

        const souvenierorder = await SouvenierOrder.findById(req.params.id);

        if (souvenierorder) {
            souvenierorder.quantity = quantity;

            const updatedSouvenierOrder = await souvenierorder.save();
            res.status(200).json(updatedSouvenierOrder);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Update Souvenier Rating
export const updateSouvenierRating = async (req, res) => {
    try {
        const { rating } = req.body;

        const souvenierorder = await SouvenierOrder.findById(req.params.id);

        if (souvenierorder) {
            souvenierorder.rating = rating;

            const updatedSouvenierOrder = await souvenierorder.save();
            res.status(200).json(updatedSouvenierOrder);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

