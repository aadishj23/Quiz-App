import { selector } from "recoil";

export const pastquizselector = selector({
    key: "pastquizselector",
    get: () => {
        const savedPastQuiz = sessionStorage.getItem('pastdata');
        return savedPastQuiz ? JSON.parse(savedPastQuiz) : [];
    }
});