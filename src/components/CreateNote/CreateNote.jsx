import React from 'react';
import './CreateNote.scss';

const CreateNote = props => {
  return (
    <div className={`create-note-overlay ${props.showCreatePopUp ? 'visible' : 'hidden' }`} onClick={props.toggleCreateNote}>
      <div className={`create-note ${props.showCreatePopUp ? 'opened' : 'closed'}`}> </div>
    </div>
  );
};

export default CreateNote;
