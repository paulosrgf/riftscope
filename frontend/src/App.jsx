import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SummonerProfile from './pages/SummonerProfile';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="rs-app-shell">
        <Navbar />
        <main className="rs-app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/summoner/:gameName/:tagLine" element={<SummonerProfile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;