import './App.css';
import Panel from "./components/Panel";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Files from "./components/Files"
import Team from "./components/Team"
import Register from "./components/Register"
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContextProvider } from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const App = () =>{
  return (
    <Router>
        <AuthContextProvider>
            <Routes>
            <Route path="/login" element={<Login/>}>
              </Route>
              <Route path="/" element={<Panel/>}>
              </Route>
            </Routes>
            <ProtectedRoute path="/dashboard" element={<Dashboard/>}>
              </ProtectedRoute>
              <ProtectedRoute path="/files" element={<Files/>}>
              </ProtectedRoute>
              <ProtectedRoute path="/team" element={<Team/>}>
              </ProtectedRoute>
              <ProtectedRoute path="/register" element={<Register/>}>
              </ProtectedRoute>
        </AuthContextProvider>
          
    </Router>
  );
}

export default App;
