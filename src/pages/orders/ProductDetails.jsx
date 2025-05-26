import { CheckCircle, Cancel, AccessTime, Chat } from "@mui/icons-material";

const OrderDetails = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 space-y-6">
        {/* Product Info */}
        <div className="flex flex-col md:flex-row items-start gap-4">
          <img
            src="https://img.freepik.com/free-photo/close-up-hands-shaping-clay-pottery-wheel_23-2148164393.jpg"
            alt="Handcrafted clay pottery made with precision."
            className="w-32 h-32 object-cover rounded-md"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800">
              Handcrafted clay pottery made with precision.
            </h2>
            <p className="text-sm text-gray-500">From: Happy Farms</p>
            <p className="text-sm text-gray-500">
              Delivered to: Ravi Nagar, Bhilai
            </p>
            <p className="text-lg font-bold text-gray-600 mt-2">
              ₹299
              <span className="text-sm font-normal text-gray-500 ml-1">
                1 offer
              </span>
            </p>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="relative pl-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-500 relative z-10" />
              <span className="text-sm text-gray-700">
                Order Confirmed, April 17, 2025
              </span>
            </div>
            <div className="absolute left-[43px] top-[-3px] h-8 w-0.5 bg-green-500" />
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-500 relative z-10" />
              <span className="text-sm text-gray-700">
                Shipped, April 18, 2025
              </span>
            </div>
            <div className="absolute left-[43px] top-11 h-8 w-0.5 bg-green-500" />
            <div className="flex items-center space-x-2">
              <AccessTime className="text-yellow-500 relative z-10" />
              <span className="text-sm text-gray-700">
                Out for Delivery, April 18, 2025, 9:45 AM
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <button className="flex-1 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition font-semibold shadow flex justify-center items-center">
            Cancel Order
            <Cancel className="ml-2" />
          </button>
          <button className="flex-1 py-3 border border-zinc-600 text-zinc-600 rounded-md hover:bg-stone-100 transition font-semibold shadow">
            Track Order
          </button>
        </div>

        {/* Rating & Chat */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t pt-4">
          <div className="flex space-x-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <button className="mt-3 md:mt-0 flex items-center text-sm text-blue-600 hover:underline">
            <Chat className="mr-1 text-base" /> Chat with us
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
