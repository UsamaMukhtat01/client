import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listingRoute.js';
import path from 'path';
import cors from 'cors';


dotenv.config();

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB Atlas!");
}).catch((error) => {
    console.error("MongoDB Connection Error:", error);
});


const _dirname = path.resolve();

const app = express ();

app.use(express.json());
app.use(cookieParser());

// app.listen(3000, ()=>{
//     console.log("Server is running on port 3000")
// })


// **********************Use Azure's assigned PORT
const PORT = process.env.PORT || 3000;  
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});


// Before this below code i deployed the backed but it was not working as i did not set CORS allow access to call the api's

app.use(cors({
    origin: 'http://localhost:5173',  // Allow all origins (not recommended for production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));

app.use(`${process.env.API_URL}user`, userRouter);
app.use(`https://mern-estate.azurewebsites.net/auth`, authRouter);
app.use(`${process.env.API_URL}listing`, listingRouter)

app.use(express.static(path.join(_dirname, '/client/dist')));

app.get('*', (req, res) =>{
    res.sendFile(path.join(_dirname, 'client', 'dist', 'index.html'))
})

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server erroe";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})