import { atom } from 'recoil';

export const boardState = atom<any>({
  key: 'boardState',
  default: {},
});
