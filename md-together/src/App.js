import './App.css';
import EditorComponent from './components/EditorComponent';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';
import ReactSession from 'react-client-session/dist/ReactSession';


// the code is derived from "Theme Builder" blog by Tapas Adhikary
// https://css-tricks.com/theming-and-theme-switching-with-react-and-styled-components/
import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from './theme/GlobalStyles';
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
   }, [themeLoaded, theme]
  );

  return (
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
  );
}

export default App;
