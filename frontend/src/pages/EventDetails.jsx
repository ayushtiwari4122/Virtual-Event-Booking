
import React from 'react'

const EventDetails = () => {
  const handlePayment = async () => {
    try {
      const response = await fetch("https://your-backend-url/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const order = await response.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Virtual Event Booking",
        order_id: order.id,
        handler: function (response) {
          alert("Payment Successful!");
          console.log(response);
        },
        theme: { color: "#3399cc" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error(error);
      alert("Payment Failed");
    }
  };

  return (
    <div>
      <h1>Event Details Page</h1>
      <button onClick={handlePayment}>Book Now</button>
    </div>
  )
}

export default EventDetails;
