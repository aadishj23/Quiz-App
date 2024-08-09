import { AnswersHeld } from "./answersheld";

export interface Data {
    answers : AnswersHeld;
    correct_answer: string;
    id: number;
    question: string;
}