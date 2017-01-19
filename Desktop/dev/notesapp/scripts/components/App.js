import React from 'react';

//imports
import Catalyst from 'react-catalyst';
import h from '../helpers';
import autobind from 'autobind-decorator';
import reactMixin from 'react-mixin';

 //firebase 
import Rebase from 're-base';
var base = Rebase.createClass('https://notesapp-1b964.firebaseio.com/');

//import components
import Header from './Header';
import NoteDetail from './NoteDetail';
import NotesList from './NotesList';
import NoteSummary from './NoteSummary';

@autobind
class App extends React.Component {
    //set initial state
    constructor() {
        super();

        this.state = {
            notes: {},
            currentNote: {
                isDefault: true
            }
        } 
    }

    componentDidMount() {
        console.log(this);
        //what to do when the app component mounts to the browser
        //sync w firebase
        base.syncState(this.props.params.bookID + '/notes', {
            context: this,
            state: 'notes'
        });
        //check localstorage for notes
        var localStorageRef = localStorage.getItem('note-' + this.props.params.bookId);
         if(localStorageRef) {
            this.setState({
                notes: JSON.parse(localStorageRef)
            });
         }
    }
    componentWillUpdate(nextProps, nextState) { 
        //store the notes state in localstorage before it is saved to firebase
            localStorage.setItem('notes-' + this.props.params.bookId, JSON.stringify(nextState.notes));

    }
    addNote(note) {
        var timestamp = (new Date()).getTime();
        this.state.notes['note-' + timestamp] = note;
        this.setState({notes: this.state.notes});
        console.log(this.state.notes);
    }

    setCurrentNote(key){
        this.state.currentNote = this.state.notes[key];
        this.setState({
            currentNote: this.state.currentNote
        });
         console.log(this.state.currentNote);
    }

    updateNote(note) {
        if (note.isDefault !== true) {
            console.log(note);
            this.state.notes['note-' + note.timestamp] = note;
            this.setState({
                notes: this.state.notes
            })
        }
    }
    deleteNote(note) {
        console.log(note);
        if(confirm("Are you sure you want to delete this note? Once it's gone, it's gone.")) {
           this.state.notes[note] = null;
            this.setState({
                notes: this.state.notes
            });
        }
    }

    renderNote(key) {
        return <NoteSummary key={key} index={key} details={this.state.notes[key]} deleteNote={this.deleteNote} setCurrentNote={this.setCurrentNote}></NoteSummary>
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <Header />
                    <ul className="notes-list">{Object.keys(this.state.notes).map(this.renderNote)}</ul>
                    <NoteDetail addNote={this.addNote} updateNote={this.updateNote} currentNote={this.state.currentNote} notes={this.state.notes} />
                </div>
            </div>
        )
    }
}

export default App;