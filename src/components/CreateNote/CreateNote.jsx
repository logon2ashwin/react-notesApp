import React, { useState } from "react";
import "./CreateNote.scss";

const CreateNote = props => {
  const [title,setTitle] = useState("");
  return (
    <div className='create-note'>
      <form className='note-form-container'>
        <div className='note-title-holder'>
          <div className='note-input-with-label'>
            <input className='note-title-input' type='text' value={title} onChange={event => setTitle(event.target.value)} required/>
            <label className='note-title-label' >Title</label>
          </div>
        </div>
        <div className='note-body-holder'>
          <textarea className='note-text-area' name='notes' placeholder='Notes'></textarea>
        </div>
        <div className='note-button-grid'>
          <div className='note-button-holder'>
            <button>Save</button>
            <button onClick={props.toggleCreateNote}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
