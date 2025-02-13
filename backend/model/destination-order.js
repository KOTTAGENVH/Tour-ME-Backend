import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const destinationorderSchema = new Schema({

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
  destinationid: {
    type: String,
    required: true,
  },
  useremail: {
    type: String,
    required: true,
  },
  productname: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Complete'
  },
  Totaltickets: {
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

const DestinationOrder = mongoose.model("DestinationOrder", destinationorderSchema);

export default DestinationOrder;
