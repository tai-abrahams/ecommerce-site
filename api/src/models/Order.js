const mongoose = require('mongoose');
const { Schema } = mongoose;

const Product = require("./Product");

const OrderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type:Number,
                required: true
            },
            productPriceOnPurchase: {
                type: Number,
                required: true
            },
        }
    ],
    address: {
        type: Object,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    
    //TRY AND MAKE A CALCULAATION OF THE QUANTITY MULTIPLIED BY PRICE FOR EACH UNIQUE ITEMS
    status: {
        type:String,
        default: "Pending"
    }, 
}, {timestamps: true},
    { 
        toJson: {virtuals:true},
        toObject: {virtuals:true}
}
);

OrderSchema.virtual('id').get( function(){
    return this._id.toHexString()
})

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;