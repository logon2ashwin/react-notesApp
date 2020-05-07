import React, { Fragment, useState, useEffect } from "react";
import NavBar from "./components/Navbar/Navbar";
import NotesList from "./components/NotesList/NotesList";
import CreateNote from "./components/CreateNote/CreateNote";
import "./commons/scss/appStyles.scss";
import { CSSTransition } from "react-transition-group";
import apiProvider from "./commons/scripts/apiHelper";
import utils from "./commons/scripts/utils";
import config from "../config";

const initializeDummyNotes = (count, object) => {
  let placeholder = Array(count);
  placeholder.fill(object);
  return placeholder;
};

const addTransition = () => {
  document.body.classList.add("transition");
  window.setTimeout(()=> {
    document.body.classList.remove("transition");
  }, 1000);
};

const HomeComponent = (props) => {
  const [theme, setTheme] = useState("dark");
  const [showCreateNote, setCreateNote] = useState(false);
  const [skip, setSkip] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [requestData, setRequestData] = useState({requestProgress: false, islastRequest: false, remainingCount: 0, lastReqProcessed: false});
  const limit = 9;
  const [notes,setNotes] = useState( initializeDummyNotes((totalCount > limit ? limit : totalCount), { isLoaded: false }));
  const notesEmptyObj = {
    isError: totalCount === 0,
    iconName: "NotesEmpty",
    errorMessage: "No notes added, Click add icon in Navbar to add new notes."
  };
  const [notesEmpty, setNotesEmpty] = useState(notesEmptyObj);
  const emptyNote = {
    title : "",
    description: ""
  };
  const [newNote, setNote] = useState(emptyNote);

  // Initializing Endpoint URL
  const getNotesEndpoint = `${config.development.host}${config.development.port}${config.api.getNotesList}`;


  let debounceOnscroll = utils.debounce(()=>{
    if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && !requestData.requestProgress && !requestData.lastReqProcessed) {
      if(requestData.islastRequest && requestData.remainingCount > 0 ) {
        setNotes(prevState => [...prevState, ...initializeDummyNotes(requestData.remainingCount, { isLoaded: false })]);
        getNotes(true);
        return;
      }
      setNotes(prevState => [...prevState, ...initializeDummyNotes(limit, { isLoaded: false })]);
      getNotes();
    }
  },50);
  window.onscroll = debounceOnscroll;

  useEffect(() => {
    if(totalCount > 0) {
      getNotes();
    }
  },[]);

  const mergeNewData = (data, skip, isLastReq) => {
    let noteClone = [...notes];
    let iteratorCount = 0;
    let localLimit = !!isLastReq ? requestData.remainingCount : limit;
    for (let i = skip; i < (skip + localLimit); i++) {
      noteClone[i] = Object.assign({}, noteClone[i], data[iteratorCount]);
      noteClone[i].isLoaded = true;
      iteratorCount < localLimit ?  iteratorCount++ : iteratorCount;
    }
    return noteClone;
  };

  const getNotes = (isLastReq) => {
    let urlWithParams = `${getNotesEndpoint}?skip=${skip}&limit=${!!isLastReq ? 0 : limit}`;
    setRequestData(Object.assign(requestData, {requestProgress: true}));
    apiProvider.GET(urlWithParams).then(data => {
      if(data.isError) {
        if(data.errorMessage.message) {
          setNotesEmpty({ errorMessage: data.errorMessage.message, isError: true, iconName: "NoInternet" });
        }
        return;
      }
      setTotalCount(data.totalCount);
      if(isLastReq) {
        setRequestData(Object.assign(requestData, {lastReqProcessed: true}));
      }
      else if((skip+limit) >= totalCount) {
        let remaining = Math.abs(totalCount - skip);
        isLastReq = true;
        setRequestData(Object.assign(requestData, {islastRequest: true, remainingCount: remaining}));
      }
      let noteClone = mergeNewData(data.notes, skip, isLastReq);
      setNotes(noteClone);
      !isLastReq ? setSkip(prevState => prevState + limit) : null;
      setRequestData(Object.assign(requestData, {requestProgress: false}));
    });
  };

  const toggleTheme = () => {
    let newTheme = theme === "dark" ? "light" : "dark";
    addTransition();
    document.body.setAttribute("data-theme",newTheme);
    setTheme(newTheme);
  };

  const toggleCreateNotePopup = () => {
    !showCreateNote ? document.body.classList.add("overlay-on") : document.body.classList.remove("overlay-on");
    setCreateNote(prevState => !prevState);
  };

  const createNote = () => {
    let newNoteClone = {...newNote, ...{isLoaded: true}};
    setNotes([...notes, newNoteClone]);
    setTotalCount(notes.length);
    setNotesEmpty({notesEmpty,...{isError:false}});
    setNote({newNote,...emptyNote});
    toggleCreateNotePopup();
  };

  const updateNewNote = (note) => {
    setNote({...newNote, ...note});
  };
  return (
    <Fragment>
      <NavBar theme={theme} switchTheme={toggleTheme} toggleCreateNote={toggleCreateNotePopup} />
      {showCreateNote && <div className="overlay"></div>}
      {<NotesList notes={notes} setNotes={setNotes} isError={notesEmpty.isError} errorIcon={notesEmpty.iconName} errorMessage={notesEmpty.errorMessage} />}
      <CSSTransition in={showCreateNote} timeout={200} classNames="fade" unmountOnExit>
        <CreateNote showCreatePopUp={showCreateNote} toggleCreateNote={toggleCreateNotePopup} addNote={createNote} title={newNote.title} desc={newNote.description} updateNote={updateNewNote}/>
      </CSSTransition>
    </Fragment>
  );
};

export default HomeComponent;
