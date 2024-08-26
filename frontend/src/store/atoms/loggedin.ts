import { atom } from "recoil";
import { loginSelector } from "../selectors/loginSelector";

export const loggedin = atom<boolean>({
    key: "loggedin",
    default: loginSelector
});