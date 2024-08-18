import { atom } from "recoil";

export const loggedin = atom<boolean>({
    key: "loggedin",
    default: false,
});