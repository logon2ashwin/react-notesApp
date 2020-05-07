import React, { Fragment } from "react";


const SvgProvider = props => {
  function getSVG({icon, classProp}){
    switch (icon) {
      case "searchIcon":
        return (
          <svg aria-hidden="true" className={classProp} width="18" height="18" fill="currentcolor">
            <path d="M18 16.5l-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5zM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0z"></path>
          </svg>
        );
        break;
      case "darkTheme":
        return (
          <svg width="24" height="24" aria-hidden="true" fill="currentcolor" className={classProp}>
            <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path>
          </svg>
        );
        break;
      case "lightTheme":
        return (
          <svg width="24" height="24" aria-hidden="true" fill="currentcolor" className={classProp}>
            <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12s-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"></path>
          </svg>
        );
        break;
      case "NewNote":
        return (
          <svg width="24px" height="24px" aria-hidden="true" fill="currentcolor" className={classProp}>
            <path d="M8,21,2,22l1-6L16.414,2.586a2,2,0,0,1,2.828,0l2.172,2.172a2,2,0,0,1,0,2.828Z" ></path>
          </svg>
        );
        break;
      case "NotesEmpty":
        return(
          <svg viewBox="0 0 24 24" strokeWidth="2" fill="currentcolor" className={classProp}>
            <path d="M21,22H3a2,2,0,0,1-2-2V2H9l3,4H23V20A2,2,0,0,1,21,22Z"></path>
          </svg>
        );
        break;
      case "NoInternet":
        return(
          <svg className={classProp} fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" fill-rule="evenodd">
            </path>
          </svg>
        );
        break;
      default:
        return null;
    }
  }

  return(
    <Fragment>{getSVG(props)}</Fragment>
  );
};

export default SvgProvider;
