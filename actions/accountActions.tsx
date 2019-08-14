import { Action } from 'redux';

export interface ISignInAction extends Action {
  phone: string;
  password: string;
}

export interface ICheckCodeAction extends Action {
  checkingCode: string;
}

export const signInAction = (phone: string, password: string) => ({
  phone,
  password,
  type: 'SIGNIN',
});

export const codeCheckAction = (checkingCode: string) => ({
  checkingCode,
  type: 'CHECK_CODE',
});

export const startRequests = () => ({
  type: 'SEND_REQUEST',
});
