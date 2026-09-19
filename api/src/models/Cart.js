const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    products: [ //items
        {

            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
            },

        },
        
    ],
}, { timestamps: true } 
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;