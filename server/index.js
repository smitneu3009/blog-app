import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connection from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/auth',userRoutes);
app.use('/api/v1/post',postRoutes);

app.get('', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the Application"
        })
})

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.green.bold);
})

connection();

