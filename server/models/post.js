import mongoose from "mongoose";

// Define the schema for the Post entity
const postSchema = mongoose.Schema({
    // Title of the post
    title: {
        type: String,
        required: [true,'Title is required'],
        unique: [true,'Title is already used' ]// Ensure each title is unique
    },
    // Description of the post
    description: {
        type: String,
        required: [true,'Description is required']
    },
    // Username of the author of the post
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    // Categories of the post
    categories: {
        type: String,
        required: true,
    },
    // Date when the post was created
    createdDate: {
        type: Date
    }
});

// Create a Mongoose model named 'post' based on the postSchema
const Post = mongoose.model('post', postSchema);

// Export the post model as the default export of this module
export default Post;