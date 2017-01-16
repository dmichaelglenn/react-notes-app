import React from 'react';
import autobind from 'autobind-decorator';

@autobind
class NoteSummary extends React.Component {

    sendDeleteNote(key) {
        console.log(this.props.index);
        this.props.deleteNote(this.props.index);
    }

    sendCurrentNote() {
        console.log(this.key);
        console.log(this.props);
        console.log("hit the function");
        this.props.setCurrentNote(this.props.details);
    }
    render(key) {
      var details = this.props.details;
        return (
            <li>
                <div className="note-summary">
                     {details.name}
                <button onClick={this.sendDeleteNote}>x</button>
                <button onClick={this.sendCurrentNote}>o</button>
                </div>
            </li>
        )
    }

}

export default NoteSummary;