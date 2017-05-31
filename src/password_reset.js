import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Dialog from 'material-ui/Dialog';
import {translate} from 'react-i18next';

import logo from '../assets/imgs/logo.png';
const server = require('./server');
import {PasswordInput, PasswordConfirmationInput} from './components/text_inputs';
import I18n from './i18n';
import popup_manager from './components/popup_manager';

const styles = require('./styles/password_reset.styles');

class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      password_confirmation: "",
      openDialog: false,
      dialogText: ""
    };
  }

  render() {
    const actions = [
      <RaisedButton
        style={styles.button}
        label="OK"
        labelColor="#FFFFFF"
        backgroundColor="#CE3E3E"
        onTouchTap={this._handleClose} />
    ];

    return (
      <div style={styles.container}>
        <Paper style={styles.panel} zDepth={1}>
          <Paper style={styles.logo_wrapper} zDepth={1} circle={true}>
            <img src={logo} style={styles.logo} alt="logo" />
          </Paper>
          <p style={styles.title}>Reset Password</p>

          <PasswordInput
            inputRef={component => this._password_input = component}
            style={styles.password_input}
            onChangeText = {(password) => {
              this.setState({password:password});
            }}
            validCallback={() => {
              this.setState({password_valid:true});
            }}
            invalidCallback={() => {
              this.setState({password_valid:false});
            }} />
          <PasswordConfirmationInput
            inputRef={component => this._password_confirmation_input = component}
            style={styles.password_confirmation_input}
            onChangeText = {(password_confirmation) => {
              this.setState({password_confirmation:password_confirmation});
            }}
            validCallback={() => {
              this.setState({password_confirmation_valid:true});
            }}
            invalidCallback={() => {
              this.setState({password_confirmation_valid:false});
            }}
            password={this.state.password} />
          <RaisedButton
            style={styles.button}
            label="Reset"
            labelColor="#FFFFFF"
            backgroundColor="#CE3E3E"
            onTouchTap={this._onReset.bind(this)} />
        </Paper>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this._handleClose}
        >
        {this.state.dialogText}
        </Dialog>
      </div>
    );
  }

  _onReset() {
    if ( this.state.password_valid && this.state.password_confirmation_valid) {
      server.reset_password(this.state.password, this.state.password_confirmation, this.props.location.query.token_id, this.props.location.query.token_key, this._resetPasswordSuccessCallback.bind(this), this._resetPasswordFailCallback.bind(this));
    }
    else {
      // blur all text inputs before submitting to show error prompts
      this._password_input && this._password_input.blur();
      this._password_confirmation_input && this._password_confirmation_input.blur();

      popup_manager.open('A', 1, {message:I18n.t('prompt.invalid_input')});
    }
  }

  _resetPasswordSuccessCallback(status, response) {
    this._handleOpen("Congratulations! You have successfully reset your password.");
  }
  _resetPasswordFailCallback(status, response) {
    this._handleOpen("Sorry. Token is invalid or expired. We cannot reset your password.");
  }

  _handleOpen = (text) => {
    this.setState({openDialog:true, dialogText:text});
  };
  _handleClose = () => {
    this.setState({openDialog:false, dialogText:""});
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

export default translate('common')(PasswordReset);
