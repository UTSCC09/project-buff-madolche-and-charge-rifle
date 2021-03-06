// the code is derived from "Theme Builder" blog by Tapas Adhikary
// https://css-tricks.com/theming-and-theme-switching-with-react-and-styled-components/

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.text} !important;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif !important;
    // transition: all 0.50s linear;
  }
  a {
    color: ${({ theme }) => theme.colors.link.text};
    cursor: pointer;
  }
  button.btn {
    background-color: ${({ theme }) => theme.colors.button.background};
    color: ${({ theme }) => theme.colors.button.text};
  }
  button.cancel {
    background-color: #ff0000;
    color: ${({ theme }) => theme.colors.button.text};
  }
  button:disabled {
    background-color: #ebebeb;
    color: #333333;
  }
  button {
    border: 0;
    display: inline-block;
    padding: 12px 24px;
    font-size: 14px;
    border-radius: 4px;
    margin-top: 5px;
    cursor: pointer;
    background-color: #1064EA;
    color: #FFFFFF;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif !important;
  }
  #footer_section {
    background-color: ${({ theme }) => theme.colors.footer};
  }
  #nav_bar {
    background-color: ${({ theme }) => theme.colors.navbar};
  }
  .save-button {
    background-color: ${({ theme }) => theme.colors.navbar} !important;
  }
  .MuiList-root {
    background-color: ${({ theme }) => theme.colors.other};
    border-radius: 3px;
    color: ${({ theme }) => theme.colors.text};
  }
  #userspace_modal {
    background: ${({ theme }) => theme.colors.other} !important;
  }
  .css-1et9cd0 {
    background: ${({ theme }) => theme.colors.other} !important;
  }
  .css-p3apin {
    background: ${({ theme }) => theme.colors.other} !important;
  }

`;