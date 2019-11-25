import React, { Component } from "react";
import RecInputForm from './RecInputForm';
import RecOutputForm from './RecOutputForm';

class Recommendations extends Component {
  constructor(props) {
      super(props);
      this.state = { 
          DisplayInputForm: true, 
          //if true then display input form, else display output form 
      };
      this.onSubmitInputForm = this.onSubmitInputForm.bind(this);
      this.onSubmitOutputForm = this.onSubmitOutputForm.bind(this);
  }

  onSubmitInputForm(values) {
    console.log('recommendation input form values: ', values);
    this.setState({
        DisplayInputForm: false,
    });
  }

  onSubmitOutputForm(values) {
    //param: values: an array of strings (names of friends added)
    console.log('recommendation output form values: ', values);
    this.setState({
        DisplayInputForm: true,
    });
  }


  render() {
    //TODO: Replace this with results (a list of potential friends) from the advance function 
    const testRecResults = ['John123', 'Josh456', 'Emma789', 'Roman1000'];
    return (
        <div>
            {this.state.DisplayInputForm ? 
                <RecInputForm game={this.props.game} onSubmit={this.onSubmitInputForm}/> : 
                <RecOutputForm game={this.props.game} onSubmit={this.onSubmitOutputForm} recResults={testRecResults}/>
            }
        </div>
    );
  }
}
export default Recommendations;
