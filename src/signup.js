import React, { Component } from 'react';
import server from './server';

import {UniversityDropdown} from './components/dropdowns';
import {
  FirstNameInput,
  LastNameInput
} from './components/text_inputs';
import popup_manager from './components/popup_manager';
import I18n from './i18n';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import {translate} from 'react-i18next';

import {
  SchoolEmailInput,
  PasswordInput,
  PasswordConfirmationInput,
} from './components/text_inputs';

import './styles/signup.css';

export default class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{width: '100%', width: 500, margin: 'auto'}}>
      <div className="container">
        <FirstNameInput
          inputRef={component => this._first_name_input = component}
          onChangeText={(text) => {
            this.setState({first_name:text});
          }}
          validCallback={() => {
            this.setState({first_name_valid:true});
          }}
          invalidCallback={() => {
            this.setState({first_name_valid:false});
          }} />
        <LastNameInput
          inputRef={component => this._last_name_input = component}
          onChangeText={(text) => {
            this.setState({last_name:text});
          }}
          validCallback={() => {
            this.setState({last_name_valid:true});
          }}
          invalidCallback={() => {
            this.setState({last_name_valid:false});
          }} />
        <UniversityDropdown
          onChangeUniversity={this._onChangeUniversity.bind(this)} />
        <SchoolEmailInput
          postfix={"@"+this.props.email_suffix}
          inputRef={component => this._email_input = component}
          onChangeText={(text) => {
            this.setState({email:text+'@'+this.props.email_suffix});
          }}
          validCallback={() => {
            this.setState({email_valid:true});
          }}
          invalidCallback={() => {
            this.setState({email_valid:false});
          }} />
        <PasswordInput
          inputRef={component => this._password_input = component}
          onChangeText={(text) => {
            this.setState({password:text});
          }}
          validCallback={() => {
            this.setState({password_valid:true});
          }}
          invalidCallback={() => {
            this.setState({password_valid:false});
          }} />
        <PasswordConfirmationInput
            inputRef={component => this._password_input = component}
            onChangeText={(text) => {
              this.setState({password:text});
            }}
            validCallback={() => {
              this.setState({password_valid:true});
            }}
            invalidCallback={() => {
              this.setState({password_valid:false});
            }} />

        <RaisedButton
          className="button"
          label="Sign Up"
          labelColor="#FFFFFF"
          backgroundColor="#CE3E3E"
          onTouchTap={this._onSubmit.bind(this)} />
      </div>
      </div>
    );
  }
  _onChangeUniversity(event, index, value) {
    this.setState({university_id:value.id, email_suffix:value.email_suffix});
  }

  _onSubmit(first_name, last_name, university_id, email, password, password_confirmation) {
    console.log('email: '+email);
    let data = {
      email:email,
      password:password,
      password_confirmation:password,
      first_name:this.state.first_name,
      last_name:this.state.last_name,
      university_id:this.state.university_id,
    };
    if ( this.state.first_name_valid && this.state.last_name_valid && this.state.university_id&& this.state.email_valid && this.state.password_valid) {
      this.props.onSubmit && this.props.onSubmit(this.state.first_name, this.state.last_name, this.state.university_id, this.state.email_suffix,
        this.state.email, this.state.password, this.state.password_confirmation);
    }
    else if (this.state.university_id) {
      // blur all text inputs before submitting to show error prompts
      this._first_name_input && this._first_name_input.blur();
      this._last_name_input && this._last_name_input.blur();
      this._email_input && this._email_input.blur();
      this._password_input && this._password_input.blur();
      this._password_confirmation && this._password_confirmation.blur();

      popup_manager.open('A', 1, {message:I18n.t('prompt.invalid_input')});
    }
    else {
      popup_manager.open('A', 1, {message:I18n.t('SIGNUP.uni_required')});
    }
    server.signup(data);
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
