import React, { Component } from "react";
import RecInputForm from './RecInputForm';
import RecOutputForm from './RecOutputForm';
import './Rec.css'
const testRecResults = ['John123', 'Josh456', 'Emma789', 'Roman1000'];
class Recommendations extends Component {
  constructor(props) {
      super(props);
      this.state = { 
          DisplayInputForm: true,
          RecFriendList: [],
          //if true then display input form, else display output form 
      };
      this.onSubmitInputForm = this.onSubmitInputForm.bind(this);
      this.onSubmitOutputForm = this.onSubmitOutputForm.bind(this);
  }

  onSubmitInputForm(values) {
    //TODO: send values to the backend and get a list of recommended friends
    // Send to back-end: 
    // if()
    // TODO: Make sure this.props.username is passed down
    // {
    //     game: this.props.game,
    //     username: this.props.username,
    //     ranking: values.ranking,
    //     role: values.confirm,
    // }
    // get from back-end: 
    // {
    //     recFriend: a list of strings
    // }
    // TODO: modify below with recFriend
    console.log('recommendation input form values: ', values);
    this.setState({
        DisplayInputForm: false,
        RecFriendList: testRecResults,
    });
  }

  onSubmitOutputForm(values) {
    //param: values: an array of strings (names of friends added)
    //TODO: add newly selected friends
    // Send to back-end: 
    // {
    //     selectedFriends: values
    // }
    console.log('recommendation output form values: ', values);
    this.setState({
        DisplayInputForm: true,
    });
  }


  render() {
    //TODO: Replace this with results (a list of potential friends) from the advance function 
    
    return (
        <div className='f1'>
            {this.state.DisplayInputForm ? 
                <RecInputForm game={this.props.game} onSubmit={this.onSubmitInputForm}/> : 
                <RecOutputForm game={this.props.game} onSubmit={this.onSubmitOutputForm} recResults={this.state.RecFriendList}/>
            }
        </div>
    );
  }
}
export default Recommendations;
