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

export const getPostsController =  async(req, res) => {
    try {
        const posts = await Post.find().populate("postedBy", "_id name")
        .sort({ createdDate: -1 });
        res.status(200).send({
            success: true,
            message: "Posts Fetched Successfully",
            posts
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const getUserPostsController = async (req, res) => {
    try {
        const userPosts = await Post.find({postedBy: req.auth._id})
        .sort({ createdDate: -1 });
        res.status(200).send({
            success: true,
            message: "User Posts Fetched Successfully",
            userPosts
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const deletePostController = async (req, res) => {
    try {
        const {id} = req.params
        await Post.findByIdAndDelete({_id:id});
        res.status(200).send({
            success: true,
            message: "Post Deleted Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const getLatestPostTimeController = async (req, res) => {
    try {
        const latestPost = await Post.findOne().sort({ createdDate: -1 }).select('createdDate');
        if (latestPost) {
            res.status(200).send({
                success: true,
                latestPostTime: latestPost.createdDate
            });
        } else {
            res.status(200).send({
                success: true,
                latestPostTime: null
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
}