import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import History from './pages/History';
import Statistics from './pages/Statistics';
import Navbar from "./components/Navbar";
import Support from "./pages/Support";
import RobotControl from "./pages/RobotControl";

import io from 'socket.io-client'

// const socket = io.connect('http://0.0.0.0:5000')
const socket = io.connect('https://api-devo-docker.herokuapp.com/')


function App() {
  return (
    <Router>

      <Routes>
        <Route path='/HIVE_Operator/' exact element={<Home socket={socket} />} />
        <Route path='/HIVE_Operator/history' element={<History />} />
        <Route path='/HIVE_Operator/statistics' element={<Statistics />} />
        <Route path='/HIVE_Operator/support' element={<Support />} />
        <Route path='/HIVE_Operator/robotControl' element={<RobotControl socket={socket} />} />
        {/* <Route path='/sign-up' element={<SignUp />} /> */}
      </Routes>

    </Router>
  );
}

export default App;
