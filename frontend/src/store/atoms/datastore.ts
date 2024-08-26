import { atom } from "recoil";
import { Data } from "../../types/datastoretype";
import { dataStoreSelector } from "../selectors/datastoreselector";


export const datastore= atom<Data[]>({
    key:"datastore",
    default: dataStoreSelector
})