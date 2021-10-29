import jwtDecode from 'jwt-decode';
import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: localStorage.getItem('token')
    ? {
        ...jwtDecode(localStorage.getItem('token')),
        token: localStorage.getItem('token'),
      }
    : '',
});

export const userScoreState = atom({
  key: 'userScoreState',
  default: '',
});
