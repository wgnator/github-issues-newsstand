import { atom, selector, useRecoilValue } from 'recoil';
import { MOBILE_WIDTH } from '../consts/consts';

export const screenSizeState = atom<number>({
  key: 'screenSize',
  default: 0,
  effects: [
    ({ setSelf }) => {
      setSelf(window.innerWidth);
    },
  ],
});

export const mediaType = selector({
  key: 'mediaType',
  get: ({ get }) => (get(screenSizeState) <= MOBILE_WIDTH ? 'mobile' : 'desktop/tablet'),
});

export const useMediaType = () => useRecoilValue(mediaType);
