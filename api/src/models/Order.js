const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    products: [
        {
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1,
            },
            price: {
                type: Number,
                requied: true,
            }
        },
    ],
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type:String,
        default: "Pending"
    }, 
}, {timestamps: true} 
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;