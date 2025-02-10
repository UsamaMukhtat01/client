import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listingRoute.js';
import path from 'path';
import cors from 'cors';
import { MongoClient, ServerApiVersion } from "mongodb";



dotenv.config();

const mongoUrl = process.env.MONGO

// const client = new MongoClient(mongoUrl, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// const run = async () => {
//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });
//     console.log(mongoUrl === "mongodb://localhost:27017/" ? "connected to local MongoDB!": "connected to Atlas MongoDB!");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   } finally {
//     await client.close();
//   }
// };

const run = async () => {
    try {
      await mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(mongoUrl === "mongodb://localhost:27017/" ? "connected to local MongoDB!": "connected to Atlas MongoDB!");
    } catch (error) {
      console.error("MongoDB Connection Error:", error);
      process.exit(1);
    }
  };



const _dirname = path.resolve();

const app = express ();

app.use(express.json());
app.use(cookieParser());

// **********************Use Azure's assigned PORT
const PORT = process.env.PORT || 3000;  
run().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
  console.log(mongoose.connection.readyState);



// Before this below code i deployed the backed but it was not working as i did not set CORS allow access to call the api's

app.use(cors({
    origin: 'http://localhost:5173',  // Allow all origins (not recommended for production)
    // origin: '*',  // Allow all origins (not recommended for production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));

app.use(`/api/user`, userRouter);
app.use(`/api/auth`, authRouter);
app.use(`/api/listing`, listingRouter)

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