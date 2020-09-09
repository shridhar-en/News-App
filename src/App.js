import React from 'react';
import './App.css';
import ToDoApp from './To_Do_App';
import NewsApp from './newsApp';
import New from './New';



function App() {
  return (
    <div className="App">
      <h2>Todays News</h2>
      <NewsApp />
    </div>
  );
}

export default App;
