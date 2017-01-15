import React from 'react';
import { History } from 'react-router';
import h from '../helpers'

import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';

@autobind 
class LoginScreen extends React.Component {

//this will be refactored shortly to incorporate auth, so it's a temporary measure.
    goToNotebook(event) {
        //prevent default submit functionality
        event.preventDefault();
        //get data from input. Note that I assigned a 'ref' on the input tag, and it was added to the 'this.refs' object
        var bookID = this.refs.bookID.value;
        //transition from login to App. Note the use of the history mixin, and that i'm passing null as the first arguement as there's no state obj at this point. 
    this.history.pushState(null, '/book/' + bookID);
    }
    render() {
        return (
            <form className="login-panel" onSubmit={this.goToNotebook}>
                <h2>Please Enter Your Notebook Name:</h2>
                <input type="text" ref="bookID" defaultValue={h.getFunName()} required/>
                <input type="Submit" />
            </form>
        )
    }
}

//mixins seem to give us access within our classes to whatever methods we're 'mixing in'. So in this case, it's the react router history methods. the first value we pass reactMixin is the class in which to pass, the second (and third and so on) is the actual mixin
reactMixin.onClass(LoginScreen, History);
export default LoginScreen;