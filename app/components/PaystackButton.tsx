"use client";

import { useState } from "react";

type Props = {
  amount: number;
  productName: string;
};

export default function PaystackButton({ amount, productName }: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showForm, setShowForm] = useState(false);

  function handlePayment() {
    if (!email || !name) return;

    const handler = (window as any).PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
      email,
      amount: amount * 100,
      currency: "NGN",
      metadata: {
        custom_fields: [
          { display_name: "Product", variable_name: "product", value: productName },
          { display_name: "Customer Name", variable_name: "name", value: name },
        ],
      },
      callback: function (response: any) {
        alert(`Payment successful! Reference: ${response.reference}`);
        setShowForm(false);
        setEmail("");
        setName("");
      },
      onClose: function () {
        alert("Payment cancelled.");
      },
    });

    handler.openIframe();
  }

  return (
    <div className="flex flex-col gap-3">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="px-8 py-4 text-sm font-medium text-white text-center rounded-full transition-all"
          style={{ background: "#c4846a" }}>
          Buy Now — Pay with Paystack
        </button>
      ) : (
        <div className="flex flex-col gap-3 p-5 rounded-2xl" style={{ background: "#f9e8e0" }}>
          <p className="text-sm font-medium" style={{ color: "#2c1810" }}>Enter your details to pay</p>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 rounded-xl text-sm focus:outline-none"
            style={{ background: "#fff", border: "1px solid #f0e0d6", color: "#2c1810" }}
          />
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-xl text-sm focus:outline-none"
            style={{ background: "#fff", border: "1px solid #f0e0d6", color: "#2c1810" }}
          />
          <button
            onClick={handlePayment}
            className="px-8 py-3 text-sm font-medium text-white rounded-full transition-all"
            style={{ background: "#c4846a" }}>
            Proceed to Pay ₦{amount.toLocaleString()}
          </button>
          <button
            onClick={() => setShowForm(false)}
            className="text-sm text-center"
            style={{ color: "#9e7060" }}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}