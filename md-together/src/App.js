import './App.css';
import EditorComponent from './components/EditorComponent';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <EditorComponent />
      <FooterComponent />
    </div>
  );
}

export default App;
