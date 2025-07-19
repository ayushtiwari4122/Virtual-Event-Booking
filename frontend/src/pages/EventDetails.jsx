const handlePayment = async () => {
  const res = await fetch("http://localhost:5000/api/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });
  const data = await res.json();

  const options = {
    key: "rzp_test_yourid", // or use env
    amount: data.amount,
    currency: data.currency,
    order_id: data.id,
    handler: (response) => {
      alert("Payment successful!");
      console.log(response);
    },
    theme: { color: "#3399cc" }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
