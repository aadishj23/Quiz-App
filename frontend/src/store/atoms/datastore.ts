import { atom } from "recoil";
import { Data } from "../../types/datastoretype";

export const datastore= atom<Data[]>({
    key:"datastore",
    default: []
})