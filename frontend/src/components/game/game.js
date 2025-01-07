import React, {useState, useEffect, useRef} from 'react';
import styles from './game.module.css';
import { Howl } from "howler";
import coin from './../../assets/images/coin.svg';
import timer from './../../assets/images/timer.svg';
import star from './../../assets/images/star.svg';
import backgroundImage from './../../assets/images/game-bg.svg';
import Robot1 from './../../assets/images/robots/robot1.svg';
import Robot2 from './../../assets/images/robots/robot2.svg';
import Robot3 from './../../assets/images/robots/robot3.svg';
import Robot4 from './../../assets/images/robots/robot4.svg';
import Robot5 from './../../assets/images/robots/robot5.svg';
import Robot6 from './../../assets/images/robots/robot6.svg';
import WC2 from './../../assets/images/robots/robot7.svg';
import Avatar from './../../assets/images/robots/avatar.svg';
import WC from './../../assets/images/robots/wc.svg';
import collisionSoundFile from "./../../assets/sounds/collision.wav";
import scoreSoundFile from "./../../assets/sounds/game-over.wav";
import gameOverSoundFile from "./../../assets/sounds/game-over.wav";
import backgroundMusicFile from "./../../assets/sounds/background.mp3";


const ROBOT_COUNT = 6; // Number of robots
const GAME_DURATION = 5 * 60; // 5 minutes in seconds

