import React, { Component } from 'react';

import FileDragger from './components/file_dragger';

import './styles/component_hall.css';

export default class ComponentHall extends Component {
  render() {
    return (
      <div>
        <div className='wrapper'>
          <div className='title_wrapper'>
            <h2>File Dragger</h2>
          </div>
          <div>
            <FileDragger />
          </div>
          <div className='footer_wrapper'>
            <p>contributors: <font style={{fontStyle:'italic'}}>Rock</font></p>
          </div>
        </div>
      </div>
    );
  }
}
