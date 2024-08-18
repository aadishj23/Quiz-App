import axios from "axios";
import { Request, Response, NextFunction } from "express";

const fetch = async (req: Request, res: Response,next:NextFunction) =>{
    const baseURL = "https://quizapi.io/api/v1/questions?apiKey=UINipDkO8Dl0yUKerqUErhb8O65OQAgLMTna6lC1";
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