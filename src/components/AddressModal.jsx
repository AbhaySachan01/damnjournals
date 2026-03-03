import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Country, State, City } from 'country-state-city';

const AddressModal = ({ isOpen, onClose, onAddressAdded }) => {
  // 1. Basic text fields ke liye state
  const [formData, setFormData] = useState({
    name: '', phoneNumber: '', street: '', zipCode: ''
  });

  // 2. Cascading Dropdowns ke liye states
  // Default 'IN' (India) set kiya hai taaki user ko aasani ho
  const [selectedCountry, setSelectedCountry] = useState('IN'); 
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // 3. Dropdown list me dikhane ke liye arrays
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Component load hote hi saari countries fetch kar lo
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // Jab bhi 'Country' change ho, toh uske 'States' load karo aur aage ka data clear kar do
  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry));
      setSelectedState(''); // Purana state clear
      setCities([]);        // Purani cities clear
      setSelectedCity('');
    }
  }, [selectedCountry]);

  // Jab bhi 'State' change ho, toh uski 'Cities' load karo
  useEffect(() => {
    if (selectedCountry && selectedState) {
      setCities(City.getCitiesOfState(selectedCountry, selectedState));
      setSelectedCity('');
    }
  }, [selectedState, selectedCountry]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!selectedState || !selectedCity) {
      toast.error("Please select a State and City");
      return;
    }

    // country-state-city package hume ISO codes ('UP', 'MH') deta hai.
    // Database me hume unka poora naam save karna chahiye.
    const stateName = State.getStateByCodeAndCountry(selectedState, selectedCountry)?.name;

    const finalData = {
      ...formData,
      state: stateName,
      city: selectedCity, // City ka already name hi store hota hai
      // Note: Tere backend Mongoose schema me 'country' field nahi hai, 
      // isliye main yahan country nahi bhej raha hu. Agar bhejna hai toh schema update kar lena.
    };

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_BASE_URL}/api/address`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
        credentials: 'include'
      });

      if (response.ok) {
        toast.success("Address Saved!");
        onAddressAdded(); // List refresh karne ke liye
        onClose();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to save address");
      }
    } catch (error) {
      toast.error("Network Error. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      {/* RESPONSIVE DESIGN: max-h-[90vh] aur overflow-y-auto ensures mobile par katega nahi */}
      <div className="bg-white w-full max-w-md p-6 sm:p-8 rounded-sm shadow-2xl animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
            <h3 className="text-xl font-bold text-[#2F4F4F] uppercase tracking-widest">Add New Address</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-black font-bold text-xl">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Normal Inputs */}
          <input type="text" placeholder="Full Name" required className="w-full border-b p-2 outline-none focus:border-[#DAA520] transition-colors" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input type="tel" placeholder="Phone Number" required className="w-full border-b p-2 outline-none focus:border-[#DAA520] transition-colors" onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} />
          <input type="text" placeholder="House/Street/Area" required className="w-full border-b p-2 outline-none focus:border-[#DAA520] transition-colors" onChange={(e) => setFormData({...formData, street: e.target.value})} />
          <input type="text" placeholder="Zip/Pin Code" required className="w-full border-b p-2 outline-none focus:border-[#DAA520] transition-colors" onChange={(e) => setFormData({...formData, zipCode: e.target.value})} />

          {/* Cascading Dropdowns */}
          <div className="space-y-4 pt-2">
            
            {/* Country Select */}
            <select 
              required
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full border-b p-2 outline-none focus:border-[#DAA520] text-gray-700 bg-white cursor-pointer"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>

            {/* State Select */}
            <select 
              required
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              disabled={!selectedCountry}
              className="w-full border-b p-2 outline-none focus:border-[#DAA520] text-gray-700 bg-white cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed"
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>

            {/* City Select */}
            <select 
              required
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedState}
              className="w-full border-b p-2 outline-none focus:border-[#DAA520] text-gray-700 bg-white cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>

          </div>
          
          <div className="flex gap-4 pt-6">
            <button type="button" onClick={onClose} className="flex-1 py-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition">Cancel</button>
            <button type="submit" className="flex-1 bg-[#2F4F4F] text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-black transition shadow-md">Save Address</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;