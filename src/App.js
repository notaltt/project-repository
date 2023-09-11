import './App.css';
import Panel from "./components/Panel";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Files from "./components/Files"
import Team from "./components/Team"
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
              <Route path="project-repository/dashboard" element={<Dashboard/>}>
              </Route>
              <Route path="project-repository/files" element={<Files/>}>
              </Route>
              <Route path="project-repository/team" element={<Team/>}>
              </Route>
            </Routes>
          </div>
      </div>
    </Router>
  );
}

export default App;
