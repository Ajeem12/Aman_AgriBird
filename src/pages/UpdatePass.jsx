import React, { useState, useEffect } from "react";
import useUpdatePass from "../hooks/useUpdatePass";
import toast from "react-hot-toast";

const UpdatePass = () => {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const { updatePassword, loading, error, success } = useUpdatePass();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPass || !newPass || !confirmPass) {
      toast.error("All fields are required.");
      return;
    }

    if (newPass !== confirmPass) {
      toast.error("New passwords do not match.");
      return;
    }

    await updatePassword(currentPass, newPass, confirmPass);
  };

  useEffect(() => {
    if (success) {
      setCurrentPass("");
      setNewPass("");
      setConfirmPass("");
    }
  }, [success]);

  return (
    <div className="min-h-screen px-4 py-6 sm:py-0">
      <h1 className="text-2xl font-bold text-gray-800 mb-3">Change Password</h1>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-4 sm:px-6 sm:py-5">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="col-span-2 md:col-span-1">
            <label className="block text-gray-600 font-medium mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring border-gray-300 focus:ring-blue-300"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="block text-gray-600 font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring border-gray-300 focus:ring-blue-300"
            />
          </div>

          <div className="col-span-2  md:col-span-1">
            <label className="block text-gray-600 font-medium mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring border-gray-300 focus:ring-blue-300"
            />
          </div>

          {error && <p className="col-span-2 text-red-600 text-sm">{error}</p>}
          {success && (
            <p className="col-span-2 text-green-600 text-sm">
              Password updated successfully!
            </p>
          )}

          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePass;
