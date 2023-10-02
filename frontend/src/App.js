import './App.css';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import ResponsePage from './components/ResponsePage';

function App() {
  
  return (
    <div className="App">
      <Homepage/>
    </div>
  );
}

export default App;
