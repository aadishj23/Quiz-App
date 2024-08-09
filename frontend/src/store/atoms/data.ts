import { atom } from "recoil";

export const datainput= atom({
    key:"datainput",
    default: {
        category: " ",
        difficulty: " ",
        questioncount: " "
    }
})