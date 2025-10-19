import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    propertyInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",  // تأكد من أن اسم الموديل هو "Property" (بصيغة المفرد)
      required: true,
    },
    userInfo: {
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      message: { type: String, trim: true }, // لا داعي لجعل message حقلًا مطلوبًا
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    pending: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema); // استخدام التسمية بصيغة المفرد هنا
export default Booking;
