import React, { useState } from "react";
import styles from "./playernumber.module.css";

const PlayerNumber = () => {
  const [selectedPlayers, setSelectedPlayers] = useState(2);

  const handleChange = (event) => {
    setSelectedPlayers(event.target.value);
  };

  return (
    <div className={styles.username}>
      <div className={styles.container}>
        <div className={styles.quiz}>
          <p className={styles.prompt}>SELECT THE NUMBER OF PLAYERS</p>
          <div className="input-container">
            <select
              className={styles.dropdown}
              value={selectedPlayers}
              onChange={handleChange}
            >
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className={styles.options}>
            <span className={styles.option}>DONE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerNumber;
