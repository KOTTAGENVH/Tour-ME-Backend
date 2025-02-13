import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const souvenierSchema = new Schema({

  title: {
    type: String,
    required: true,
  },

  maindescription: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
  image1: {
    type: String,
    required: true,
  },

  threedimage: {
    type: String,
    required: true,
  },

  video: {
    type: String,
    required: true,
  },

  price: {
    type: String,
    required: true,
  },

  Quatity: {
    type: String,
    required: true,
  },

  Address: {
    type: String,
    required: true,
  },

  Address1: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: false,
    default: "0"
  },

  username: {
    type: String,
    required: true,
  },
  useremail: {
    type: String,
    required: true,
  },
  usertel: {
    type: String,
    required: true,
  },


});

const Souvenier = mongoose.model("Souvenier", souvenierSchema);

export default Souvenier;
