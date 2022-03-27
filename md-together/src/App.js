import './App.css';
import EditorComponent from './components/EditorComponent';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';
// import { BrowserRouter, Route } from "react-router-dom";
import ReactSession from 'react-client-session/dist/ReactSession';


// the code is derived from "Theme Builder" blog by Tapas Adhikary
// https://css-tricks.com/theming-and-theme-switching-with-react-and-styled-components/
import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from './theme/GlobalStyles';
import WebFont from 'webfontloader';
import { useTheme } from './theme/useTheme';

const Container = styled.div`
  margin: 0 auto 0 auto;
`;


function App() {
  ReactSession.setStoreType('cookie');

  const {theme, themeLoaded, getFonts} = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    setSelectedTheme(theme);
   }, [themeLoaded]);

  // 4: Load all the fonts
  useEffect(() => {
    WebFont.load({
      google: {
        families: getFonts()
      }
    });
  });

  return (
    //<BrowserRouter>
    <div className="App">
      {themeLoaded && <ThemeProvider theme={ selectedTheme }>
          <GlobalStyles/>
          <Container style={{fontFamily: selectedTheme.font }}>
            <NavbarComponent />
            <EditorComponent />
            <FooterComponent />
          </Container>
        </ThemeProvider>
      }
      
    </div>
    //</BrowserRouter>
  );
}

export default App;
