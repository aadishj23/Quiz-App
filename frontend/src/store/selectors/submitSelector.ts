import { selector } from "recoil";

export const submitSelector = selector({
    key: "submit/default",
    get: () => {
        const savedSubmit = sessionStorage.getItem('submit');
        return savedSubmit ? JSON.parse(savedSubmit) : false;
    },
});