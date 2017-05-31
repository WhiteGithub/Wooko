import React, { Component } from 'react';

import server from '../server';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router';

export default class HeaderBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      is_drawer_opened: false
    };
  }

  render() {
    return (
      <AppBar
        title="Wooko Administration"
        style={{backgroundColor:'white'}}
        titleStyle={{color:'#000000', marginLeft:20, fontSize:20}}
        iconElementLeft={
          <IconButton
            iconStyle={{display: 'flex', alignItem:'center', height:28, width:35}}
            onTouchTap={this._openDrawer.bind(this)}
            >
            <img src={require('../../assets/imgs/logo.png')} alt="logo" />
          </IconButton>
        }
        iconElementRight={
          <IconButton
            iconStyle={{display: 'flex', alignItem:'center', height:28, width:35}}
            onTouchTap={this._logout.bind(this)}>
            <img src={require('../../assets/icons/logout.png')} alt="logout" />
          </IconButton>
        }>
        <Drawer style={{width:100}}
                docked={false}
                open={this.state.is_drawer_opened}
                onRequestChange={this._closeDrawer.bind(this)}>
          <MenuItem onTouchTap={this._navMain}>
            Home
          </MenuItem>
          <MenuItem onTouchTap={this._navCourseAddingRequests}>
            Course Request
          </MenuItem>
          <MenuItem onTouchTap={this._navFeedbacks}>
            Feed Backs
          </MenuItem>
        </Drawer>
      </AppBar>
    );
  }

  _logout() {
    server.logoutAdmin();
  }

  _openDrawer() {
    this.setState({is_drawer_opened:true});
  }
  _closeDrawer() {
    this.setState({is_drawer_opened:false});
  }

  _navMain() {
    browserHistory.push('/admin');
  }
  _navCourseAddingRequests() {
    browserHistory.push('/admin/course_adding_requests');
  }
  _navFeedbacks() {
    browserHistory.push('/admin/feedbacks');
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
