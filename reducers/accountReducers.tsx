
export interface IInitialState {
  phone: string;
  password: string;
  checkingCode: string;
}

const INITIAL_STATE: IInitialState = {
  phone: '',
  password: '',
  checkingCode: null,
};

const accountState =
  (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
      case 'SIGNIN':
        return { ...state, phone: action.phone, password: action.password };
      case 'CHECK_CODE':
        return { ...state, checkingCode: action.checkingCode };
      default:
        return state;
    }
  };

export default accountState;
