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
            Water is one of the most essential resources on Earth, yet it is
            increasingly becoming scarce due to rising global populations,
            climate change, and poor water management practices. As the world
            grapples with the challenges of water conservation, innovative
            approaches like water usage games are gaining attention. These games
            often adopt engaging and educational themes, simulate real-world
            water management scenarios, and encourage players to adopt
            sustainable water-saving habits and mindful practices regarding its
            use. Through interactive experiences, water usage games can instill
            a sense of responsibility towards water conservation in players,
            especially the younger generation.
          </p>
          <img src={vrman} alt="Game Illustration" />

          <p>
            Beyond education, water usage games can have a significant impact on
            players’ awareness and decision-making towards water conservation.
            By simulating various conservation scenarios, these games highlight
            the negative environmental impacts of wasteful habits, educate
            players on the benefits of adopting sustainable practices, and
            inspire them to take ownership of their choices in the game. As they
            become more aware of the importance of such actions, players can, in
            turn, translate these behavioral changes into real-life water-saving
            practices in their daily lives, such as reducing water wastage at
            home or advocating for better water management policies in their
            communities.
          </p>
          <img src={river} alt="Game Benefits Illustration" />

          <p>
            In conclusion, water usage games offer a creative and effective way
            to engage people in the critical issue of water conservation. By
            providing an immersive and interactive experience, these games teach
            players about the importance of water management while encouraging
            sustainable practices in everyday life. As the world continues to
            face water crises, the role of educational tools like water usage
            games becomes even more critical in shaping a generation that values
            and conserves this vital resource. Hence, fun, engaging, and
            educational, water usage games can play an essential role in
            securing a more sustainable water future for all.
          </p>
          <img src={tappipe} alt="Game Overview Illustration" />

          <h2>Game Overview</h2>
          <p>
            This is a fun and interactive game where you can either join an
            existing game or create a new quiz of up to 5 players. The game is
            timed, and you will earn points as you move and make wise existing
            games for 60 seconds. The higher your score reflects not only the
            points but also how quick your decision will be! Each point gained
            depends on the questions you answer and the water resources you save
            in this timed environment.
          </p>
          <p>
            You may be asked questions, collect water, and even points. If your
            score is higher among all the team, you earn points in the session.
            The game combines education and fun, making it simple to try to
            conserve the water.
          </p>
          <p>
            At the end of the game, your score will be added to a leaderboard,
            so you can see how you compare with other players!
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
