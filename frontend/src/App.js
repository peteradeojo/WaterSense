import "./App.css";
import Background from "./components/background/background";
// import FunFact from './components/fun-fact/fun-fact';
import Leaderboard from "./components/leaderboard/leaderboard";
import LandingPage from "./components/landing-page/landing-page";
import Createroom from "./components/createroom/createroom";
import Joinroom from "./components/joinroom/joinroom";
import Game from "./components/game/game";
import { Routes, Route } from "react-router-dom";

function App() {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    return (
      <Background>
        <div className="not-allowed">
          <h1>Ooopsie!</h1>
          <p>This game is not playable on mobile devices.</p>
          <p>Join on a wider screen to join in on the fun!</p>
        </div>
      </Background>
    );
  }

  return (
    <div className="App">
      <Background>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create-room" element={<Createroom />} />
          <Route path="/join-room" element={<Joinroom />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Background>
    </div>
  );
}

export default App;
