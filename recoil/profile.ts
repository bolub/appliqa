import { atom } from 'recoil';

export const profileState = atom<any>({
  key: 'profileState',
  default: {
    username: '',
  },
});
