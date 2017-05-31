/**
  * @author Weizhe Liang git:  riotpiaole
  * React click and drag and drop file wrapper
  * on use wrap as <FileDragger /> the current div component is
  * draggable and droppable
  *
  * additional features
  * 1. buttonBrowse
  *    submit a button component for the wrapper buttonView props, it will automatically
  *    generate a callback function to trigger browse
  *    ```javascript
  *       render(){
  *        return (
  *          <FileDragger  buttonView={<button />}/>
  *        )
  *       }
  *    ```
  * 2. div clickable
  *    setting wrapper button into true will set the div full
  *    triggerable browse event
  *    ```javascript
  *       render(){
  *        return (
  *          <FileDragger  button={true}}/>
  *        )
  *       }
  *    ```
  */


import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class FileDragger extends Component{
  constructor(props){
    super(props);
    this.state={
      supporting: false,
      dragger:false,
      // clickable:props.button ? true :false
      clickable: true
    };
    this.button = props.buttonView ? props.buttonView : null

    // giving button the click browse property
    if(this.button){
      this.button.onClick=this._onClick.bind(this)
    }
  }
  // before rendering cycle check browser is supporting drag and drop
  componentWillMount(){
    //checking the browser support drag and drop feature
    this.checkClickable();
  }

  render(props){
    return(
      <div style={{borderStyle:this.state.dragger ? 'dashed':'none'}}
        onDragOver={this._onDragOver.bind(this)}
        onDragLeave={this._onDragLeave.bind(this)}
        onDrop={this._onDrop.bind(this)}
        onClick={this.state.clickable ? this._onClick.bind(this):null}
      >
        <input ref="input" type="file"  style={{visibility: 'hidden'}}/>
        <div>{this.button}</div>
        Click Me
      </div>
    )
  }

  /**
    * @param none @return none
    * creating a div Element to check drag  selection functions
    * exist in the div dom
    */
  checkClickable(){
    let div= document.createElement('div');
    let support = ('draggable' in div) || ('ondragstart' in div  && 'ondrop' in div)
    let data= 'FormData' in window; let readable='FileReader' in window;
    let result=(support && data) &&  readable;
    this.setState({supporting:result})
  }

  /**
    * @param e @return none
    * feature life cycle over stage 1
    * react-dom manually fire a event E such that
    * trigger state changes dash line
    */
  _onDragOver(e){
    e.preventDefault();
    this.setState({dragger:true})
  }

  /**
    * @param e @return none
    * feature life cycle over stage 2
    * trigger drop state change dash line
    */

  _onDragLeave(e){
    this.setState({dragger:false})
  }

  /**
    * @param e @return none
    * feature life cycle over stage 3
    * trigger dropping file on refs.input.files
    */
  _onDrop(e){
    e.preventDefault();
    this.setState({dragger:false})
  }

  /**
    * @param e @return none
    * feature clickable that trigger a event
    * enable browse feature
    */
  _onClick(e){
      ReactDOM.findDOMNode(this.refs.input).click();
  }

  /**
    * @param callbackFunc @return none
    */
  fileTransfer(callBack){
    if(!callBack || typeof callBack != 'function')
      return new Error("None function Callback")

  }
}
