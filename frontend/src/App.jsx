import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SummonerProfile from "./pages/SummonerProfile";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/summoner/:gameName/:tagLine"
          element={<SummonerProfile />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
