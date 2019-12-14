import React, { useState} from 'react';
import './App.css';
import Counter from './Counter';
import CounterHooks from './CounterHooks.js';

export const ThemeContext = React.createContext();
function App() {
  const [theme, setTheme] = useState('red');
  return (
    <ThemeContext.Provider value={{ backgroundColor: theme }}>
      Counter
      <Counter initialCount={0}/>
      CounterHooks
      <CounterHooks initialCount={0} />
      <button onClick={() => setTheme(prevTheme => {
        return prevTheme === 'red' ? 'blue' : 'red'
      })}>toggle theme</button>
    </ThemeContext.Provider>

  );
}

export default App;
