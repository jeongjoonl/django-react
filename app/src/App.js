import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import BBS from './components/BBS';

function App() {
  console.log("App Render");
  return (
    <div className="App">
      <header>
        <h1>Django-React Demo</h1>
      </header>

      <BrowserRouter>
        <BBS />
      </BrowserRouter>
    </div>
  );
}

export default App;