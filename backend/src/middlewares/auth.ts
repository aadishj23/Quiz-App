import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: 'Please Login First to start the quiz'
        }); 
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token,jwtSecret); 
        req.body.userID = decoded.userid;
        next();
    } catch(err) {
        return res.status(403).json({
            message: 'Invalid token'
        }); 
    }
}

export default auth;