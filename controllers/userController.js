import User from "../models/user.js";

async function getAllUsers(req, res) {
  try {
    const users = await User.find({}, { password: 0, __v: 0 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function getUserById(req, res) {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId, { password: 0, __v: 0 });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "error at getting user" });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;

  // Never allow password here; also strip immutable/system fields
  const { password, _id, createdAt, updatedAt, ...body } = req.body || {};

  // Whitelist: only fields you actually want to allow updating
  const ALLOWED = [
    "username",
    "email",
    "role",
    "isActive",
    "profilePicture",
    "bio",
    "phoneNumber",
    "address",
    "lastLogin",
  ];

  const update = {};
  for (const key of ALLOWED) {
    if (body[key] !== undefined) update[key] = body[key];
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: update },
      {
        new: true,             // return the updated doc
        runValidators: true,   // run schema validators
        context: "query",      // needed for some validators
      }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully", user });
  } catch (error) {
    // Handle unique index errors (e.g., username/email unique)
    if (error?.code === 11000) {
      const field = Object.keys(error?.keyPattern ?? {})[0] ?? "field";
      return res
        .status(409)
        .json({ message: `${field} already exists`, error: error.message });
    }

    return res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
}

async function deleteUser(req, res) {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
}

export { getAllUsers, updateUser, deleteUser, getUserById };
