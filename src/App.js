
import './App.css';
import { useState } from 'react';

function App() {
  const [counter, setCounter] = useState(0)
  const incrementCounter = () => {
    setCounter(counter + 1);
  }
  return (
    <div className="App">
     <h1>project don</h1>
     <button onClick={() => incrementCounter()}>+</button>
      <h2>{counter}</h2>
    </div>
  );
}

export default App;
