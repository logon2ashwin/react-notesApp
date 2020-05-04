import React from 'react';
import './CreateNote.scss';

const CreateNote = props => {
  return (
    <div className='create-note'>
      <form className='note-form-container'>
        <div className='note-title-holder'>
          <input className='note-title-input' type='text' name='name' placeholder="Title" />
        </div>
        <div className='note-body-holder'>
          <textarea className='note-text-area' name='notes' placeholder="Notes"></textarea>
        </div>
        <div className="note-button-grid">
          <div className="note-button-holder">
            <button>Save</button>
            <button>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
