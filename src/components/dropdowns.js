import React, { Component } from 'react';

import server from '../server';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import './styles/dropdowns.css';

export class UniversityDropdown extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    server.getUniversities(this._getUniversitiesSuccessCallback.bind(this));
  }

  render() {
    return (
      <SelectField
        floatingLabelText={this.state.universities? "Select University" : "Select University (loading)"}
        disabled={this.state.universities? false : true}
        value={this.state.value}
        onChange={this._onChange.bind(this)}>
        {
          this.state.universities && this.state.universities.map((row, index) => {
            return (
              <MenuItem key={index} value={row} primaryText={row.name} />
            );
          })
        }
      </SelectField>
    );
  }

  _getUniversitiesSuccessCallback(status, response) {
    this.setState({universities:response.universities});
  }

  _onChange(event, index, value) {
    this.setState({value:value});
    this.props.onChange && this.props.onChange(event, index, value);
  }

}

export class ProgramDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.universityID && server.getPrograms(this.props.universityID, this._getProgramsSuccessCallback.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    nextProps.universityID && this.props.universityID != nextProps.universityID && server.getPrograms(nextProps.universityID, this._getProgramsSuccessCallback.bind(this));
  }

  render() {
    return (
      <SelectField
        floatingLabelText={this.state.programs? "Select Program" : "Select Program (loading)"}
        disabled={this.state.programs? false : true}
        value={this.state.value}
        onChange={this._onChange.bind(this)}>
        {
          this.state.programs && this.state.programs.map((row, index) => {
            return (
              <MenuItem key={index} value={row} primaryText={row.name} />
            );
          })
        }
      </SelectField>
    );
  }

  _getProgramsSuccessCallback(status, response) {
    this.setState({programs:response.programs});
  }

  _onChange(event, index, value) {
    this.setState({value:value});
    this.props.onChange && this.props.onChange(event, index, value);
  }
}

// This component contains both university and program dropdow
export class UniProDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='uni_pro_dropdown_wrapper'>
        <UniversityDropdown
          onChange={this._onChangeUniversity.bind(this)} />
        <ProgramDropdown
          universityID={this.state.university_id}
          onChange={this.props.onChangeProgram} />
      </div>
    );
  }

  _onChangeUniversity(event, index, value) {
    this.setState({university_id:value.id});
    this.props.onChangeUniversity && this.props.onChangeUniversity(event, index, value);
  }
}
