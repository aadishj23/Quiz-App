import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (token) {
        try {
            const decoded = jwt.verify(token, jwtSecret);
            req.body.user = decoded;
            next();
        } catch (error) {
            res.status(401).send("Invalid Token");
        }
    } else {
        res.status(401).send("Access Denied");
    }
}

export default auth;