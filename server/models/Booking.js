const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  quantity: Number,
  razorpay_payment_id: String,
  paymentStatus: String
});

module.exports = mongoose.model("Booking", bookingSchema);
