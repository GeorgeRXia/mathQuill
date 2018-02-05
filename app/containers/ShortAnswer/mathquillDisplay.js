import 'mathquill/build/mathquill.js';
import 'mathquill/build/mathquill.css';

import React, { Component } from 'react';
import Button from 'material-ui/Button';



export class MathQuillDisplay extends React.PureComponent {
  constructor(props){
    super(props)
    this.state ={
      display: true

    }
  }
  componentDidMount() {console.log(this.newStep)
    this.MQ = window.MathQuill.getInterface(2);
    // console.log(this.newStep)
    this.mathFieldDisplay = this.MQ.StaticMath(this.newStep);
    // console.log(this.newStep)

   // this.mathFieldDisplay.latex();
  }
  componentWillUpdate(nextProps, nextState) {


  }
  componentWillUnmount(){
    this.mathFieldDisplay.revert().html()
    console.log(this.mathFieldDisplay.revert().html())
    console.log(this.newStep)

  }
  deleteButton(){
    console.log(this.mathFieldDisplay.el());
    this.mathFieldDisplay.revert().html();
    // console.log("unmounted from mathquill")
    this.props.onDelete()
    this.setState({display: false})


  }
  render(){
    if(this.state.display){
      return(
        <div>
          <div ref={(step)=>{this.newStep = step }}> {this.props.content} </div>
          <button onClick={this.deleteButton.bind(this)}> Delete </button>
        </div>
      )

    }else{
      return null
    }
  }






}

export default MathQuillDisplay;
