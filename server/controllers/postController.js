import Post from "../models/post.js";
import User from "../models/user.js";

export const createPostController = async (req, res) => {
    try {
        const { title, description, categories } = req.body;
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is Required"
            });
        }
        if (!description) {
            return res.status(400).json({
                success: false,
                message: "Description is Required"
            });
        }
        if (!categories) {
            return res.status(400).json({
                success: false,
                message: "Categories is Required"
            });
        }

        const post = await new Post({
            title,
            description,
            categories,
            postedBy: req.auth._id,
            createdDate: new Date()
        }).save();
        res.status(201).send({
            success: true,
            message: "Post Created Successfully",
            post
        });

    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            // Duplicate key error
            return res.status(400).json({
                success: false,
                message: "Title is already used"
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
