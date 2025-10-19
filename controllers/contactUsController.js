import contactUs from "../models/contactUs.js";

// Create a new contact message
export async function createContactUs(req, res) {
  try {
    const contactUsData = req.body;

    const newContactUs = new contactUs(contactUsData);

    await newContactUs.save();

    res.status(201).json({
      message: "Contact message submitted successfully",
      contactUs: newContactUs,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating contact message", error });
  }
}

// Get all contact messages with pagination
export async function getAllcreateContactUs(req, res) {
  const { page, limit, sort } = req.query;
  try {
    const pageNumber = parseInt(page) || 1;
    const pageLimit = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageLimit;
    const sortOrder = sort === "asc" ? 1 : -1;

    const total = await contactUs.countDocuments();
    const contactMessages = await contactUs
      .find()
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(pageLimit)
      .lean();

    res.status(200).json({
      page: pageNumber,
      limit: pageLimit,
      total,
      totalPages: Math.ceil(total / pageLimit),
      currentPage: pageNumber,
      data: contactMessages,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact messages", error });
  }
}

// Get a contact message by ID
export async function getcreateContactUsById(req, res) {
  try {
    const contactId = req.params.id;
    const contactMessage = await contactUs.findById(contactId);

    if (!contactMessage) {
      return res.status(404).json({ message: "Contact message not found" });
    }

    res.status(200).json(contactMessage);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact message", error });
  }
}

// Delete a contact message by ID
export async function deleteContactUs(req, res) {
  try {
    const contactId = req.params.id;
    const contactMessage = await contactUs.findByIdAndDelete(contactId);

    if (!contactMessage) {
      return res.status(404).json({ message: "Contact message not found" });
    }

    res.status(200).json({ message: "Contact message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact message", error });
  }
}
