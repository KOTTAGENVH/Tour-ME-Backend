import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['customer', 'admin', 'souvnier', 'hotel', 'destination'],
        default: 'customer'
    },

    approved: {
        type: Boolean,
        default: false
    },  
    secretcode: {
        type: String,
        default: ''
    },
    block : {
        type: Boolean,
        default: false
    },
});

    const User = mongoose.model('user', UserSchema);
    export default User;