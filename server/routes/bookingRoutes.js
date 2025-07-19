const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();
const Booking = require("../models/Booking");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt#1"
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).send("Order error");
  }
});

router.post("/confirm-booking", async (req, res) => {
  const { name, email, quantity, razorpay_payment_id } = req.body;

  try {
    const booking = new Booking({
      name,
      email,
      quantity,
      razorpay_payment_id,
      paymentStatus: "Paid"
    });

    await booking.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).send("Booking error");
  }
});

module.exports = router;
