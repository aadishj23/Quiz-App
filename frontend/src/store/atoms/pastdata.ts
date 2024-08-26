import { atom } from "recoil";
import { pastquizselector } from "../selectors/pastquizselector";

export const pastdata = atom({
    key: "pastdata",
    default: pastquizselector
});