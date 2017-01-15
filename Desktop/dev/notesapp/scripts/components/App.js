import React from 'react';

//imports
import Catalyst from 'react-catalyst';
import h from '../helpers';
import autobind from 'autobind-decorator';
import reactMixin from 'react-mixin';

 //firebase 
import Rebase from 're-base';
// var base = Rebase.createClass(NEW_FIREBASE_WILL_GO_HERE);

//import components
import Header from './Header';
import NoteDetail from './NoteDetail';
import NotesList from './NotesList';

@autobind
class App extends React.Component {
    //set initial state
    constructor() {
        super();

        this.state = {
            notes: {},
            currentNote: {}
        }
    }

    componentDidMount() {
        //what to do when the app component mounts to the browser
        //sync w firebase
        base.syncState(this.props.params.bookId + '/notes', {
            context: this,
            state: 'notes'
        });
        //check localstorage for notes
        var localStorageRef = localStorage.getItem('note-' + this.props.params.bookId);
         if(localStorageRef) {
            this.setState({
                currentNote: JSON.parse(localStorageRef)
            });
        }
    }
    componentWillUpdate(nextProps, nextState) { 
        //store the notes state in localstorage before it is saved to firebase
            localStorage.setItem('notes-' + this.props.params.bookId, JSON.stringify(nextState.notes));

    }
     addNote(note) {
        var timestamp = (new Date()).getTime();
        //update the state obj
        this.state.notes['note-' + timestamp] = note;
        //set the state obj. notice we're not changing the whole state object, but a specific obj. This is done for the sake of performance - the DOM only has to check/update one component instead of checking them all.
        this.setState({notes: this.state.notes})
    }

    deleteNote(key) {

        if(confirm("Are you sure you want to delete this note? Once it's gone, it's gone.")) {
            delete this.state.notes[key];
            this.setState({
                notes: this.state.notes
            });
        }
    }

    loadSamples() {
        this.setState({
            notes: require('../sample-notes')
        });
    }
    // renderSingleNote(key) {
    //     //each will recieve it's key so we can track/address the correct note, and it's grabbing the details for each rendered note from the state object (accessing it by key as well).
    //     return <Note key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
    // }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <NotesList/>
                    <NoteDetail/>
                </div>
            </div>
        )
    }
}

export default App;