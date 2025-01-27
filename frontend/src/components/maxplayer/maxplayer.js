import React from "react";
import styles from "./maxplayer.module.css";

const MaxPlayer = () => {
  return (
    <div className={styles.username}>
      <div className={styles.container}>
        <div className={styles.options}>
          <p className={styles.option}>
            "The maximum number of players has been reached, and the room is now
            closed for new joiners."
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaxPlayer;
