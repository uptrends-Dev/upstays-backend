import Property from "../models/property.js";
export async function createProperty(req, res) {
  try {
    const propertyData = req.body;
    const newProperty = new Property(propertyData);
    await newProperty.save();
    res.status(201).json({
      message: "Property created successfully",
      property: newProperty,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating property", error });
  }
}
export async function getAllProperties(req, res) {
  const { location, priceRange, tag } = req.query;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortOrder = req.query.sort === "asc" ? 1 : -1;
    let filter = {};

    // Filter by location (country, city, or address)
    if (location) {
      const locationRegex = { $regex: location, $options: "i" };
      filter["location.country"] = locationRegex;
      filter["location.city"] = locationRegex;
    }

      // Filter by price range
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        filter["propertyPricing.priceValue"] = { $gte: min, $lte: max };
      }
    }
    // Filter by tag
    if (tag) {
      filter.tag = tag;
    }
    const total = await Property.countDocuments(filter);
    const properties = await Property.find(filter)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit)
      .select('title tag propertyImages location propertyPricing')
      .lean();

    res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: properties,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error: error.message });
  }
}

export async function getPropertyById(req, res) {
  try {
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Error fetching property", error });
  }
}
export async function updateProperty(req, res) {
  try {
    const propertyId = req.params.id;
    const updatedData = req.body;
    const property = await Property.findByIdAndUpdate(propertyId, updatedData, {
      new: true,
    });
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Error updating property", error });
  }
}

export async function deleteProperty(req, res) {
  try {
    const propertyId = req.params.id;
    const property = await Property.findByIdAndDelete(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting property", error });
  }
}
