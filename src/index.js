import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

import injectTapEventPlugin from 'react-tap-event-plugin';

import './index.css';

// Needed by material-ui
injectTapEventPlugin();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
