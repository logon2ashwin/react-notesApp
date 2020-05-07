import React, { useState } from "react";
import "./CreateNote.scss";

const CreateNote = props => {
  return (
    <div className='create-note'>
      <div className='note-form-container'>
        <div className='note-title-holder'>
          <div className='note-input-with-label'>
            <input className='note-title-input' type='text' value={props.title} onChange={event => props.updateNote({title: event.target.value})} required/>
            <label className='note-title-label' >Title</label>
          </div>
        </div>
        <div className='note-body-holder'>
          <textarea className='note-text-area' name='notes' placeholder='Notes'  value={props.desc} onChange={event => props.updateNote({description: event.target.value})} ></textarea>
        </div>
        <div className='note-button-grid'>
          <div className='note-button-holder'>
            <button onClick={()=> props.addNote()}>Save</button>
            <button onClick={props.toggleCreateNote}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
