import Sidebar from './components/Sidebar';
import Home from './components/HomePage/Home';
import Login from './components/Login'
import Portfolio from './components/Portfolio';
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
        <div className="App">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/boxicons/2.1.4/css/boxicons.min.css" rel="stylesheet" type="text/css"></link>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" rel='stylesheet'></link>
            {/* <Home/> */}
            <Routes>
                <Route path="*" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
            {/* <Login/> */}
            {/* <Portfolio/> */}
        </div>
    </Router>
  );
}

export default App;
