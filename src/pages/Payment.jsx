import React from "react";

const Payment = () => {
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-[rgba(0,0,0,0.05)_0px_4px_12px] mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Payment Details
      </h2>

      <form className="space-y-5">
        {/* Cardholder Name */}
        <div>
          <label className="block mb-1 text-sm text-gray-600">
            Cardholder Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
        </div>

        {/* Card Number */}
        <div>
          <label className="block mb-1 text-sm text-gray-600">
            Card Number
          </label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
        </div>

        {/* Expiry & CVV */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block mb-1 text-sm text-gray-600">Expiry</label>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1 text-sm text-gray-600">CVV</label>
            <input
              type="password"
              placeholder="•••"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>
        </div>

        {/* Save Card Option */}
        <div className="flex items-center">
          <input type="checkbox" id="saveCard" className="mr-2" />
          <label htmlFor="saveCard" className="text-sm text-gray-600">
            Save this card for future purchases
          </label>
        </div>

        {/* Pay Button */}
        <button
          type="submit"
          className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition duration-200"
        >
          Pay ₹1,299.00
        </button>
      </form>
    </div>
  );
};

export default Payment;
