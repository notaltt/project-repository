import './App.css';
import Panel from "./components/Panel";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Files from "./components/Files"
import Team from "./components/Team"
import Register from "./components/Register"
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContextProvider } from './context/AuthContext';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
          <div>
            <AuthContextProvider>
              <Routes>
                <Route path="/" element={<Panel/>}>
                </Route>
                <Route path="/register" element={<Register/>}>
                </Route>
                <Route path="/login" element={<Login/>}>
                </Route>
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}>
                </Route>
                <Route path="/files" element={<ProtectedRoute><Files/></ProtectedRoute>}>
                </Route>
                <Route path="/team" element={<ProtectedRoute><Team/></ProtectedRoute>}>
                </Route>
              </Routes>
            </AuthContextProvider>
          </div>
      </div>
    </Router>
  );
}

export default App;
