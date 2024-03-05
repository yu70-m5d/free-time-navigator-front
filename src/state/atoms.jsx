import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

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

export const modalIsOpenState = atom({
  key: "modalIsOpenState",
  default: false,
});


const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: typeof window === 'undefined' ? undefined : window.sessionStorage,
  // storage: typeof window === 'undefined' ? undefined : window.localStorage,
})

export const signingInState = atom({
  key: 'signingInState',
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const clientState = atom({
  key: 'clientState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const uidState = atom({
  key: 'uidState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
