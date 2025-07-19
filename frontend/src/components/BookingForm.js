import React from "react";
import axios from "axios";

const BookingForm = () => {
const handlePayment = async () => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/create-order`, {
      amount: 500 // amount in rupees
    });

    const orderData = res.data;

    const options = {
      key: "rzp_test_nwuI3Hp4ayPpHi", // 🔁 Replace with your Razorpay key
      amount: orderData.amount,
      currency: orderData.currency,
      order_id: orderData.id,
      handler: function (response) {
        alert("Payment successful!");
        console.log("Payment Response:", response);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    alert("Something went wrong!");
  }
};


  return (
    <div>
      <h2>Book Your Event</h2>
      <button onClick={handlePayment}>Pay ₹500</button>
    </div>
  );
};

export default BookingForm;