import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { PrismaClient } from '@prisma/client';
import auth from './middlewares/auth';
import fetch from './middlewares/fetch';
import { signinSchema,signupSchema } from './validation';
import { Request, Response,NextFunction } from "express";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const prisma= new PrismaClient();

app.use(cors());
app.use(express.json());
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.json({
        'msg': 'something went wrong '
    })
})

app.get('/',auth, (req:Request, res:Response) => {
    res.json({
        message: 'You are authorized',
        userID: req.body.userID,
    });
});

app.post('/updatedata',auth, fetch, async (req: Request, res: Response) => {
    try {
        const questionCount = parseInt(req.body.questioncount, 10); 

        if (isNaN(questionCount)) {
            return res.status(400).send('Invalid question count.');
        }

        await prisma.quizData.create({
            data: {
                userId: req.body.userID,
                category: req.body.category,
                difficulty: req.body.difficulty,
                questioncount: questionCount,
                data: req.body.dataRes,
            },
        });

        const data = await prisma.quizData.findMany({
            where: {
                userId: req.body.userID,
                category: req.body.category,
                difficulty: req.body.difficulty,
                questioncount: questionCount,
                data: {
                    equals: req.body.dataRes,
                },
            },
        });

        res.send(data);
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('An error occurred while updating data.');
    }
});


app.post('/signup', async (req:Request, res:Response) => {
    const { name, email, phone, password, confirmPassword } = req.body;
    const parsedData = signupSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).send(parsedData.error);
    } else{
        if (password !== confirmPassword) {
            res.status(400).send("Password and Confirm Password must be the same");
        } else {
            const user = await prisma.user.create({
                data: {
                  id: nanoid(),      
                  name,
                  email,
                  phone,
                  password,
                },
            });
            res.status(200).json({ 
                "message": "User created successfully", 
                "user": user 
            });
        }
    }
});

app.post('/signin', async (req:Request, res:Response) => {
    const signinData = signinSchema.safeParse(req.body);
    if (!signinData.success) {
        res.status(400).send(signinData.error);
    } else {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
            email: email
            }
        });
        if (user && user.password === password) {
            const jwtSecret = process.env.JWT_SECRET;
            if (jwtSecret) {
                const token = jwt.sign({
                userid: user.id,
                }, jwtSecret, { expiresIn: '10d' });
                res.send({
                    token,
                    name: user.name,
                });
            } else {
                res.status(500).send("JWT secret is not defined");
            }
            // res.send(user);
        } else {
            res.status(401).send("Invalid email or password");
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});