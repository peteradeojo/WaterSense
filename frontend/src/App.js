import './App.css';
import Background from './components/background/background';
import FunFact from './components/fun-fact/fun-fact';
import Leaderboard from './components/leaderboard/leaderboard';
import LandingPage from './components/landing-page/landing-page';
import Username from './components/username/username';
import GameStart from './components/game-start/game-start';
import Createroom from './components/createroom/createroom';
import Joinroom from './components/joinroom/joinroom';
import SelectRoom from './components/select-room/select-room';

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
        {/* <Username/>*/}
        {/* <Joinroom/>*/}
        {/*   <FunFact/> */}
        {/* <LandingPage/>*/}
        {/*  <GameStart/>*/}
        {/*   <Leaderboard/>*/}
        {/*   <Createroom/> */}
        <SelectRoom/>
              </Background>
    </div>
  );
}

export default App;
