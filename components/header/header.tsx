import * as React from 'react';
import logo from '../../assets/images/logo/logo.png';

import './style/header.sass';

export default class Header extends React.Component {

  render() {
    return (
      <header className="header">
        <div className="main-header">
          <div className="burger-menu" />
          <div className="logo">
            <img className="logo-img" src={logo} alt="logo yavir-2000"/>
          </div>
          <div className="header-search">
            <input
              type="search"
              className="search"
              id="search"
              spellCheck={true}
            />
            <button className="search-btn" id="searchBtn">Search</button>
          </div>
          <select name="user-select" id="userSelect">
            <option value="1">Counterparty 1</option>
            <option value="2">Counterparty 2</option>
            <option value="3">Counterparty 3</option>
          </select>
          <div className="user-cart"><button>Cart</button></div>

        </div>
      </header>
    );
  }
}
