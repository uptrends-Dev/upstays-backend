import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  phone: { type: String, required: true, trim: true },
  message: { type: String, trim: true },
},{ timestamps: true });

const contactUs = mongoose.model("contactUs", contactUsSchema);

export default contactUs;
