import React, { Component } from 'react';

import server from '../server';
import WookoTextInput from '../components/text_inputs';
import I18n from '../i18n';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {translate} from 'react-i18next';

const styles = require('./styles/login.styles');

import logo from '../../assets/imgs/logo.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this._dialog_actions = [
      <RaisedButton
        style={styles.button}
        label="OK"
        labelColor="#FFFFFF"
        backgroundColor="#CE3E3E"
        onTouchTap={this._handleClose.bind(this)} />
    ];
  }
  render() {
    return (
      <div style={styles.container}>
        <Paper style={styles.panel} zDepth={1}>
          <Paper style={styles.logo_wrapper} zDepth={1} circle={true}>
            <img src={logo} style={styles.logo} alt="logo" />
          </Paper>
          <p style={styles.title}>Sign In</p>
          <WookoTextInput
            style={styles.email_input}
            placeholder = {I18n.t('placeholder.email')}
            onChangeText = {(email) => this.setState({email:email})}
            value = {this.state.email} />
          <WookoTextInput
            style={styles.password_input}
            placeholder = {I18n.t('placeholder.password')}
            onChangeText = {(password) => this.setState({password:password})}
            value = {this.state.password}
            type='password' />
          <RaisedButton
            style={styles.button}
            label="Sign In"
            labelColor="#FFFFFF"
            backgroundColor="#CE3E3E"
            onTouchTap={this._login.bind(this)} />
        </Paper>
        <Dialog
          actions={this._dialog_actions}
          modal={false}
          open={this.state.shouldOpenDialog}
          onRequestClose={this._handleClose}>
          {this.state.dialogText}
        </Dialog>
      </div>
    );
  }

  _login() {
    if (this.state.email && this.state.password) {
      server.loginAdmin(this.state.email, this.state.password, this._loginFailCallback.bind(this));
    }
  }
  _loginFailCallback(status, response) {
    this._handleOpen("The email or password is incorrect");
  }

  _handleOpen(text) {
    this.setState({shouldOpenDialog:true, dialogText:text});
  };
  _handleClose() {
    this.setState({shouldOpenDialog:false, dialogText:""});
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }
  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    }
  }
}

export default translate('common')(Login);
