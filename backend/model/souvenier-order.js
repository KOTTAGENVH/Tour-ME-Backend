import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const souvenierorderSchema = new Schema({

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
    souvenierid: {
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
    state: {
        type: String,
        required: true,
        default: 'Complete'
    },
    TotalQuantity: {
        type: String,
        default: 0
    },
    total: {
        type: String,
        default: 0
    },
    date: {
        type: String,
        default: new Date().toISOString().split('T')[0]
    },

});

const SouvenierOrder = mongoose.model("SouvenierOrder", souvenierorderSchema);

export default SouvenierOrder;
