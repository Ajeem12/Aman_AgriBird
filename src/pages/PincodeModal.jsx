import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Select from "react-select";
import useLocationStore from "../store/locationStore";
import { useModalStore } from "../store/uiStore";
import { data } from "../util/data";
import { useCity } from "../hooks/useCity";
import toast from "react-hot-toast";

const PincodeModal = () => {
  const { data: cityData, isLoading } = useCity();
  console.log("City Data:", cityData);

  const { city, pincode, setCity, setPincode } = useLocationStore();
  const closePincodeModal = useModalStore((state) => state.closePincodeModal);

  const cityOptions = cityData
    ? cityData
        .filter((loc) => loc.status === 1)
        .map((loc) => ({
          value: loc.city_name,
          label: loc.city_name,
          pincodes: loc.pincode_details,
        }))
    : [];

  const selectedCityData = city
    ? cityOptions.find((loc) => loc.value === city.value)
    : null;

  const pincodeOptions = selectedCityData
    ? selectedCityData.pincodes
        .filter((pin) => pin.status === 1)
        .map((pin) => ({
          value: pin.pincode,
          label: pin.pincode,
        }))
    : [];

  const handleContinue = () => {
    if (city && pincode) {
      closePincodeModal();
    } else {
      toast("Please select both city and pincode");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-2 py-6 fixed inset-0 z-50 bg-black bg-opacity-40">
      <div className="relative w-full max-w-xs sm:max-w-md md:max-w-xl p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-2xl">
        <button
          onClick={closePincodeModal}
          className="absolute top-1 right-2 text-gray-600 hover:text-gray-800 transition"
        >
          <CloseIcon />
        </button>

        <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold text-red-800 text-center mb-4 sm:mb-6">
          CHECK DELIVERY AVAILABILITY
        </h1>

        <div className="flex flex-col  gap-3 sm:gap-4">
          <div className="w-full ">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              City
            </label>
            <Select
              options={cityOptions}
              value={city}
              onChange={(option) => {
                setCity(option);
                setPincode(null);
              }}
              placeholder="Select city..."
              isSearchable
              isClearable
            />
          </div>

          <div className="w-full ">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Pincode
            </label>
            <Select
              options={pincodeOptions}
              value={pincode}
              onChange={setPincode}
              placeholder="Select pincode..."
              isSearchable
              isClearable
              isDisabled={!city}
            />
          </div>

          <button
            onClick={handleContinue}
            className="w-full mt-3 sm:mt-4 py-2 sm:py-3 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 hover:scale-105 transition-all duration-300"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
};

export default PincodeModal;
