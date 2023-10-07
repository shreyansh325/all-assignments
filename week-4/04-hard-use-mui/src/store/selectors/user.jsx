import { selector } from "recoil";
import userState from "../atoms/user";

const usernameSelector = selector({
  key: "usernameSelector",
  get: ({ get }) => {
    const user = get(userState);
    return user?.username;
  },
  set: ({ set }, newUsername) => {
    set(userState, (prevUser) => ({
      ...prevUser,
      username: newUsername,
    }));
  },
});

const tokenSelector = selector({
  key: "tokenSelector",
  get: ({ get }) => {
    const user = get(userState);
    return user?.token;
  },
  set: ({ set }, newValue) => {
    set(userState, (prevUser) => ({
      ...prevUser,
      token: newValue,
    }));
  },
});

const isAdminSelector = selector({
  key: "isAdminSelector",
  get: ({ get }) => {
    const user = get(userState);
    return user?.isAdmin;
  },
  set: ({ set }, newValue) => {
    set(userState, (prevUser) => ({
      ...prevUser,
      isAdmin: newValue,
    }));
  },
});

export { usernameSelector, tokenSelector, isAdminSelector };
