import mongoose from "mongoose";

const schema = new mongoose.Schema({
    // quizid: {
    //     type: String,
    //     required: false,
    // },
    category: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    questioncount: {
        type: Number,
        required: true,
    },
    data: {
        type: [Object],
        required: true,
    }, 
});

const userschema= new mongoose.Schema({
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
});

export const User = mongoose.model("User", userschema);
export const QuizData = mongoose.model("QuizData", schema);
  