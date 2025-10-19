import ListYourProperty from "../models/listYourProperty.js";

export async function createOwnerSubmission(req, res) {
  try {
    const propertyData = req.body;

    const newProperty = new ListYourProperty(propertyData);
    await newProperty.save();

    res.status(201).json({
      message: "Property submitted successfully",
      property: newProperty,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating property submission", error });
  }
}

export async function getAllOwnerSubmission(req, res) {
  try {
    const { propertyType } = req.query; 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortOrder = req.query.sort === "asc" ? 1 : -1;
    
    let filter = {};

    if (propertyType) {
      filter.propertyType = propertyType; 
    }

    const total = await ListYourProperty.countDocuments(filter);
    const properties = await ListYourProperty.find(filter)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean(); // استخدام lean لتحسين الأداء

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

// الحصول على عقار حسب ID
export async function getAllOwnerSubmissionById(req, res) {
  try {
    const propertyId = req.params.id;
    const property = await ListYourProperty.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Error fetching property", error });
  }
}

// // تحديث بيانات العقار
// export async function updateOwnerSubmission(req, res) {
//   try {
//     const propertyId = req.params.id;
//     const updatedData = req.body;

//     const updatedProperty = await ListYourProperty.findByIdAndUpdate(
//       propertyId,
//       updatedData,
//       { new: true } // قم بإرجاع البيانات المحدثة
//     );

//     if (!updatedProperty) {
//       return res.status(404).json({ message: "Property not found" });
//     }

//     res.status(200).json(updatedProperty);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating property", error });
//   }
// }


export async function deleteOwnerSubmission(req, res) {
  try {
    const propertyId = req.params.id;

    const deletedProperty = await ListYourProperty.findByIdAndDelete(propertyId);

    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting property", error });
  }
}
