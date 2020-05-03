import React, { Fragment, useState, useEffect } from 'react';
import NavBar from './components/Navbar/Navbar';
import NotesList from './components/NotesList/NotesList';
import './commons/scss/appStyles.scss';

const HomeComponent = (props) => {
  const [theme, setTheme] = useState('dark');
  // UseEffect(() => {
  //   Console.log('theme updated');
  // },[theme]);

  function toggleTheme() {
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    addTransition();
    document.body.setAttribute('data-theme',newTheme);
    setTheme(newTheme);
  }

  function addTransition() {
    document.body.classList.add('transition');
    window.setTimeout(()=> {
      document.body.classList.remove('transition');
    }, 1000);
  }

  return (
    <Fragment>
      <NavBar theme={theme} switchTheme={toggleTheme} />
      <NotesList />
    </Fragment>
  );
};

export default HomeComponent;
