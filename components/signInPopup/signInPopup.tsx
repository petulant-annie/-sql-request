import * as React from 'react';
import classNames from 'classnames/bind';

import './style/signInPopup.sass';

interface ISignInProps {
  onInputCheckValidation: (e: React.ChangeEvent) => void;
  passwordCheck: (e: React.ChangeEvent) => void;
  handleSignInSubmit: (e: React.MouseEvent) => void;
  handleCodeValidSubmit: (e: React.MouseEvent) => void;
}

export default class SignInPopup extends React.Component<ISignInProps> {
  formClassName: string;
  formCodeClassName: string;
  constructor(props: ISignInProps) {
    super(props);
  }

  render() {
    let isAccessTokenEmpty;
    const isToken = localStorage.getItem('access token');
    if (isToken === null || isToken === 'undefined') {
      isAccessTokenEmpty = true;
    } else isAccessTokenEmpty = false;
    console.log(isAccessTokenEmpty);

    const form = (
      <form className={isAccessTokenEmpty ? 'signIn-check' : 'hideLogin'}>
        <div className="signIn-header">Вхід до особистого кабінету</div>
        <input
          type="text"
          name="phone"
          className="signIn-tel"
          placeholder="телефон"
          onChange={this.props.onInputCheckValidation}
        />
        <input
          type="password"
          name="password"
          className="signIn-pass"
          placeholder="пароль"
          onChange={this.props.passwordCheck}
        />
        <button
          type="submit"
          className="signIn-check-btn check-btn"
          onClick={this.props.handleSignInSubmit}
        >
          Увійти
        </button>
      </form>
    );

    const code = (
      <form className={!isAccessTokenEmpty ? 'signIn-check' : 'hideLogin'}>
        <div className="signIn-header">Код перевірки: </div>
        <input
          type="text"
          name="checkingCode"
          className="signIn-code"
          placeholder="ХХХХ"
          onChange={this.props.onInputCheckValidation}
        />
        <button
          type="submit"
          className="code-check-btn check-btn"
          onClick={this.props.handleCodeValidSubmit}
        >
          Підтвердити
        </button>
      </form>
    );

    return (
      <div className="signIn-main">
        {form}
        {code}
      </div>
    );
  }
}
