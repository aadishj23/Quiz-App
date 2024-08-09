import { AnswersHeld } from "./answersheld";

export interface Data {
    answers : AnswersHeld[];
    correct_answers: string[];
    id: number;
    question: string;
}