import Property from "../models/property.js";
export async function createProperty(req, res) {
  try {
    const propertyData = req.body;
    const newProperty = new Property(propertyData);
    await newProperty.save();
    res
      .status(201)
      .json({
        message: "Property created successfully",
        property: newProperty,
      });
  } catch (error) {
    res.status(500).json({ message: "Error creating property", error });
  }
}
export async function getAllProperties(req, res) {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error });
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
