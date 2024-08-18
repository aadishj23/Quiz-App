import mongoose from "mongoose";

const schema = new mongoose.Schema({
    quizid: {
        type: String,
        required: false,
    },
    data: {
        type: [Object],
        required: true,
    }, 
});

const QuizData = mongoose.model("QuizData", schema);

export default QuizData;    