import mongoose from "mongoose";

const connection  =async ()=>{
    const URL =`mongodb+srv://patelsmit5:admin@refugee-assistant-app.xl93pss.mongodb.net/?retryWrites=true&w=majority&appName=Refugee-assistant-app`;
    try {
        await mongoose.connect(URL,{useNewUrlParser: true});
        console.log('Database connected successfully'.cyan.underline.bold);
    } catch (error) {
        console.error('Error while connecting with the database', error.message.red);
    }
}

export default connection;