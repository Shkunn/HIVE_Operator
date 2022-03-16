import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import History from './pages/History';
import Statistics from './pages/Statistics';
import Navbar from "./components/Navbar";
import Support from "./pages/Support";
import RobotControl from "./pages/RobotControl";

function App() {
  return (
    <Router>

      <Navbar />

      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/history' element={<History />} />
        <Route path='/statistics' element={<Statistics />} />
        <Route path='/support' element={<Support />} />
        <Route path='/robotControl' element={<RobotControl />} />
        {/* <Route path='/sign-up' element={<SignUp />} /> */}
      </Routes>

    </Router>
  );
}

export default App;
