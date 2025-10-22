import Booking from "../models/booking.js";

export async function createBooking(req, res) {
  try {
    const bookingData = req.body;
    const newBooking = new Booking(bookingData);
    await newBooking.save();
    res.status(201).json({
      message: "Booking Created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error(error); // من الأفضل طباعة الخطأ للمساعدة في تصحيحه
    res.status(500).json({ message: "Error creating Booking", error });
  }
}

export async function getAllBookings(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortOrder = req.query.sort === "asc" ? 1 : -1;
    const total = await Booking.countDocuments();

    const bookings = await Booking.find()
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "propertyInfo",
        // slice the array to the first element
        select: { title: 1, propertyImages: { $slice: 1 } },
        options: { lean: true },
      })
      .lean();

    // const data = bookings.map((v) => {
    //   v.propertyInfo.propertyImages = v.propertyInfo.propertyImages
    //   return v
    // })

    res.status(200).json({
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: bookings,
    });
  } catch (error) {
    console.error(error); // طباعة الخطأ هنا أيضًا
    res.status(500).json({ message: "Error fetching bookings", error });
  }
}

export async function getbookingById(req, res) {
  try {
    const BookingId = req.params.id;
    const booking = await Booking.findById(BookingId)
      .populate({
        path: "propertyInfo",
        // slice the array to the first element
        select: { title: 1, propertyImages: { $slice: 1 } },
        options: { lean: true },
      })
      .lean();
    if (!booking) {
      return res.status(404).json({ message: "Booking not found with the given ID" });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching booking", error });
  }
}

export async function deleteBooking(req, res) {
  try {
    const BookingId = req.params.id;
    const booking = await Booking.findByIdAndDelete(BookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found with the given ID" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting booking", error });
  }
}
