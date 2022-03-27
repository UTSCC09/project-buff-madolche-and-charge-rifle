import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// the code is derived from "Theme Builder" blog by Tapas Adhikary
// https://css-tricks.com/theming-and-theme-switching-with-react-and-styled-components/
import * as themes from './theme/schema.json';
import { setToLS } from './utils/storage';

const Index = () => {
  setToLS('all-themes', themes.default);
  // console.log(themes.default);
  return (
    <App />
  )
}

ReactDOM.render(
  //<React.StrictMode>
    // <App />
  //</React.StrictMode>,
  // ,
  <Index />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
