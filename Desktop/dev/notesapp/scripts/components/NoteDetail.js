import React from 'react';
import autobind from 'autobind-decorator';


@autobind
class NoteDetail extends React.Component{

    createNote(event) {
        event.preventDefault();
        var d = new Date();
        var timestamp = d.getTime();
        var thisDate = d.toLocaleDateString();
        var thisTime = d.toLocaleTimeString();
        console.log(thisDate);
        var note = {
            name: this.refs.name.value,
            date: thisDate,
            time: thisTime,
            body: this.refs.body.value
        };
        console.log(note);
        this.props.addNote(note);
        // //update the state obj
        // this.state.notes['note-' + timestamp] = note;
        // //set the state obj. notice we're not changing the whole state object, but a specific obj. This is done for the sake of performance - the DOM only has to check/update one component instead of checking them all.
        // this.setState(this.state);
    }
        render() {
            return (
             <form className="note-detail" onSubmit={this.createNote}>
                <input type="text" className="note-title" ref="name"></input>
                <div className="note-deets">
                    <span className="note-date"></span>
                    <span className="note-time"></span>
                </div>
                <textarea className="note-body" ref="body"></textarea>
                <button type="submit">create note</button>
             </form>
        )
    }
}

export default NoteDetail;