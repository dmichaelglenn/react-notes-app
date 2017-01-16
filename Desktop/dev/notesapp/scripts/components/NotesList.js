import React from 'react';
import autobind from 'autobind-decorator';

@autobind
class NotesList extends React.Component {
    
    renderList(notes) {
        console.log(notes);
            return (
                <h1>hi</h1> 
            )
        
    }
    render() {
        // var noteIds = Object.keys(this.props.notes)
        return (
            // <div>{noteIds.map(this.renderList)}</div>
            <div>
                <div className="notes-list">i'm here</div>
                
            </div>

        )
    }
}

// NotesList.propTypes = {
//     notes: React.PropTypes.object.isRequired
// }

export default NotesList;