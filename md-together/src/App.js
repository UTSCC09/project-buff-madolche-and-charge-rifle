import './App.css';
import EditorComponent from './components/EditorComponent';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';
// import { BrowserRouter, Route } from "react-router-dom";
import ReactSession from 'react-client-session/dist/ReactSession';

function App() {
  ReactSession.setStoreType('cookie');
  return (
    //<BrowserRouter>
    <div className="App">
      <NavbarComponent />
      <EditorComponent />
      <FooterComponent />
    </div>
    //</BrowserRouter>
  );
}

export default App;
