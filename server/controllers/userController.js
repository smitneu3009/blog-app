import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import User from "../models/user.js";
import { expressjwt } from 'express-jwt';

export const requireSignIn = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
});

const userController = async (req, res) => {
    try {
        const { name, username, password } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is Required"
            });
        }
        if (!username) {
            return res.status(400).json({
                success: false,
                message: "Username is Required"
            });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password is Required and should be at least 6 characters long"
            });
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this username already exists"
            });
        }
        const hashedPassword = await hashPassword(password);
        const user = await new User({ name, username, password: hashedPassword }).save();

        res.status(200).json({
            success: true,
            message: "User Registered Successfully. Please Login to continue"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username) {
            return res.status(400).json({
                success: false,
                message: "Username is Required"
            });
        }
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is Required"
            });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        user.password = undefined;
        res.status(200).json({
            success: true,
            message: "User Logged in Successfully",
            token,
            user,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const updateUserController = async (req, res) => {
    try {
        const { name, password, username } = req.body;
        const user = await User.findOne({ username });

        if (password && password.length < 6) {
            return res.status(400).send({
                success: false,
                message: "Password is Required and should be at least 6 characters long"
            });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;

        const updatedUser = await User.findOneAndUpdate({ username }, {
            name: name || user.name,
            password: hashedPassword || user.password
        }, { new: true });
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "User Updated Successfully",
            updatedUser,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in User update API",
            error
        });
    }
};

export default userController;