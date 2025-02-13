import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const hotelorderSchema = new Schema({

  InvoiceNo: {
    type: String,
    required: true,
    unique: true,
  },
  
  userid: {
    type: String,
    required: true,
  },
  selleremail: {
    type: String,
    required: true,
  },
  hotelid: {
    type: String,
    required: true,
  },
  useremail: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Complete'
  },
  TotalRooms: {
    type: String,
    default: 0
  },
  total: {
    type: String,
    default: 0
  },
  datebook: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: new Date().toISOString().split('T')[0]
  },

});

const HotelOrder = mongoose.model("HotelOrder", hotelorderSchema);

export default HotelOrder;
