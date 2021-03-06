import React from "react";
import SvgProvider from "../../commons/scripts/SVGprovider";
import "./navbar.scss";

const NavBar = props => {
  return(
    <div className='todo-nav-bar'>
      <ul>
        <li className='search-box-container'>
          <div>
            <input className='search-box' type="text" placeholder="Search Notes"/>
            <SvgProvider icon='searchIcon' classProp='search-icon' />
          </div>
        </li>
        <li className='nav-button-container'>
          <div onClick={props.toggleCreateNote}>
            <SvgProvider icon='NewNote' classProp='search-icon' />
          </div>
          <div onClick={props.switchTheme}>
            { props.theme==="light" ? <SvgProvider icon='lightTheme' /> : <SvgProvider icon='darkTheme' /> }
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
