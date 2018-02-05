/**
 *
 * ShortAnswer
 *
 */
import 'mathquill/build/mathquill.js';
import 'mathquill/build/mathquill.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';


import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectShortAnswer from './selectors';
import reducer from './reducer';
import saga from './saga';
import MathQuillDisplay from './MathQuillDisplay';


const MQ = window.MathQuill.getInterface(2);

export class ShortAnswer extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      type: 'MATH',
      content: [],

    };


  }
  componentDidMount() {
    this.mathFieldSpan = document.getElementsByClassName('math-field')[0];
    this.mathField = MQ.MathField(this.mathFieldSpan, {
      spaceBehavesLikeTab: true,
    });


  }

  componentWillUnmount() {

  }

  onAddMath = ()=> {
      var mathContent = [{ content: this.mathField.latex() }];
      var newInputs = [...this.state.content, ...mathContent];
      this.setState({ content: newInputs });
      this.mathField.latex('');



  }

  onDeleteMath = (content)=> (event)=>{
    var elementPos = this.state.content.map(function(x) {return x.content; }).indexOf(content);
    var objectFound = this.state.content[elementPos];

    let mathContent = this.state.content;
    this.setState({ content: [...mathContent] })



  }

  displayMath(inputs) {

    var currentSteps = inputs.map((input, index) => (
      <div ref={(step)=>{this.newStep = step }} key={index}>
         <MathQuillDisplay content={input.content} onDelete={this.onDeleteMath(input.content)} index={index} />
      </div>
   ));

   return currentSteps;

  }

  render() {
    console.log(this.state)
    return (
      <div>
      <br/>
      <br/>
        <Card>
          {this.displayMath(this.state.content)}
          <br />
          Type math here: <span className="math-field" style={{width: 500, marginRight: 30}} />
          <Button raised onClick={this.onAddMath.bind(this)}>
           +
          </Button>
          <CardActions>
          <button onClick={() => this.mathField.write('\\frac{d}{dx}\\left(\\right)')}>frac d</button>
          <button onClick={() => this.mathField.write('\\lim_{\\left(\\right)\\to\\left(\\right)}\\left(\\right)')}>limit</button>
          <button onClick={() => this.mathField.write('\\infty')}>infinity</button>
          <button onClick={() => this.mathField.write('\\sqrt{}')}>sq root</button>
          <button onClick={() => this.mathField.write('\\log\\left(\\right)')}>log x</button>
          <button onClick={() => this.mathField.write('\\ln\\left(\\right)')}> inverselog x</button>
          <button onClick={() => this.mathField.write('\\sin\\left(\\right)')}>sin</button>
          <button onClick={() => this.mathField.write('\\cos\\left(\\right)')}>cos</button>
          <button onClick={() => this.mathField.write('\\tan\\left(\\right)')}>tan</button>
          </CardActions>
        </Card>
      </div>
    );
  }
}


ShortAnswer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  shortanswer: makeSelectShortAnswer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'shortAnswer', reducer });
const withSaga = injectSaga({ key: 'shortAnswer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ShortAnswer);
