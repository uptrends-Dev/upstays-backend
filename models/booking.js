import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    propertyInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property", // تأكد من أن اسم الموديل هو "Property" (بصيغة المفرد)
      required: true,
    },
    userInfo: {
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
      email: {
        type: String,
        required: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
      },
      phone: { type: String, required: true, trim: true },
      preferredDate: { type: Date },
      message: { type: String, trim: true },
      additionalServices: {
        type: [String],
      },
    },
    pending: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema); // استخدام التسمية بصيغة المفرد هنا
export default Booking;
