import { atom } from "recoil";
import { Data } from "../../types/datastoretype";
import { selector } from "recoil";

export const datastore= atom<Data[]>({
    key:"datastore",
    default: selector({
        key: "datastore/default",
        get: () => {
            const savedDataStore = sessionStorage.getItem('dataStore');
            return savedDataStore ? JSON.parse(savedDataStore) : [];
        },
    }),
})