import React from 'react';
import autobind from 'autobind-decorator';

@autobind
class NoteSummary extends React.Component {

    render() {
      var details = this.props.details;
      var deleteNote = this.props.deleteNote.bind(null, this.props.index);
      var setCurrentNote = this.props.setCurrentNote.bind(null, this.props.index);
        return (
            <li>
                <div className="note-summary">
                     {details.title}
                <button onClick={deleteNote}>x</button>
                <button onClick={setCurrentNote}>o</button>
                </div>
            </li>
        )
    }

}

export default NoteSummary;