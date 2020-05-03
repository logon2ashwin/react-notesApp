import React, { Fragment } from 'react';


const SvgProvider = props => {
  function getSVG({icon, classProp}){
    switch (icon) {
      case 'searchIcon':
        return (
          <svg aria-hidden="true" className={classProp} width="18" height="18" fill="currentcolor">
            <path d="M18 16.5l-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5zM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0z"></path>
          </svg>
        );
        break;
      case 'darkTheme':
        return (
          <svg width="24" height="24" aria-hidden="true" fill="currentcolor" className={classProp}>
            <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path>
          </svg>
        );
        break;
      case 'lightTheme':
        return (
          <svg width="24" height="24" aria-hidden="true" fill="currentcolor" className={classProp}>
            <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12s-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"></path>
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
