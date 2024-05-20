import mongoose from "mongoose";

// Define the schema for the User entity
const userSchema = mongoose.Schema(
  {
    // Name of the user
    name: {
      type: String,
      required: true,
    },
    // Username of the user (must be unique)
    username: {
      type: String,
      required: true,
      unique: true,
    },
    // Password of the user
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

// Create a Mongoose model named 'User' based on the userSchema
const User = mongoose.model("user", userSchema);

// Export the User model as the default export of this module
export default User;
