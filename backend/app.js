const express = require("express");
const mongoose = require("mongoose");
const Razorpay = require("razorpay"); // ✅ Correct spelling
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Setup CORS once
app.use(cors({
  origin: "https://[your-codespace-frontend-url].github.dev", // replace with real URL
  credentials: true
}));

app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ✅ Routes
app.use("/api", require("./routes/bookingRoutes"));
app.use("/api", require("./routes/paymentRoutes"));

// ✅ Razorpay setup
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Create Razorpay Order
app.post("/api/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: "receipt_order_74394",
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).send("Order creation failed");
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
