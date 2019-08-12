import * as React from 'react';

import './style/signInPopup.sass';

interface ISignInProps {
  onInputCheckValidation: (e: React.ChangeEvent) => void;
  passwordCheck: (e: React.ChangeEvent) => void;
  handleSignInSubmit: (e: React.MouseEvent) => void;
  handleCodeValidSubmit: (e: React.MouseEvent) => void;
}

export default class SignInPopup extends React.Component<ISignInProps> {
  constructor(props: ISignInProps) {
    super(props);
  }

  render() {
    return (
      <div className="signIn-main">
        <form action="/login" className="signIn-check">
          <div className="signIn-header">Sign in: </div>
          <input
            type="text"
            name="phone"
            className="signIn-tel"
            placeholder="phone"
            onChange={this.props.onInputCheckValidation}
          />
          <input
            type="text"
            name="password"
            className="signIn-pass"
            placeholder="password"
            onChange={this.props.passwordCheck}
          />
          <button
            type="submit"
            className="signIn-check-btn check-btn"
            onClick={this.props.handleSignInSubmit}
          >
            Submit
          </button>
        </form>
        <form className="signIn-code-check">
        <div className="signIn-header">Enter code: </div>
          <input
            type="text"
            name="checkingCode"
            className="signIn-code"
            placeholder="checking code"
            onChange={this.props.onInputCheckValidation}
          />
          <button
            type="submit"
            className="code-check-btn check-btn"
            onClick={this.props.handleCodeValidSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
