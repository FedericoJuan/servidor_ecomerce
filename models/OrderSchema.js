const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', require: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    quantity: {type: Number, default: 1},
    subTotal: {type: Number},
    createdAt: {type: Date, default: new Date()},
})

const Order = mongoose.model("Order",orderSchema);

module.exports = Order;
