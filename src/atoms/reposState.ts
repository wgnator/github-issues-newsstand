import { atom, AtomEffect } from "recoil";
import { Repository } from "../types/data";

const localStorageEffect =
  (key: string): AtomEffect<Repository[]> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const savedRepoNames = atom({
  key: "savedRepoNames",
  default: [],
  effects: [localStorageEffect("repos")],
});
