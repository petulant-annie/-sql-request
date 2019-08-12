import * as React from 'react';
import logo from '../../assets/images/logo/logo.png';

import './style/header.sass';

interface IHeaderProps {
  handleClearLocalStorage: () => void;
}

export default class Header extends React.Component<IHeaderProps> {

  render() {
    return (
      <header className="header">
        <div className="main-header">
          <div className="burger-menu" />
          <div className="logo">
            <img className="logo-img" src={logo} alt="logo yavir-2000" />
          </div>
          <div className="header-search">
            <input
              type="search"
              className="search"
              id="search"
              spellCheck={true}
            />
            <button className="search-btn check-btn" id="searchBtn">Search</button>
          </div>
          <select name="user-select" id="userSelect" className="header-select check-btn">
            <option value="1">Contract 1</option>
            <option value="2">Contract 2</option>
            <option value="3">Contract 3</option>
          </select>
          <div className="user-cart">
            <button className="check-btn">Cart
            </button>
          </div>
          <div className="sign-out">
            <button
              className="check-btn"
              type="submit"
              onClick={this.props.handleClearLocalStorage}
            >
              Sign out
            </button>
          </div>

        </div>
      </header>
    );
  }
}
