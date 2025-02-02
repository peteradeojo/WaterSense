import React from "react";
import styles from "./homepage.module.css";
import vrman from "./../../assets/images/vrman.svg";
import river from "./../../assets/images/river.svg";
import tappipe from "./../../assets/images/tappipe.svg";
import backgroundImage from "./../../assets/images/background.svg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div
      className={styles.background}
      style={{
        "--bg-image": `url(${backgroundImage})`,
      }}
    >
      <div className={styles.options}>
        <span className={styles.option}>
          <h1>Water Usage Game</h1>
          <p>
          WATER IS ONE OF THE MOST ESSENTIAL RESOURCES ON EARTH, 
          YET IT IS INCREASINGLY BECOMING SCARCE DUE TO RISING GLOBAL POPULATIONS, 
          CLIMATE CHANGE, AND POOR WATER MANAGEMENT PRACTICES. AS THE WORLD FACES CHALLENGES OF WATER CONSERVATION, 
          INNOVATIVE APPROACHES LIKE WEB-BASED GAMES ARE GAINING ATTENTION. THESE GAMES OFTEN ADOPT ENGAGING AND EDUCATIONAL THEMES, 
          SIMULATE REAL-WORLD WATER MANAGEMENT SCENARIOS, AND ENCOURAGE PLAYERS TO ADOPT SUSTAINABLE WATER-SAVING HABITS AND MINDFUL PRACTICES REGARDING ITS USE. 
          THROUGH INTERACTIVE EXPERIENCES, GAMES CAN INSTILL A SENSE OF RESPONSIBILITY TOWARDS WATER CONSERVATION IN PLAYERS, ESPECIALLY THE YOUNGER GENERATION.
          </p>
          <img src={vrman} alt="Game Illustration" />

          <h2>About The Game</h2>
          <p>
          WaterSense is a session-based maze arcade game where users can either take on the role of an educator to create game sessions and invite students to participate.
          Flo, the water-efficiency hero, embarks on a mission to save water by navigating through water pipes and answering questions about water conservation. However,
         it must avoid the Water Wasters—nasty monsters symbolizing bad water habits.
          </p>
          <img src={river} alt="Game Benefits Illustration" />

          <h2>How to Play</h2>
          <p>
          <ol>
      <li>
        <strong>Session Creation:</strong> An educator creates a session and invites students to join.
      </li>
      <li>
        <strong>Gameplay:</strong> Use the keyboard's arrow keys to move Flo through the maze.
      </li>
      <li>
        <strong>Scoring:</strong>
        <ul style={{ listStyleType: "'* '" }}>
          <li>Gain 10 points for each 30 seconds spent in the game.</li>
          <li>Lose 10 points for contact made with the Water Wasters.</li>
          <li>Correct answers to a question earn 10 points each.</li>
        </ul>
      </li>
      <li>
        <strong>Winning the Game:</strong> The game ends when:
        <ul style={{ listStyleType: "'* '" }}>
          <li>All questions are answered, and Flo successfully avoids Water Wasters.</li>
          <li>Flo loses all three lives after being caught by Water Wasters.</li>
          <li>The final score will be added to a leaderboard, so you can see how you compare with other players!</li>
        </ul>
      </li>
    </ol>
          </p>
  

          <Link className={styles.play} to="/play">
            {" "}
            Play{" "}
          </Link>
        </span>
      </div>
    </div>
  );
};

export default HomePage;
