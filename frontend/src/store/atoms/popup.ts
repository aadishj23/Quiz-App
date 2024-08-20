import {atom} from 'recoil';

export const PopUpAtom = atom<boolean>({
    key: "popup",
    default: false
});