import React from 'react';
import autobind from 'autobind-decorator';

@autobind
class NoteSummary extends React.Component {

    sendDeleteNote() {
        this.props.deleteNote(this.props.details);
    }

    sendCurrentNote() {
        console.log(this.props);
        console.log("hit the function");
        this.props.setCurrentNote(this.props.details);
    }
    render() {
      var details = this.props.details;
        return (
            <li>
                <div className="note-summary" key={key}>
                     {details.name}
                <button onClick={this.props.deleteNote.bind(null, key)}>x</button>
                <button onClick={this.sendCurrentNote}>o</button>
                </div>
            </li>
        )
    }

}

export default NoteSummary;