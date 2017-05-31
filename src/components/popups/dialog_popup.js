import React, {Component} from 'react';

import I18n from '../../i18n';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class DialogPopup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: null,
      message: "",
      actions: []
    };
  }

  render() {
    return (
      <Dialog
        title={this.state.title}
        actions={this.state.actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this._handleRequestClose.bind(this)}>
        {this.state.message}
      </Dialog>
    );
  }

  _handleRequestClose() {
    this.setState({open: false});
  }

  open(type, params) {
    switch (type) {
      case 'A':
        this.setState({open:true, title:null, message:params.message, actions:[
          <FlatButton
            label={I18n.t('BUTTON.ok')}
            primary={true}
            onTouchTap={this._handleRequestClose.bind(this)} />
        ]});
        break;
      case 'B':
        this.setState({open:true, title:null, message:params.message, onFirstButtonTouchTap:params.onTouchTap, actions:[
          <FlatButton
            label={I18n.t("BUTTON.cancel")}
            primary={true}
            onTouchTap={this._onFirstButtonTouchTap.bind(this)} />
        ]});
        break;
    }
  }

  _onFirstButtonTouchTap(will_close=true) {
    this.state.onFirstButtonTouchTap && this.state.onFirstButtonTouchTap();
    this._handleRequestClose();
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
