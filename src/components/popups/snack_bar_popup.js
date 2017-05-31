import React, {Component} from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Snackbar from 'material-ui/Snackbar';

export default class SnackBarPopup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: ""
    };
  }

  render() {
    return (
      <Snackbar
        open={this.state.open}
        message={this.state.message}
        autoHideDuration={3000}
        onRequestClose={this._handleRequestClose.bind(this)} />
    );
  }

  _handleRequestClose() {
    this.setState({open: false});
  }

  open(params) {
    this.setState({open:true, message:params.message});
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
