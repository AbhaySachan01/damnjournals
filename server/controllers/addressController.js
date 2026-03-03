import Address from '../models/Address.js';

export const addAddress = async (req, res) => {
  try {
    const addressData = { ...req.body, user: req.user._id };
    
    // Agar ye pehla address hai ya isDefault true hai, toh baaki default hata do
    if (req.body.isDefault) {
      await Address.updateMany({ user: req.user._id }, { isDefault: false });
    }

    const address = await Address.create(addressData);
    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const removeAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    
    // findOneAndDelete use kar rahe hain taaki sure ho sakein ki 
    // user sirf apna hi address delete kar raha hai, kisi aur ka nahi.
    const deletedAddress = await Address.findOneAndDelete({ 
      _id: addressId, 
      user: req.user._id 
    });

    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ message: "Address removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getMyAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};