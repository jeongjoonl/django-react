import React from 'react';
import BBS from './components/BBS';

function App() {
  console.log("App Render");
  return (
    <div className="App">
      <header>
        <h1>Django-React Demo</h1>
      </header>

      <BBS />
    </div>
  );
}

export default App;