import React from 'react';

class NoteDetail extends React.Component{

        render() {
            return (
             <div className="note-detail">
                <div className="note-title"></div>
                <div className="note-deets">
                    <span className="note-date"></span>
                    <span className="note-time"></span>
                </div>
                <textarea className="note-body"></textarea>
             </div>
        )
    }
}

export default NoteDetail;