import { atom } from "recoil";
import { Signin } from "../../types/signin";

export const signin=atom<Signin>({
    key: "signin",
    default: {
        Name: "",
        Password: "" 
    }
})