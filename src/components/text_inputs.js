import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import I18n from '../i18n';
import {
  validateExistence,
  validateMinLength,
  validateMaxLength,
  validateEmailFormatPrefix,
  validatePasswordConfirmationMatch
} from '../validations';

import {translate} from 'react-i18next';

import './styles/text_inputs.css';

export default class WookoTextInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.value? this.props.value : "",
      error: false,
      err_msg: "",
      on_focus: false
    };
  }

  componentWillMount() {
    // initialize validity
    // this requires that all validation functions work for this.props.value of null and undefined
    var message = this._validateAndReturnMessage(this.state.text);
    if (message) { // error happens
      // call invalid callback
      if (this.props.invalidCallback)
        this.props.invalidCallback();
    }
    else { // error did not happend
      // call valid callback
      if (this.props.validCallback)
        this.props.validCallback();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value != nextProps.value) {
      this.setState({text:nextProps.value}, this._onChangeText.bind(this, nextProps.value));
    }
  }

  render() {
    return (
      <div className='wrapper'>
        <div className={'input_wrapper ' + this._decideStyle()}>
          {this.props.prefix && (this.state.on_focus || this.state.text)
          ? <p className={'pre_post_fix ' + this._decidePrePostFixFontColor()}>{this.props.prefix}</p>
          : null
          }
          <input
            type='text'
            {...this.props}
            ref={component => this._input = component}
            onChange={(event) => {
              this._onChangeText(event.target.value);
              this.props.onChangeText && this.props.onChangeText(event.target.value);
            }}
            onFocus={() => {
              this._onFocus();
              this.props.onFocus && this.props.onFocus();
            }}
            onBlur={this._onBlur.bind(this)} />
          {this.props.postfix && (this.state.on_focus || this.state.text)
          ? <p className={'pre_post_fix ' + this._decidePrePostFixFontColor()}>{this.props.postfix}</p>
          : null
          }
        </div>
        <div className='err_msg_wrapper'><p className='err_msg'>{this.state.err_msg}</p></div>
      </div>
    );
  }

  // validate text whenever it changes
  // it can only disable the error state but can not enable the error state
  _onChangeText(text) {
    this.setState({text:text});
    var message = this._validateAndReturnMessage(text);
    if (message) { // error happends
      this._updateErrMsg(message);
      // call invalid callback
      if (this.props.invalidCallback)
        this.props.invalidCallback();
    }
    else { // error did not happend
      this._disableErrorState();
      // call valid callback
      if (this.props.validCallback) {
        this.props.validCallback();
      }
    }
  }

  // validate text
  // return the error message or null if it passes all validations
  _validateAndReturnMessage(text) {
    if (this.props.validations) {
      var validations = this.props.validations;
      for (let i = 0; i < validations.length; i++) {
        var message = validations[i](text);
        if (message)
          return message;
      }
    }
    return null;
  }

  _updateErrMsg(err_msg) {
    if (this.state.error)
      this.setState({err_msg:err_msg});
  }

  _enableErrorState(err_msg) {
    this.setState({error:true, err_msg:err_msg});
  }
  _disableErrorState() {
    this.setState({error:false, err_msg:""});
  }

  _onFocus() {
    this.setState({on_focus:true});
  }
  // _onBlur changes the state on_focus to false and decide if the text is invalid
  _onBlur() {
    this.setState({on_focus:false});
    var message = this._validateAndReturnMessage(this.state.text);
    if (message) { // error happens
      this._enableErrorState(message);
      // call invalid callback
      if (this.props.invalidCallback)
        this.props.invalidCallback();
    } else { // error did not happen
      // call valid callback
      if (this.props.validCallback)
        this.props.validCallback();
    }
  }

  blur() {
    this._input.blur();
    this._onBlur();
  }

  _decideStyle() {
    if (this.state.error)
      return 'input_wrapper_error';
    else if (this.state.on_focus)
      return 'input_wrapper_focus';
    else
      return 'input_wrapper_blur';
  }

  _decidePrePostFixFontColor() {
    if (this.state.text)
      return 'pre_post_fix_font_color_after';
    else
      return 'pre_post_fix_font_color_before';
  }

}

class FirstNameInput extends Component {
  render() {
    return (
      <WookoTextInput
        {...this.props}
        ref={this.props.inputRef}
        placeholder={I18n.t('placeholder.first_name')}
        validations={[validateExistence, (first_name) => { return validateMaxLength(first_name, 255) }]} />
    );
  }
}
const FirstNameInputExport = translate('common')(FirstNameInput);
export {FirstNameInputExport as FirstNameInput};

class LastNameInput extends Component {
  render() {
    return (
      <WookoTextInput
        {...this.props}
        ref={this.props.inputRef}
        placeholder={I18n.t('placeholder.last_name')}
        validations={[validateExistence, (last_name) => { return validateMaxLength(last_name, 255) }]} />
    );
  }
}
const LastNameInputExport = translate('common')(LastNameInput);
export {LastNameInputExport as LastNameInput};

class SchoolEmailInput extends Component {
  render() {
    return (
      <WookoTextInput
        {...this.props}
        ref = {this.props.inputRef}
        placeholder = {I18n.t('placeholder.school_email')}
        validations = {[validateExistence, validateEmailFormatPrefix, (school_email) => { return validateMaxLength(school_email, 200) }]} />
    );
  }
}
const SchoolEmailInputExport = translate('common')(SchoolEmailInput);
export {SchoolEmailInputExport as SchoolEmailInput};

class PasswordInput extends Component {
  render() {
    return (
      <WookoTextInput
        {...this.props}
        ref = {this.props.inputRef}
        placeholder = {I18n.t('placeholder.password')}
        validations = {[validateExistence, (password) => { return validateMinLength(password, 6) }, (password) => { return validateMaxLength(password, 255) }]}
        type='password' />
    );
  }
}
const PasswordInputExport = translate('common')(PasswordInput);
export {PasswordInputExport as PasswordInput};

class PasswordConfirmationInput extends Component {
  render() {
    return (
      <WookoTextInput
        {...this.props}
        ref = {this.props.inputRef}
        placeholder = {I18n.t('placeholder.password_confirmation')}
        validations = {[validateExistence, (password_confirmation) => { return validatePasswordConfirmationMatch(password_confirmation, this.props.password) }]}
        type='password' />
    );
  }
}
const PasswordConfirmationInputExport = translate('common')(PasswordConfirmationInput);
export {PasswordConfirmationInputExport as PasswordConfirmationInput};
