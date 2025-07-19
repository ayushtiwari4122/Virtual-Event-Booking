import React, { useState } from 'react';

const BookingForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    quantity: 1
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    // Create order on server
    const orderData = await fetch("http://localhost:5000/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: form.quantity * 100 })
    });

    const order = await orderData.json();

    const options = {
      key: "rzp_test_nwuI3Hp4ayPpHi", // Replace with your Razorpay Key ID
      amount: order.amount,
      currency: "INR",
      name: "Event Booking",
      description: "Ticket Booking",
      order_id: order.id,
      handler: async function (response) {
        await fetch("http://localhost:5000/api/confirm-booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            razorpay_payment_id: response.razorpay_payment_id,
          }),
        });
        alert("Payment successful and booking confirmed!");
      },
      prefill: {
        name: form.name,
        email: form.email,
      },
      theme: { color: "#3399cc" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Book Event Ticket</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        /><br />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br />
        <input
          type="number"
          name="quantity"
          placeholder="No. of Tickets"
          value={form.quantity}
          onChange={handleChange}
          min="1"
          required
        /><br />
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;
