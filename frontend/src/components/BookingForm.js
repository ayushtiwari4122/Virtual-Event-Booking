import React from "react";
import axios from "axios";

const BookingForm = () => {
  const handlePayment = async () => {
    try {
      const data = {
        amount: 500, // ₹500 in paise (you may need 50000 depending on your backend)
        currency: "INR",
        receipt: "receipt#1",
      };

      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/create-order`,
        data
      );

      const orderData = res.data;

      const options = {
        key: "RAZORPAY_KEY_ID", // ✅ replace this with your actual Razorpay key ID
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.id,
        handler: function (response) {
          alert("Payment successful!");
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