const Game = ({children}) => {

    const gameContainerRef = useRef(null); // Reference to the game container
    const [avatar, setAvatar] = useState({ x: 10, y: 10 }); // Position in pixels
    const [robots, setRobots] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(GAME_DURATION); // Track time remaining
    const [score, setScore] = useState(0); // Track the score
    const [collisionOccurred, setCollisionOccurred] = useState(false);
    const [staticElements, setStaticElements] = useState([
        { id: 1, x: 20, y: 30, image: WC },
        { id: 2, x: 50, y: 70, image: WC2 },
      ]);

    const [questions] = useState([
    { question: "Water conservation helps to reduce the demand on natural water sources.", answer: true },
    { question:  "Leaving the tap running while brushing your teeth is a good way to conserve water", answer: false },
    { question: "Taking long showers is an effective way to conserve water", answer: false },
    { question: "Rainwater harvesting can help reduce the use of municipal water", answer: false },
    { question: "Using a dishwasher or washing machine with a full load helps save water", answer: false}
    ]);
      const [showPopup, setShowPopup] = useState(false);
      const [currentQuestion, setCurrentQuestion] = useState(null);

    // Load sounds
    const collisionSound = new Howl({ src: [collisionSoundFile] });
    const scoreSound = new Howl({ src: [scoreSoundFile] });
    const gameOverSound = new Howl({ src: [gameOverSoundFile] });
    const [muted, setMuted] = useState(false);


   // Collision Detection
  useEffect(() => {
    const collidedElement = staticElements.find(
      (el) =>
        Math.abs(el.x - avatar.x) < 5 && Math.abs(el.y - avatar.y) < 5 // Adjust collision threshold as needed
    );

    if (collidedElement) {
      // Randomly pick a question
      const randomQuestion =
        questions[Math.floor(Math.random() * questions.length)];
      setShowPopup(true);
      setCurrentQuestion(randomQuestion);
    }
  }, [avatar, staticElements, questions]);

  // Handle Answer Submission
  const handleAnswer = (isTrue) => {
    if (isTrue === currentQuestion.answer) {
      setScore((prev) => prev + 10); // Increment score for correct answer
    }
    setShowPopup(false);
    setCurrentQuestion(null); // Clear the question
  };






     // Background music
  const backgroundMusic = new Howl({
    src: [backgroundMusicFile],
    loop: true, // Loop the background music
    volume: 0.5, // Set initial volume
  });

  // Start background music on load
  useEffect(() => {
    backgroundMusic.play();
    return () => {
      backgroundMusic.stop(); // Stop the music when component unmounts
    };
  }, [backgroundMusic]);
  
    useEffect(() => {
        const robotImages = [Robot1, Robot2, Robot3, Robot4, Robot5,
        Robot6];

      if (gameOver) return; // Prevent movement if game is over
      // Randomize initial robot positions
      const initialRobots = Array.from({ length: ROBOT_COUNT }, (_, i) => ({
        x: Math.random() * 90, // Random position as a percentage
        y: Math.random() * 90,
        image: robotImages[i],
      }));
      setRobots(initialRobots);
  
      // Move robots randomly every 20 seconds
      const interval = setInterval(() => {
        setRobots((prevRobots) =>
          prevRobots.map((robot) => ({
            ...robot,
            x: Math.max(0, Math.min(90, robot.x + (Math.random() * 10 - 5))),
            y: Math.max(0, Math.min(90, robot.y + (Math.random() * 10 - 5))),
          }))
        );
      }, 20000);
  
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (gameOver) return; // Prevent movement if game is over
        const intervals = [];
      
        setRobots((prevRobots) =>
          prevRobots.map((robot, index) => {
            const randomSpeed = Math.random() * 20000 + 10000; // Random speed between 1s and 3s
            intervals[index] = setInterval(() => {
              setRobots((robots) =>
                robots.map((r, i) =>
                  i === index
                    ? {
                        ...r,
                        x: Math.max(
                          0,
                          Math.min(90, r.x + (Math.random() * 30 - 15))
                        ),
                        y: Math.max(
                          0,
                          Math.min(90, r.y + (Math.random() * 30 - 15))
                        ),
                      }
                    : r
                )
              );
            }, randomSpeed);
            return robot;
          })
        );
      
        return () => intervals.forEach((interval) => clearInterval(interval));
      }, []);
      
  
    const moveAvatar = (dx, dy) => {
      const gameContainer = gameContainerRef.current;
  
      if (!gameContainer) return;
  
      // Ensure avatar movement stays within bounds
      setAvatar((prev) => ({
        x: Math.max(0, Math.min(90, prev.x + dx)),
        y: Math.max(0, Math.min(90, prev.y + dy)),
      }));
    };
  
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (gameOver) return;
  
        switch (event.key) {
          case "ArrowUp":
            moveAvatar(0, -5); // Move up
            break;
          case "ArrowDown":
            moveAvatar(0, 5); // Move down
            break;
          case "ArrowLeft":
            moveAvatar(-5, 0); // Move left
            break;
          case "ArrowRight":
            moveAvatar(5, 0); // Move right
            break;
          default:
            break;
        }
      };
  
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [gameOver]);
  
    useEffect(() => {
    if (gameOver) return; // stop if game over
      const collision = robots.some(
        (robot) =>
          Math.abs(robot.x - avatar.x) < 5 && Math.abs(robot.y - avatar.y) < 5
      );
  
      if (collision) {
        setScore(score - 5);
      }
    }, [avatar, robots]);

    // Update score every 10 seconds
  useEffect(() => {
    if (gameOver) return;

    const scoreInterval = setInterval(() => {
      setScore((prevScore) => prevScore + 10); // Add 10 points
    }, 10000); // Every 10 seconds

    return () => clearInterval(scoreInterval);
  }, [gameOver]);

  // Timer countdown
  useEffect(() => {
    if (gameOver || timeRemaining <= 0) return;

    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [gameOver, timeRemaining]);

  useEffect(() => {
    if (timeRemaining <= 0) {
      setGameOver(true); // End the game when time is up
    }
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Handle Collision Event
  useEffect(() => {
    if (collisionOccurred) {
      collisionSound.play(); // Play collision sound
      setCollisionOccurred(false); // Reset collision flag
    }
  }, [collisionOccurred, collisionSound]);

  // Handle Score Update Event
  useEffect(() => {
    const scoreInterval = setInterval(() => {
      if (!gameOver) {
        setScore((prevScore) => prevScore + 10);
        scoreSound.play(); // Play score sound
      }
    }, 2000);

    return () => clearInterval(scoreInterval);
  }, [gameOver, scoreSound]);

  
  // Handle Game Over Event
  useEffect(() => {
    if (gameOver) {
      gameOverSound.play(); // Play game over sound
      backgroundMusic.stop(); // Stop background music
    }
  }, [gameOver, gameOverSound, backgroundMusic]);

  

  // Mute/Unmute all sounds
//   const toggleMute = () => {
//     Howler.mute(!muted);
//     setMuted(!muted);
//   };

    return <div className={styles.game}>
        <div className={styles.stats}>
            <div className={styles.stat}>
                <img src={coin}/>
                <span>{score}</span>
            </div>
            <div className={styles.stat}>
                <img src={timer}/>
                <span>{formatTime(timeRemaining)}</span>
            </div>
            <div className={styles.stat}>
                <img src={star}/>
                <span>5</span>
            </div>
        </div>
        <div className={styles.container}>
            <div className={styles.card}>
            <div className={styles.background}
            ref={gameContainerRef}
             style={{
                '--bg-image': `url(${backgroundImage})`,
            }}>
                 
        {/* Popup */}
        {showPopup && currentQuestion && 
        <div className={styles.quiz}>
        <p className={styles.prompt}>{currentQuestion.question}</p>
        <div className={styles.options}>
                <span className={styles.option} onClick={() => handleAnswer(true)}>True</span>
                <span className={styles.option} onClick={() => handleAnswer(false)}>False</span>  
        </div>
        </div>}

        {gameOver && <div className={styles.game_over}>Game Over!</div>}
        <div className={styles.game_board}>
        {/* Avatar */}
        <img
          src={Avatar}
          alt="Avatar"
          className={styles.avatar}
          style={{
            left: `${avatar.x}%`,
            top: `${avatar.y}%`,
          }}
        />
        {/* Static Elements with Images */}
      {staticElements.map((el) => (
        <img
          key={el.id}
          src={el.image}
          alt={`Element ${el.id}`}
          style={{
            position: "absolute",
            left: `${el.x}%`,
            top: `${el.y}%`,
            width: "50px",
            height: "50px",
          }}
        />
      ))}
        {/* Robots */}
        {robots.map((robot, index) => (
          <img
            key={index}
            src={robot.image}
            alt={`Robot ${index + 1}`}
            className={styles.robot}
            style={{
              left: `${robot.x}%`,
              top: `${robot.y}%`,
            }}
          />
        ))}
      </div>
            </div>

            </div>
           
        </div>
    </div>
}

export default Game;
