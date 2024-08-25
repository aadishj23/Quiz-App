import { atom } from "recoil";
import { Select } from "../../types/select";

export const datainput= atom<Select>({
    key:"datainput",
    default: {
        category: " ",
        difficulty: " ",
        questioncount: 0
    }
})