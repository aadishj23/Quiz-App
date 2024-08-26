import { atom } from "recoil";
import { submitSelector } from "../selectors/submitSelector";

export const submit = atom<boolean>({
    key: "submit",
    default: submitSelector
});