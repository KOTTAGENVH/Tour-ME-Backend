import { customEmail } from "../Nodemailer/customeEmail.js";
import Souvenier from "../model/souvenier-model.js";
import { makePayment } from "./payment.js";

//Create Souvenier
export const createSouvenier = async (req, res) => {
  try {
    const {
      title,
      maindescription,
      description,
      image,
      image1,
      threedimage,
      video,
      price,
      Quatity,
      Address,
      Address1,
      rating,
      username,
      useremail,
      usertel,
    } = req.body;

    const souvenier = new Souvenier({
      title,
      maindescription,
      description,
      image,
      image1,
      threedimage,
      video,
      price,
      Quatity,
      Address,
      Address1,
      rating,
      username,
      useremail,
      usertel,
    });

    const emailstatus = await customEmail(
      useremail,
      "Souvenier Added",
      "Your Souvenier with " + title + " has been added successfully"
    );

    if (emailstatus.error) {
      return res
        .status(400)
        .json({ error: emailstatus.error, message: "Email failed" });
    }

    const paymentstatus = await makePayment(20 * 100);

    if (paymentstatus.error) {
      return res
        .status(400)
        .json({ error: paymentstatus.error, message: "Payment failed" });
    }

    const createdSouvenier = await souvenier.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get all souveniers
export const getAllSouveniers = async (req, res) => {
  try {
    const souveniers = await Souvenier.find();
    res.status(200).json(souveniers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get a single souvenier
export const getSingleSouvenier = async (req, res) => {
  try {
    const souvenier = await Souvenier.findById(req.params.id);
    res.status(200).json(souvenier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update souvenier
export const updateSouvenier = async (req, res) => {
  try {
    const {
      title,
      maindescription,
      description,
      image,
      image1,
      threedimage,
      video,
      price,
      Quatity,
      Address,
      Address1,
      rating,
      username,
      useremail,
      usertel,
    } = req.body;

    const souvenier = await Souvenier.findById(req.params.id);

    if (souvenier) {
      souvenier.title = title;
      souvenier.maindescription = maindescription;
      souvenier.description = description;
      souvenier.image = image;
      souvenier.image1 = image1;
      souvenier.threedimage = threedimage;
      souvenier.video = video;
      souvenier.price = price;
      souvenier.Quatity = Quatity;
      souvenier.Address = Address;
      souvenier.Address1 = Address1;
      souvenier.rating = rating;
      souvenier.username = username;
      souvenier.useremail = useremail;
      souvenier.usertel = usertel;

      const updatedSouvenier = await souvenier.save();
      res.status(200).json(updatedSouvenier);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete souvenier
export const deleteSouvenier = async (req, res) => {
  try {
    Souvenier.findByIdAndDelete(req.params.id)
      .then(() => res.json("Souvenier deleted."))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Souvenier by seller email
export const getSouvenierBySellerEmail = async (req, res) => {
  try {
    const souvenier = await Souvenier.find({
      useremail: req.params.selleremail,
    });
    res.status(200).json(souvenier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update Rating
export const updateRating = async (req, res) => {
  try {
    const { rating } = req.body;

    const souvenier = await Souvenier.findById(req.params.id);

    if (souvenier) {
      souvenier.rating = rating;

      const updatedSouvenier = await souvenier.save();
      res.status(200).json(updatedSouvenier);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Quantity
export const updateQuantity = async (id, quantity) => {
  try {
    const souvenir = await Souvenier.findById(id);

    if (souvenir) {
      souvenir.Quatity -= quantity;

      const updatedSouvenir = await souvenir.save();

      return updatedSouvenir;
    } else {
      throw new Error("Souvenir not found");
    }
  } catch (error) {
    return { error: error.message };
  }
};
