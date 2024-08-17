export interface Data {
    answers : Record<string, string | null>;
    category: string;
    correct_answer: string;
    correct_answers: Record<string, string>;
    description: string | null;
    difficulty: string;
    explanation: string | null;
    id: number;
    multiple_correct_answers: string;
    question: string;
    tags: { name: string }[];
    tip: string | null;
    selected_answer?: string | null;
    is_correct?: boolean;
    is_held: Record<string, boolean>;
}