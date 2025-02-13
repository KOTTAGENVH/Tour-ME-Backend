import { customEmail } from "../Nodemailer/customeEmail.js";
import Destination from "../model/destination-model.js";
import { makePayment } from "./payment.js";
//Add Desination
export const addDestination = async (req, res) => {
    try {
        const {
            title,
            maindescription,
            description,
            image,
            image1,
            price,
            NoTickets,
            Address,
            Address1,
            rating,
            location,
            username,
            useremail,
            usertel,
        } = req.body;

        const destination = new Destination({
            title,
            maindescription,
            description,
            image,
            image1,
            price,
            NoTickets,
            Address,
            Address1,
            rating,
            location,
            username,
            useremail,
            usertel,
        });

        const emailstatus = await customEmail(useremail, "Destination Posted", "Your Destination with " + title + " has been added successfully");
        
        if (emailstatus.error) {
            return res.status(400).json({ error: emailstatus.error, message: "Email failed" });
        }

        const paymentstatus = await makePayment(20 * 100);

        if (paymentstatus.error) {
            return res.status(400).json({ error: paymentstatus.error, message: "Payment failed" });
        }

        await destination.save();
        res.status(200).json({ message: "Destination added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get all destinations  
export const getAllDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.status(200).json(destinations);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//Get destination by id
export const getDestinationById = async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        res.status(200).json(destination);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//Update destination
export const updateDestination = async (req, res) => {
    try {
        const {
            title,
            maindescription,
            description,
            image,
            image1,
            price,
            NoTickets,
            Address,
            Address1,
            rating,
            location,
            username,
            useremail,
            usertel,
        } = req.body;

        const destination = await Destination.findById(req.params.id);

        if (destination) {
            destination.title = title;
            destination.maindescription = maindescription;
            destination.description = description;
            destination.image = image;
            destination.image1 = image1;
            destination.price = price;
            destination.NoTickets = NoTickets;
            destination.Address = Address;
            destination.Address1 = Address1;
            destination.rating = rating;
            destination.location = location;
            destination.username = username;
            destination.useremail = useremail;
            destination.usertel = usertel;

            const updatedDestination = await destination.save();
            res.json(updatedDestination);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//Delete destination
export const deleteDestination = async (req, res) => {
    try {
      Destination.findByIdAndDelete(req.params.id)
            .then(() => res.json('Destination deleted.'))
            .catch(err => res.status(400).json('Error: ' + err));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//Update Rating
export const updateRating = async (req, res) => {
    try {
        const {
            rating,
        } = req.body;

        const destination = await Destination.findById(req.params.id);

        if (destination) {
            destination.rating = rating;

            const updatedDestination = await destination.save();
            res.json(updatedDestination);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//Get Destination By User Email
export const getDestinationByUserEmail = async (req, res) => {
    try {
        const destinations = await Destination.find({ useremail: req.params.useremail });
        res.status(200).json({ destinations });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update destination tickets
export const updateDestinationTickets = async (destinationid, noOfTickets) => {
    try{
        const destination = await Destination.findById(destinationid);
        if(destination){
            destination.NoTickets -= noOfTickets;
            const updatedDestination = await destination.save();
            return(updatedDestination);
        }
    }
    catch(error){
        console.log("An errror occured " + error.message)
    }
    }
