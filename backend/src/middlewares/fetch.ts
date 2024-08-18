import axios from "axios";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const fetch = async (req: Request, res: Response,next:NextFunction) =>{
    const baseURL = process.env.API_URL;
    const fetchedData = await axios({
        url: `${baseURL}&category=${req.body.category}&difficulty=${req.body.difficulty}&limit=${req.body.questioncount}`,
        method: "GET",
    });
    const dataWithHeld= fetchedData.data.map(dataWithoutHeld => ({
        ...dataWithoutHeld,
        selected_answer: null,
        is_correct: false,
        is_held: {
          answer_a_held: false,
          answer_b_held: false,
          answer_c_held: false,
          answer_d_held: false,
          answer_e_held: false,
          answer_f_held: false,
        },
    }));
    req.body.dataRes = dataWithHeld;
    next();
}

export default fetch;