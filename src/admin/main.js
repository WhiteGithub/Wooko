import React, { Component } from 'react';

import client from '../client';
import HeaderBar from './header_bar';
import Statistics from './statistics';

import {browserHistory} from 'react-router';

export default class Main extends Component {

  constructor(props) {
    super(props);

    // is logged in as administrator?
    if (!client.isLoggedInAsAdministrator()) {
      browserHistory.push('/admin/login');
    }
  }

  render() {
    if (!client.isLoggedInAsAdministrator())
      return null;

    return (
      <div className="container">
        <HeaderBar />
        <Statistics style={{alignSelf:'start'}} />
      </div>
    );
  }

}
