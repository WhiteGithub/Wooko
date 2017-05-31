import React, { Component } from 'react';

import server from '../server';
import client from '../client';
import HeaderBar from './header_bar';

import {browserHistory} from 'react-router';
import {List, ListItem} from 'material-ui/List';
import Divider from  'material-ui/Divider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './styles/feedbacks.css';

export default class Feedbacks extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    // is logged in as administrator?
    if (!client.isLoggedInAsAdministrator()) {
      browserHistory.push('/admin/login');
    }
  }

  componentWillMount() {
    if (!client.isLoggedInAsAdministrator())
      return null;

    server.getFeedBacks(this._getFeedbackSuccessCallback.bind(this));
  }

  render() {
    if (!client.isLoggedInAsAdministrator())
      return null;

    return (
      <div className='container'>
        <HeaderBar />
        <div style={{marginLeft:'auto', marginRight:'auto', width:850}}>
          {
            this.state.feedbacks && this.state.feedbacks.map((row, index) => {
              return (
                <List key={index}>
                  <ListItem style={{backgroundColor:'#979797'}} primaryText={row.feedback_type.name} />
                  <ListItem secondaryText={row.user.last_name+" "+row.user.first_name+" ("+row.user.email+")"}/>
                  <ListItem secondaryText={row.user.university.name}/>
                  <ListItem secondaryText={row.description}/>
                  <Divider />
                </List>
              );
            })
          }
        </div>
      </div>
    );
  }

  _getFeedbackSuccessCallback(status, response) {
    this.setState({feedbacks:response.feedbacks});
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }
  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    }
  }

}
