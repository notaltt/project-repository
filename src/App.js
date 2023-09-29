import './App.css';
import Panel from "./components/Panel";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Files from "./components/Files"
import Team from "./components/Team"
import Register from "./components/Register";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
          <div>
            <Routes>
              <Route path="/" element={<Panel/>}>
              </Route>
              <Route path="/login" element={<Login/>}>
              </Route>
              <Route path="/dashboard" element={<Dashboard/>}>
              </Route>
              <Route path="/files" element={<Files/>}>
              </Route>
              <Route path="/team" element={<Team/>}>
              </Route>
              <Route path="/register" element={<Register/>}>
              </Route>
            </Routes>
          </div>
      </div>
    </Router>
  );
}

export default App;
