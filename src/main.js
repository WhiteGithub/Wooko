import React, { Component } from 'react';

import client from './client';
import server from './server';
import ComponentHall from './component_hall';

import {browserHistory} from 'react-router';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      on_drag_over: false
    };

    // is logged in as user?
    if (!client.isLoggedInAsUser()) {
      browserHistory.push('/login');
    }
  }

  render() {
    let style = {
      width: 200,
      height: 200,
      borderStyle: this.state.on_drag_over ? 'solid' : 'dashed'
    };

    return (
      <div>
        <ComponentHall />
      </div>
    );
  }

  _onDragOver(e) {
    e.preventDefault();
    this.setState({on_drag_over:true});
  }
  _onDragLeave(e) {
    this.setState({on_drag_over:false});
  }
  _onDrop(e) {
    e.preventDefault();
    console.log("drop");
  }

  _logout() {
    server.logout();
  }
}
