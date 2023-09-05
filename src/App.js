import './App.css';
import Panel from "./components/Panel";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
          <div>
            <Login/>
          </div>
      </div>
    </Router>
  );
}

export default App;
