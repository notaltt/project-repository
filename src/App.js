import logo from './logo.svg';
import './App.css';
import MyComponent from "./components/MyComponent"; 
import DarkPanel from "./components/DarkPanel"; 

function App() {
  return (
    <div className="App">
      <DarkPanel />
      <footer className="bg-gray-900 text-white p-4 sticky bottom-0">
        <MyComponent />
      </footer>
    </div>
  );
}

export default App;
