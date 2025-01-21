import React, { useState } from "react";
import styles from "./select-room.module.css";

const SelectRoom = ({ children }) => {
  return (
    <div className={styles.landing}>
      <div className={styles.container}>
        <div className={styles.quiz}>
          <div className={styles.options}>
            <span className={styles.option}>Create A Room</span>
            <span className={styles.option}>Join A Room</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectRoom;
