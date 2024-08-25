import { atom } from "recoil";
import { selector } from "recoil";

export const loggedin = atom<boolean>({
    key: "loggedin",
    default: selector({
        key: "loggedin/default",
        get: () => {
            const savedLoggedIn = localStorage.getItem('token');
            return savedLoggedIn ? true : false;
        },
    }),
});