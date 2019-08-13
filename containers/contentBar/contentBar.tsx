import * as React from 'react';

import './style/contentBar.sass';

export default class ContentBar extends React.Component {

  render() {
    return(
      <div className="content-row">
        <a className="invoices content-row-item">Рахунки</a>
        <a className="orders content-row-item">Замовлення</a>
        <a className="content-row-item">Other1</a>
        <a className="content-row-item">Other2</a>
      </div>
    );
  }
}
