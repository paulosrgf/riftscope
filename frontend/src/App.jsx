import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SummonerProfile from "./pages/SummonerProfile";
import ValorantHome from "./pages/ValorantHome";
import ValorantProfile from "./pages/ValorantProfile";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="rs-app-shell">
        <Navbar />
        <main className="rs-app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/summoner/:gameName/:tagLine"
              element={<SummonerProfile />}
            />
            <Route path="/valorant" element={<ValorantHome />} />
            <Route
              path="/valorant/player/:gameName/:tagLine"
              element={<ValorantProfile />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
