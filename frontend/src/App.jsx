import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SummonerProfile from './pages/SummonerProfile';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summoner/:gameName/:tagLine" element={<SummonerProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;