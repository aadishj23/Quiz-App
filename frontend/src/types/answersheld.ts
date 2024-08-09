// export interface AnswersHeld {
//     text: string;
//     id: string;
//     isHeld:boolean;
// }
export interface AnswersHeld {
    answer_a: string | null;
    answer_b: string | null;
    answer_c: string | null;
    answer_d: string | null;
    answer_e?: string | null; 
    answer_f?: string | null;
}