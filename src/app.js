import React, {Component} from 'react';

import Routes from './routes';
import i18n from './i18n';
import PopupContainer from './components/popups/popup_container';
import popup_manager from './components/popup_manager';

import { browserHistory } from 'react-router';
import { I18nextProvider } from 'react-i18next';

export default class App extends Component {

  render() {
    return (
      <I18nextProvider i18n={ i18n }>
        <div>
          <Routes history={browserHistory} />
          <PopupContainer />
        </div>
      </I18nextProvider>
    );
  }
}
