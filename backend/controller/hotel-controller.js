import { customEmail } from "../Nodemailer/customeEmail.js";
import Hotel from "../model/hotel-model.js";
import { makePayment } from "./payment.js";

// Add new hotel Room

export const addHotel = async (req, res) => {
  try {
    const {
      title,
      category,
      maindescription,
      description,
      image,
      image1,
      VirtualVideo,
      price,
      NoRooms,
      Address,
      Address1,
      rating,
      location,
      username,
      useremail,
      usertel,
    } = req.body;
    const hotel = new Hotel({
      title,
      category,
      maindescription,
      description,
      image,
      image1,
      VirtualVideo,
      price,
      NoRooms,
      Address,
      Address1,
      rating,
      location,
      username,
      useremail,
      usertel,
    });

    const emailstatus = customEmail(
      useremail,
      "Hotel Posted",
      "Your Hotel with " + title + " has been added successfully"
    );

    if (emailstatus.error) {
      return res
        .status(400)
        .json({ error: emailstatus.error, message: "Email failed" });
    }

    const paymentstatus = makePayment(20 * 100);

    if (paymentstatus.error) {
      return res
        .status(400)
        .json({ error: paymentstatus.error, message: "Payment failed" });
    }

    await hotel.save();
    res.status(200).json({ message: "Hotel added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get all hotels
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get a single hotel
export const getSingleHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update a hotel
export const updateHotel = async (req, res) => {
  try {
    const {
      title,
      category,
      maindescription,
      description,
      image,
      image1,
      VirtualVideo,
      price,
      NoRooms,
      Address,
      Address1,
      rating,
      location,
      username,
      useremail,
      usertel,
    } = req.body;
    const hotel = await Hotel.findById(req.params.id);

    if (hotel) {
      hotel.title = title;
      hotel.category = category;
      hotel.maindescription = maindescription;
      hotel.description = description;
      hotel.image = image;
      hotel.image1 = image1;
      hotel.VirtualVideo = VirtualVideo;
      hotel.price = price;
      hotel.NoRooms = NoRooms;
      hotel.Address = Address;
      hotel.Address1 = Address1;
      hotel.rating = rating;
      hotel.location = location;
      hotel.username = username;
      hotel.useremail = useremail;
      hotel.usertel = usertel;

      const updatedHotel = await hotel.save();
      res
        .status(200)
        .json({ message: "Hotel update successfully" }, updatedHotel);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete a hotel
export const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get hotels by category
export const getHotelsByCategory = async (req, res) => {
  try {
    const hotels = await Hotel.find({ category: req.params.category });
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get hotels by location
export const getHotelsByLocation = async (req, res) => {
  try {
    const hotels = await Hotel.find({ location: req.params.location });
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get hotels by rating
export const getHotelsByRating = async (req, res) => {
  try {
    const hotels = await Hotel.find({ rating: req.params.rating });
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get hotels by useremail
export const getHotelsByUseremail = async (req, res) => {
  try {
    const hotels = await Hotel.find({ useremail: req.params.useremail });
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update hotel rating
export const updateHotelRating = async (req, res) => {
  try {
    const { rating } = req.body;

    const hotel = await Hotel.findById(req.params.id);

    if (hotel) {
      hotel.rating = rating;

      const updatedHotel = await hotel.save();
      res.json(updatedHotel);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update hotel quantity
export const updateHotelQuantity = async (id, TotalRooms) => {
  try {
    const hotel = await Hotel.findById(id);

    if (hotel) {
      hotel.NoRooms -= TotalRooms;

      const updatedHotel = await hotel.save();
      return updatedHotel;
    }
  } catch (error) {
    return { error: error.message };
  }
};

//Get All Categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Hotel.find().distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
