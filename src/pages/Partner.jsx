import React, { useState } from "react";
import { useBecomeSeller } from "../hooks/usePartner";
import { useNavigate } from "react-router-dom";

const Partner = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    contact_no: "",
    address: "",
    aadhaar_no: "",
    email: "",
  });

  const { mutate, isLoading } = useBecomeSeller();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(formData, {
      onSuccess: () => {
        alert("Submitted successfully!");
        setFormData({
          full_name: "",
          contact_no: "",
          address: "",
          aadhaar_no: "",
          email: "",
        });
        navigate("/");
      },
      onError: (err) => {
        alert("Failed to submit.");
        console.error(err);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Become a Partner
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          <InputField
            label="Contact Number"
            name="contact_no"
            value={formData.contact_no}
            onChange={handleChange}
            placeholder="Enter contact number"
          />
          <InputField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
          />
          <InputField
            label="Aadhaar Number"
            name="aadhaar_no"
            value={formData.aadhaar_no}
            onChange={handleChange}
            placeholder="Enter Aadhaar number"
          />
          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Enter email address"
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
      placeholder={placeholder}
      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
    />
  </div>
);

export default Partner;
