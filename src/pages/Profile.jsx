import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useUpdateUserProfile } from "../hooks/useUpdateProfile";
import useGetProfile from "../hooks/useGetProfile";
import Loader from "../components/Loader";

const Profile = () => {
  const { setUser } = useAuthStore();
  const { profile, loading, error } = useGetProfile();

  const [formUser, setFormUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "", // Include mobile
  });

  const [isEditing, setIsEditing] = useState(false);
  const { mutate: updateProfile, isPending } = useUpdateUserProfile();

  useEffect(() => {
    if (profile) {
      setFormUser({
        firstName: profile.first_name || "",
        lastName: profile.last_name || "",
        email: profile.email || "",
        mobile: profile.mobile || "",
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProfile(
      {
        firstname: formUser.firstName,
        lastname: formUser.lastName,
        email: formUser.email,
      },
      {
        onSuccess: () => {
          setUser({
            first_name: formUser.firstName,
            last_name: formUser.lastName,
            email: formUser.email,
          });
          setIsEditing(false);
        },
        onError: (err) => {
          console.error("Profile update failed:", err);
        },
      }
    );
  };

  if (loading)
    return (
      <div className="text-center text-gray-600 flex flex-col items-center">
        <Loader />
        <p className="mt-2 text-lg font-medium">
          Loading Your Profile
          <span className="dots" />
        </p>
      </div>
    );
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen px-4 py-6 sm:py-0">
      <h1 className="text-2xl font-bold text-gray-800 mb-3">My Profile</h1>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-3 sm:px-6 sm:py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formUser.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                isEditing
                  ? "border-blue-400 focus:ring-blue-300"
                  : "bg-gray-100 border-gray-300"
              }`}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formUser.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                isEditing
                  ? "border-blue-400 focus:ring-blue-300"
                  : "bg-gray-100 border-gray-300"
              }`}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formUser.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                isEditing
                  ? "border-blue-400 focus:ring-blue-300"
                  : "bg-gray-100 border-gray-300"
              }`}
            />
          </div>

          {/* Mobile (non-editable) */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Mobile No.
            </label>
            <input
              type="text"
              name="mobile"
              value={formUser.mobile}
              disabled
              className="w-full px-4 py-2 border rounded-md bg-gray-100 border-gray-300 text-gray-700"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mt-4">
          {isEditing ? (
            <>
              <button
                onClick={() => {
                  if (profile) {
                    setFormUser({
                      firstName: profile.first_name || "",
                      lastName: profile.last_name || "",
                      email: profile.email || "",
                      mobile: profile.mobile || "",
                    });
                  }
                  setIsEditing(false);
                }}
                className="w-full sm:w-auto px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isPending}
                className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isPending ? "Saving..." : "Save"}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
