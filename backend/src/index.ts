import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import {QuizData,User} from './db';
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
        category: req.body.category,
        difficulty: req.body.difficulty,
        questioncount: req.body.questioncount,
        data: req.body.dataRes,
    });
    const data = await QuizData.find({});
    res.send(data);  
});

app.post('/signup', async (req:Request, res:Response) => {
    const { name, email, phone, password } = req.body;
    const user = await User.create({ name, email, phone, password });
    res.send(user);
});

app.get('/signin', async (req:Request, res:Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user?.password === password) {
        res.send(user);
    } else {
        res.status(401).send("Invalid email or password");
    }
    }
);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});