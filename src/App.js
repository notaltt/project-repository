import './App.css';
import Panel from "./components/Panel";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
          <div>
            <Routes>
              <Route path="/project-repository/" element={<Panel/>}>
              </Route>
              <Route path="project-repository/login" element={<Login/>}>
              </Route>
            </Routes>
          </div>
      </div>
    </Router>
  );
}

export default App;
