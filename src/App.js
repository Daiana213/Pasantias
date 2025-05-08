
import React from 'react';
import Button from './components/Button';
import './App.css';

function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={handleClick}>Click Me</Button>
      </header>
    </div>
  );
}

export default App;
