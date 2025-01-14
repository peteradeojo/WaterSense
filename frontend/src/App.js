import './App.css';
import Background from './components/background/background';
import FunFact from './components/fun-fact/fun-fact';
import Leaderboard from './components/leaderboard/leaderboard';
import LandingPage from './components/landing-page/landing-page';
import Username from './components/username/username';
import GameStart from './components/game-start/game-start';
import Createroom from './components/createroom/createroom';
import Joinroom from './components/joinroom/joinroom';
import Game from './components/game/game';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function App() {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    return (
      <Background>
        <div className="not-allowed">
            <h1>Access Not Allowed</h1>
            <p>This website is not accessible on mobile devices.</p>
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
        </Routes>
      </Background>
    </div>
  );
}

export default App;