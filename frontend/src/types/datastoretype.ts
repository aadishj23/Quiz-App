import { AnswersHeld } from "./answersheld";

export interface Data {
    answers : AnswersHeld[];
    correct_answers: { [key:string]: boolean};
    id: number;
    question: string;
}