import { hashPassword } from "../helpers/authHelper.js";
import User from "../models/user.js";

const userController =async (req,res) =>{

    try {
        const {name,username,password} = req.body;

        if(!name){
            return res.status(400).json({
                success: false,
                message: "Name is Required"
            })
        }
        if(!username){
            return res.status(400).json({
                success: false,
                message: "Username is Required"
            })
        }
        if(!password || password.length < 6){
            return res.status(400).json({
                success: false,
                message: "Password is Required and should be atleast 6 characters long"
            })
        }
        const exisitingUser = await User.findOne({username})
        if(exisitingUser){
            return res.status(400).json({
                success: false,
                message: "User with this username already exists"
            })
        }
        const hashedPassword = await hashPassword(password);
        const user = await User({name,username,password:hashedPassword}).save();

        res.status(200).json({
            success: true,
            message: "User Registered Successfully Plase Login to continue"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export default userController;