import { atom } from "recoil";

export const locationState = atom({
  key: "locationState",
  default: {
    lat: 0,
    lng: 0,
  },
});

export const spotsState = atom({
  key: "spotsState",
  default: [],
});