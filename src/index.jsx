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
  const [requestData, setRequestData] = useState({requestProgress: false, islastRequest: false, remainingCount: 0, lastReqProcessed: false});
  const [notes,setNotes] = useState(initializeDummyNotes(limit));

  const limit = 6;
  let getNotesEndpoint = `${config.development.host}${config.development.port}${config.api.getNotesList}`;

  let debounceOnscroll = utils.debounce(function(){
    if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && !requestData.requestProgress && !requestData.lastReqProcessed) {
      if(requestData.islastRequest && requestData.remainingCount > 0 ) {
        setNotes(prevState => [...prevState, ...initializeDummyNotes(requestData.remainingCount)]);
        getNotes(true);
        return;
      }
      setNotes(prevState => [...prevState, ...initializeDummyNotes(limit)]);
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

  function mergeNewData(data, skip, isLastReq) {
    let noteClone = [...notes];
    let iteratorCount = 0;
    let localLimit = !!isLastReq ? requestData.remainingCount : limit;
    for (let i = skip; i < (skip + localLimit); i++) {
      noteClone[i] = Object.assign({}, noteClone[i], data[iteratorCount]);
      noteClone[i].isLoaded = true;
      iteratorCount < localLimit ?  iteratorCount++ : iteratorCount;
    }
    return noteClone;
  }

  function getNotes(isLastReq) {
    let urlWithParams = `${getNotesEndpoint}?skip=${skip}&limit=${!!isLastReq ? 0 : limit}`;
    setRequestData(Object.assign(requestData, {requestProgress: true}));
    apiProvider.GET(urlWithParams).then(data => {
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
