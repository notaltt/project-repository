import './App.css';
import Panel from "./components/Panel";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
      <div className="App">
          <div>
            <Login/>
          </div>
      </div>
  );
}

export default App;