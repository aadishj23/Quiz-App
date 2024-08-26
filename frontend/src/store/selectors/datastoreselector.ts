import { selector } from "recoil";

export const dataStoreSelector = selector({
    key: "datastore/default",
    get: () => {
        const savedDataStore = sessionStorage.getItem('dataStore');
        return savedDataStore ? JSON.parse(savedDataStore) : [];
    },
});