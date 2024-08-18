import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import QuizData from './db';
import fetch from './middlewares/fetch';
import { Request, Response } from "express";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const URL = process.env.DATABASE_URL;

app.use(cors());
app.use(express.json());

if (URL) {
    mongoose.connect(URL)
        .then(() => console.log("Connected to MongoDB"))
        .catch(err => console.error("MongoDB connection error:", err));
} else {
    console.error("DATABASE_URL is not defined");
}

app.post('/updatedata', fetch, async (req:Request, res:Response) => {
    await QuizData.create({
        data: req.body.dataRes,
    });
    const data = await QuizData.find({});
    res.send(data);  
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});