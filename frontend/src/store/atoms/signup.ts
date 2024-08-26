import { atom } from "recoil";
import { Signup } from "../../types/signup";

export const signup=atom<Signup>({
    key: "signup",
    default: {
        Name: "",
        Email: "",
        Phone: 0,
        Password: "",
        ConfirmPassword: ""  
    }
})