import React, { Fragment, useState, useEffect } from "react";
import NavBar from "./components/Navbar/Navbar";
import NotesList from "./components/NotesList/NotesList";
import CreateNote from "./components/CreateNote/CreateNote";
import "./commons/scss/appStyles.scss";
import { CSSTransition } from "react-transition-group";
import apiProvider from "./commons/scripts/apiHelper";
import utils from "./commons/scripts/utils";
import config from "../config";

const HomeComponent = (props) => {
  const [theme, setTheme] = useState("dark");
  const [showCreateNote, setCreateNote] = useState(false);
  const [skip, setSkip] = useState(0);
  const [totalCount, setTotalCount] = useState(Infinity);
  const limit = 9;
  const [notes,setNotes] = useState(initializeDummyNotes(9));
  let getNotesEndpoint = `${config.development.host}${config.development.port}${config.api.getNotesList}`;

  let debounceOnscroll = utils.debounce(function(){
    console.log("debounced");
    if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      console.log("debounced api called");
      getNotes();
    }
  },50);
  window.onscroll = debounceOnscroll;

  useEffect(() => {
    getNotes();
  },[]);

  function initializeDummyNotes(count,isLoaded) {
    let placeholder = Array(count);
    placeholder.fill({isLoaded: !!isLoaded});
    return placeholder;
  }

  function mergeNewData(data,skip) {
    let noteClone = [...notes];
    let iteratorCount = 0;
    for (let i = skip; i < (skip + limit); i++) {
      noteClone[i] = Object.assign({}, noteClone[i], data[iteratorCount]);
      noteClone[i].isLoaded = true;
      iteratorCount < limit ?  iteratorCount++ : iteratorCount;
    }
    console.log(noteClone);
    return noteClone;
  }

  function getNotes() {
    if(skip >= totalCount) return;
    let urlWithParams = `${getNotesEndpoint}?skip=${skip}&limit=${limit}`;
    apiProvider.GET(urlWithParams).then(data => {
      setTotalCount(data.totalCount);
      let noteClone = mergeNewData(data.notes,skip);
      setNotes(noteClone);
      setSkip(prevState => prevState + limit);
    });
  }

  function toggleTheme() {
    let newTheme = theme === "dark" ? "light" : "dark";
    addTransition();
    document.body.setAttribute("data-theme",newTheme);
    setTheme(newTheme);
  }

  function addTransition() {
    document.body.classList.add("transition");
    window.setTimeout(()=> {
      document.body.classList.remove("transition");
    }, 1000);
  }

  function toggleCreateNotePopup() {
    setCreateNote(prevState => !prevState);
  }

  return (
    <Fragment>
      <NavBar theme={theme} switchTheme={toggleTheme} toggleCreateNote={toggleCreateNotePopup} />
      {notes.length && <NotesList notes={notes} setNotes={setNotes} />}
      <CSSTransition in={showCreateNote} timeout={200} classNames="fade" unmountOnExit>
        <CreateNote showCreatePopUp={showCreateNote} toggleCreateNote={toggleCreateNotePopup} />
      </CSSTransition>
    </Fragment>
  );
};

export default HomeComponent;
