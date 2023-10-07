import { atom } from "recoil";

const userState = atom({
  key: "userState",
  default: {
    username: null,
    token: null,
    isAdmin: null,
  },
});

export default userState;
