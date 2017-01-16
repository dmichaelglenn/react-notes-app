import React from 'react';
import autobind from 'autobind-decorator';

@autobind
class NoteSummary extends React.Component {

    //deprecated methods 

    // sendDeleteNote(key) {
    //     console.log(this.props.index);
    //     this.props.deleteNote(this.props.index);
    // }

    // sendCurrentNote() {
    //     console.log(this.key);
    //     console.log(this.props);
    //     console.log("hit the function");
    //     this.props.setCurrentNote(this.props.details);
    // }
    render() {
      var details = this.props.details;
        return (
            <li>
                <div className="note-summary">
                     {details.name}
                <button onClick={this.props.deleteNote.bind(null, this.props.index)}>x</button>
                <button onClick={this.props.setCurrentNote.bind(null, this.props.index)}>o</button>
                </div>
            </li>
        )
    }

}

export default NoteSummary;