import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import logo from '../assets/imgs/logo.png';
const server = require('./server');

import './styles/email_verification.css';

export default class EmailVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading'
    };
  }

  componentWillMount() {
    server.verify_email(this.props.location.query.token_id, this.props.location.query.token_key, this._verifyEmailSuccessCallback.bind(this), this._verifyEmailFailCallback.bind(this));
  }

  render() {
    switch (this.state.status) {
      case 'completed':
        return (
          <div className="container">
            <Paper className="panel" zDepth={1}>
              <Paper className="logo_wrapper" zDepth={1} circle={true}>
                <img src={logo} className="logo" alt="logo" />
              </Paper>
              <p className="title">Email Verification</p>
              <p className="message">{this.state.message}</p>
            </Paper>
          </div>
        );
      default:
        return null;
    }
  }

  _verifyEmailSuccessCallback(status, response) {
    this.setState({status:'completed', message:"Congratulations! Your have successfully verified your email."});
  }
  _verifyEmailFailCallback(status, response) {
    this.setState({status:'completed', message:"Sorry. Token is invalid or expired. We cannot verify your email."})
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
