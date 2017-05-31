import React, {Component} from 'react';

import popup_manager from '../popup_manager';
import SnackBarPopup from './snack_bar_popup';
import DialogPopup from './dialog_popup';

export default class PopupContainer extends Component {

  componentDidMount() {
    popup_manager.registerPopupContainer(this);
  }

  render() {
    return (
      <div>
        <SnackBarPopup ref='snack_bar_popup' />
        <DialogPopup ref='dialog_popup' />
      </div>
    );
  }

  open(type, slot, params) {
    switch (type) {
      case 'A': // {message:'Show'}
        switch (slot) {
          case 1:
            this.refs.snack_bar_popup && this.refs.snack_bar_popup.open(params);
            break;
          case 2:
            this.refs.dialog_popup && this.refs.dialog_popup.open(type, params);
            break;
        }
        break;
      case 'B':
        switch (slot) {
          case 1:
            this.refs.dialog_popup && this.refs.dialog_popup.open(type, params);
            break;
        }
      default:
        // this.refs.snack_bar_popup &&
    }
  }

}
