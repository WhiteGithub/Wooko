import React, { Component } from 'react';

import I18n from '../i18n';
import {translate} from 'react-i18next';

import {
  RadioButtonGroup,
  RadioButton
} from 'material-ui/RadioButton';

import './styles/radios.css';

export class GenderRadio extends Component {

  render() {
    return (
      <RadioButtonGroup
        {...this.props}
        className='gender_wrapper'>
        <RadioButton label="Male" value="male" />
        <RadioButton label="Female" value="female" />
        <RadioButton label="Other" />
      </RadioButtonGroup>
    );
  }

}
