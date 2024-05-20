import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connection  =async ()=>{

    const URL = process.env.MONGO_URL;
    try {
        await mongoose.connect(URL,{useNewUrlParser: true});
        console.log('Database connected successfully'.cyan.underline.bold);
    } catch (error) {
        console.error('Error while connecting with the database', error.message.red);
    }
}

export default connection;