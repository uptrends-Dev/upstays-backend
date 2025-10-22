import mongoose from "mongoose";
const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    propertyGuests: {
      adult: { type: Number, required: true },
      children: { type: Number, required: true },
      infants: { type: Number, required: true },
    },
    propertyType: {
      type: String,
      enum: ["apartment", "house", "villa", "room"],
      required: true,
    },
    location: {
      country: { type: String, required: true },
      city: { type: String, required: true },
      address: { type: String, required: true },
    },
    description: { type: String, required: true },
    tag: {
      type: String,
      enum: ["shortTerm", "longTerm", "forSale"],
      required: true,
    },
    propertyImages: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 3,
        message: "At least 4 images are required",
      },
    },
    propertyInfo: {
      bedrooms: { type: Number, required: false },
      bathrooms: { type: Number, required: false },
    },
    propertyPricing: {
      period: {
        type: String,
        required: true,
        enum: ["perNight", "perWeek", "perMonth", "perYear", "total"],
      },
      priceValue: { type: Number, required: true },
      priceDetails: { type: String, required: false },
      currency: { type: String, enum: ["USD", "EUR", "EGP"], required: true },
    },
    favorate: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    owner: {
      name: String,
      phone: String,
    }
  },
  { timestamps: true }
);
const property = mongoose.model("Property", propertySchema);
export default property;
