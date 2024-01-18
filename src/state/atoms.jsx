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

export const leadSpotsState = atom({
  key: "leadSpotsState",
  default: [],
});

export const tagsState = atom({
  key: "tagsState",
  default: [],
});

export const selectedTagsState = atom({
  key: "selectedTagsState",
  default: [],
});

export const timeState = atom({
  key: "timeState",
  default: '',
});