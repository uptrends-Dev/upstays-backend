import mongoose from "mongoose";
const listYourPropertySchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  phone: { type: String, required: true, trim: true },
  propertyLocation: { type: String, required: true, trim: true },
  propertyType: {
    type: String,
    enum: ["apartment", "house", "villa", "room"],
    required: true,
  },
  additionalDetails: { type: String, trim: true },
  propertyImage: {
    type: [String],
    required: true,
    validate: {
      validator: (v) => Array.isArray(v) && v.length >= 1,
      message: "At least 1 images are required",
    },
  },
});
const ListYourProperty = mongoose.model(
  "ListYourProperty",
  listYourPropertySchema
);
export default ListYourProperty;
