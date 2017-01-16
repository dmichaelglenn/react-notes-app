import React from 'react';
import autobind from 'autobind-decorator';

@autobind
class NoteSummary extends React.Component {

    render() {
      var details = this.props.details;
        return (
            <li>
                <div className="note-summary">
                     {details.name}
                <button onClick={this.props.deleteNote}>x</button>
                </div>
            </li>
        )
    }

}

export default NoteSummary;