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
  isLocalStorageEmpty: boolean;
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
      isLocalStorageEmpty: true,
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
    this.dataChange(e);
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
        handleCodeValidSubmit={getTokenRefresh}
      />
    );
  }

  componentDidMount() {
    const isToken = localStorage.getItem('access token');
    if (isToken == null) {
      this.setState({ isLocalStorageEmpty: true });
    } else this.setState({ isLocalStorageEmpty: false });
  }

  redirect() {
    if (this.state.isLocalStorageEmpty) {
      return <Redirect to="\:login" />;
    }
  }

  render() {
    console.log(this.state.isLocalStorageEmpty);
    this.redirect();
    return (
      <div className="main-content">
        <Router>
          <Route path="/" component={Header} />
          <Route
            path="/:login"
            render={this.signInPopup}
          />
          <Route path="/" component={ContentBar} />
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
