import React, { Component } from 'react';

import server from '../server';
import client from '../client';
import HeaderBar from './header_bar';

import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn}from 'material-ui/Table';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';

import './styles/course_adding_requests.css';

export default class CourseAddingRequests extends Component {

  constructor(props){
    super(props);
    this.state={
      toggle:false,
      approve:true,
      temp: null,
      idsHandled: []
    }

    // is logged in as administrator?
    if (!client.isLoggedInAsAdministrator()) {
      browserHistory.push('/admin/login');
    }
  }

  componentWillMount() {
    if (!client.isLoggedInAsAdministrator())
      return null;

    server.getCourseAddingRequests(this._getCourseAddingRequestsSuccessCallback.bind(this), this._getCourseAddingRequestsFailCallback.bind(this));
  }

  render() {
    if (!client.isLoggedInAsAdministrator())
      return null;

    let actions=[
      <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={this._handleClose.bind(this)}
            />,
      <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this._approve.bind(this)}
            />,
    ];

    return (
      <div className="container">
        <HeaderBar />
        <Table
          fixedHeader={true}
          fixedFooter={true}
          height={"400px"}
          selectable={false}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn tooltip="Code">Code</TableHeaderColumn>
              <TableHeaderColumn tooltip="Program">Program</TableHeaderColumn>
              <TableHeaderColumn tooltip="Univsersity">Code</TableHeaderColumn>
              <TableHeaderColumn tooltip="Option">Option</TableHeaderColumn>
            </TableRow>
          </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              showRowHover={true}
              stripedRows={true}
              >
              {
                this.state.course_adding_requests && this.state.course_adding_requests.map((row, index) => {
                  if (this.state.idsHandled.includes(row.id)) {
                    return null;
                  } else {
                    return (
                      <TableRow key={index}>
                        <TableRowColumn>{row.code}</TableRowColumn>
                        <TableRowColumn>{row.program? row.program.name : null}</TableRowColumn>
                        <TableRowColumn>{row.university? row.university.name : null}</TableRowColumn>
                        <TableRowColumn>
                            <RaisedButton label="Approve" onTouchTap={this._popUpAccept.bind(this,row.id)}/>
                            <RaisedButton label="Delete" onTouchTap={this._popUpDelete.bind(this,row.id)}/>
                        </TableRowColumn>
                      </TableRow>
                    );
                  }
                })
              }
            </TableBody>
          <TableFooter>
            <TableRow>
              <TableHeaderColumn tooltip="Code">Code</TableHeaderColumn>
              <TableHeaderColumn tooltip="Program">Program</TableHeaderColumn>
              <TableHeaderColumn tooltip="Univsersity">Code</TableHeaderColumn>
              <TableHeaderColumn tooltip="Option">Option</TableHeaderColumn>
            </TableRow>
          </TableFooter>
        </Table>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.toggle}
          onRequestClose={this._handleClose.bind(this)}
          >
          Press Submit to perform action
        </Dialog>
      </div>
    );
  }

  _getCourseAddingRequestsSuccessCallback(status, response) {
    this.setState({course_adding_requests:response.course_adding_requests});
  }
  _getCourseAddingRequestsFailCallback(status, response) {
    if (status == 404) {
      return false;
    }

    return true;
  }

  _popUpAccept(id){
    this.setState({toggle:true});
    this.setState({temp:id});
    this.setState({approve: true});
  }
  _approveSuccessCallback(id, status, response) {
    let idsHandled = this.state.idsHandled;
    idsHandled.push(id);
    this.setState({idsHandled: idsHandled});
  }

  _popUpDelete(id){
    this.setState({toggle:true});
    this.setState({temp:id});
    this.setState({approve: false})
  }
  _deleteSuccessCallback(id, status, response) {
    let idsHandled = this.state.idsHandled;
    idsHandled.push(id);
    this.setState({idsHandled: idsHandled});
  }

  _approve(){
    if(this.state.approve){
      server.courseAddingAccepet(this.state.temp, this._approveSuccessCallback.bind(this, this.state.temp))
    }else{
      server.courseAddingDelete(this.state.temp, this._deleteSuccessCallback.bind(this, this.state.temp))
    }
    this._handleClose()
  }
  _handleClose(){
    this.setState({toggle:false});
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
