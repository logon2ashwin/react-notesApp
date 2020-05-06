import React, { useState } from "react";
import "./NotesList.scss";

const NotesList = props => {
  return (
    <div className="notes-container">
      { props.notes.length &&
        props.notes.map((note, index) => {
          return (
            <div key={index} className="app-notes">
              <h4 className={`notes-heading ${!note.isLoaded ? "background-loader" : ""}`}>{note.isLoaded ? note.title : ""}</h4>
              <p className={`notes-text ${!note.isLoaded ? "background-loader" : ""}`}>{ note.isLoaded ? note.description : ""}</p>
            </div>
          );
        })
      }
    </div>
  );
};



export default NotesList;
