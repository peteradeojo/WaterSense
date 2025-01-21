import React, { useState } from "react";
import styles from "./game-start.module.css";
import tap from "./../../assets/images/tap.svg";

const GameStart = ({ children }) => {
  return (
    <div className={styles.username}>
      <div className={styles.container}>
        <div className={styles.quiz}>
          <p className={styles.prompt}>
            WAITING FOR INSTRUCTOR TO START THE GAME...
          </p>
          <img src={tap} className={styles.img} />
        </div>
      </div>
    </div>
  );
};

export default GameStart;
