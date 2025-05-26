import React, { useState, useEffect } from "react";
import {
  useAddress,
  useAddAddress,
  useDeleteAddress,
  useUpdateAddress,
} from "../hooks/useAddress";
import Loader from "../components/Loader";

const Address = () => {
  const { data: addressData = [], isLoading, refetch } = useAddress();
  const addAddressMutation = useAddAddress();
  const deleteAddressMutation = useDeleteAddress();
  const updateAddressMutation = useUpdateAddress();

  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    phone: "",
    pincode: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (addressData?.data) {
      setAddresses(addressData.data);
    }
  }, [addressData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const validateInputs = () => {
    const { name, phone, pincode, address } = newAddress;
    if (!name || !phone || !pincode || !address)
      return "All fields are required.";
    if (!/^[0-9]{10}$/.test(phone)) return "Phone number must be 10 digits.";
    if (!/^[0-9]{6}$/.test(pincode)) return "Pincode must be 6 digits.";
    return "";
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) return setError(validationError);

    setError("");

    // Prepare payload before passing to the mutation
    const payload = {
      name: newAddress.name,
      address: newAddress.address,
      phone: newAddress.phone,
      pincode: newAddress.pincode,
    };

    // For editing
    if (isEditing) {
      await updateAddressMutation.mutateAsync({ id: editId, payload });
      setIsEditing(false);
      setEditId(null);
    } else {
      await addAddressMutation.mutateAsync(payload);
    }

    setNewAddress({ name: "", address: "", phone: "", pincode: "" });
    refetch();
  };

  const handleEditAddress = (id) => {
    const addressToEdit = addressData.find((a) => a.id === id);
    if (addressToEdit) {
      setNewAddress(addressToEdit);
      setIsEditing(true);
      setEditId(id);
    }
  };

  const handleDeleteAddress = async (id) => {
    await deleteAddressMutation.mutateAsync(id);
    refetch();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setNewAddress({ name: "", address: "", phone: "", pincode: "" });
    setError("");
  };

  if (isLoading)
    return (
      <div className="text-center text-gray-600 flex flex-col items-center">
        <Loader />
        <p className="mt-2 text-lg font-medium">
          Loading Address
          <span className="dots" />
        </p>
      </div>
    );

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 ml-3 mt-4 sm:mt-0">
        My Addresses
      </h1>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {addressData.map((address) => (
            <div
              key={address.id}
              className="bg-white p-5 rounded-lg shadow-md border border-gray-200 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
            >
              <div>
                <p className="text-base font-medium text-gray-800 mb-1">
                  {address.name}
                </p>
                <p className="text-sm text-gray-600 mb-1">{address.phone}</p>
                <p className="text-sm text-gray-600 mb-1">{address.pincode}</p>
                <p className="text-sm text-gray-700 mt-2">{address.address}</p>
              </div>

              <div className="flex gap-3  sm:items-end">
                <button
                  onClick={() => handleEditAddress(address.id)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleAddAddress}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {isEditing ? "Edit Address" : "Add New Address"}
          </h2>

          {error && (
            <p className="text-red-600 mb-4 text-sm font-medium">{error}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={newAddress.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              name="phone"
              value={newAddress.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              name="pincode"
              value={newAddress.pincode}
              onChange={handleInputChange}
              placeholder="Pincode"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <textarea
              name="address"
              value={newAddress.address}
              onChange={handleInputChange}
              placeholder="Address"
              rows={3}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 md:col-span-2"
            />
          </div>

          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {isEditing ? "Update Address" : "Add Address"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="w-full md:w-auto px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Address;
