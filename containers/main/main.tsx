import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';

import SignInPopup from '../../components/signInPopup/signInPopup';
import { checkUser, checkCode, getTokenRefresh } from '../../requests/request';
import { signInAction, codeCheckAction } from '../../actions/accountActions';
import Header from '../../components/header/header';
import ContentBar from '../contentBar/contentBar';
import { IInitialState } from '../../reducers/accountReducers';

import './style/main.sass';

export interface IState {
  user: {
    phone: string;
    password: string;
    checkingCode: string;
  };
  isRefreshTokenEmpty: boolean;
}

interface IProps<IInitialState> {
  accountState: IInitialState;
  signInAction: (phone: string, password: string) => void;
  codeCheckAction: (checkingCode: string) => void;
}

class Main extends React.Component<IProps<IInitialState>> {
  state: IState;
  constructor(props: IProps<IInitialState>) {
    super(props);
    this.state = {
      user: {
        phone: '',
        password: '',
        checkingCode: '',
      },
      isRefreshTokenEmpty: true,
    };
  }

  dataChange(e: React.ChangeEvent) {
    const target = e.target as HTMLInputElement;
    const targetName = target.name;

    this.setState({
      user: { ...this.state.user, [targetName]: target.value },
    });
  }

  onInputCheckValidation = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const targetName = target.name;
    const phoneRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){9,14}(\s*)?$/gi;
    const codeRegExp = /^\d{4}$/gi;

    if (
      targetName.toString() === 'phone' &&
      target.value.match(phoneRegExp)
    ) {
      target.setCustomValidity('');
      this.dataChange(e);
    } else if (
      targetName.toString() === 'checkingCode' &&
      target.value.match(codeRegExp)
    ) {
      target.setCustomValidity('');
      this.dataChange(e);
    } else target.setCustomValidity('Invalid data.');
  }

  passwordCheck = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const passwordRegExp = /^(?=.*[a-z])[a-z\d]{6,}$/gi;

    if (target.value.match(passwordRegExp)) {
      target.setCustomValidity('');
      this.dataChange(e);
    } else target.setCustomValidity('Invalid data.');
  }

  handleSignInSubmit = (e: React.MouseEvent) => {
    e.preventDefault;
    this.props.signInAction(this.state.user.phone, this.state.user.password);
    checkUser(this.state.user);
  }

  handleCodeValidSubmit = (e: React.MouseEvent) => {
    e.preventDefault;
    this.props.codeCheckAction(this.state.user.checkingCode);
    checkCode(this.state.user);
  }

  signInPopup = (props: RouteComponentProps) => {
    return (
      <SignInPopup
        {...props}
        onInputCheckValidation={this.onInputCheckValidation}
        passwordCheck={this.passwordCheck}
        handleSignInSubmit={this.handleSignInSubmit}
        handleCodeValidSubmit={this.handleCodeValidSubmit}
      />
    );
  }

  header = (props: RouteComponentProps) => {
    return (
      <Header
        {...props}
        handleClearLocalStorage={this.handleClearLocalStorage}
      />
    );
  }

  handleClearLocalStorage = () => {
    localStorage.clear();
    this.setState({ isRefreshTokenEmpty: true });
  }

  handleTokenRefresh() {
    const isRefreshToken = localStorage.getItem('refresh token');
    if (isRefreshToken) {
      console.log('refresh');
      let timerId = setTimeout(function refresh() {
        getTokenRefresh();
        timerId = setTimeout(refresh, 540000);
      }, 540000);
    }
  }

  componentDidMount() {
    const isRefreshToken = localStorage.getItem('refresh token');
    if (isRefreshToken === null || isRefreshToken === 'undefined') {
      this.setState({ isRefreshTokenEmpty: true });
    } else this.setState({ isRefreshTokenEmpty: false });
  }

  redirectToLogin() {
    if (this.state.isRefreshTokenEmpty) {
      return <Redirect push={true} to="/login" />;
    }

    return <Redirect push={true} to="/cabinet" />;
  }

  render() {
    this.handleTokenRefresh();

    return (
      <div className="main-content">
        <Router>
          {this.redirectToLogin()}
          <Route path="/" render={this.header} />
          <Route
            exact={true}
            path="/login"
            render={this.signInPopup}
          />
          <Route path="/cabinet" component={ContentBar} />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state: IProps<IInitialState>) => state;

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  {
    signInAction,
    codeCheckAction,
  },
  dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
