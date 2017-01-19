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
            name: "New note",
            date: thisDate,
            time: thisTime,
            timestamp: timestamp,
            body: "Type your note here"
        };
        console.log(note);
        this.props.addNote(note);
        // //update the state obj
        // this.state.notes['note-' + timestamp] = note;
        // //set the state obj. notice we're not changing the whole state object, but a specific obj. This is done for the sake of performance - the DOM only has to check/update one component instead of checking them all.
        // this.setState(this.state);
    }

    sendUpdateNote(event, key) {
        event.preventDefault();
        var currentNote = this.props.currentNote;
        var updatedNote = {
            title: this.refs.name.value,
            body: this.refs.body.value,
            time: currentNote.time,
            timestamp: currentNote.timestamp,
            date: currentNote.date
        }
        // currentNote.body = this.refs.body.value;
        // currentNote.title = this.refs.name.value;
        // currentNote.update
        this.props.updateNote(updatedNote);
    }
        render(key) {
            var currentNote = this.props.currentNote;
            console.log(currentNote);

            if (currentNote.isDefault === true) {
                return (
                    <div>
                        <h1>please select a note</h1>
                        <button onClick={this.createNote}>New Note</button>
                    </div>
                )
            }
            return (
                <div className="note-detail">
                <button onClick={this.createNote}>New Note</button>
             <form onSubmit={this.updateNote}>
                <input type="text" className="note-title" ref="name" defaultValue={currentNote.title} onChange={this.sendUpdateNote}/>
                <div className="note-deets">
                    <span className="note-date"></span>
                    <span className="note-time"></span>
                </div>
                <textarea className="note-body" ref="body" defaultValue={currentNote.body} onChange={this.sendUpdateNote}></textarea>
                <button type="submit">create note</button>
             </form>
            </div>
        )
    }
}

export default NoteDetail;