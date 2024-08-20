import { atom } from "recoil";
import { selector } from "recoil";

export const submit = atom<boolean>({
    key: "submit",
    default: selector({
        key: "submit/default",
        get: () => {
            const savedSubmit = sessionStorage.getItem('submit');
            return savedSubmit ? JSON.parse(savedSubmit) : false;
        },
    }),
});