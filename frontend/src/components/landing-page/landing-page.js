import React, { useState } from "react";
import styles from "./landing-page.module.css";
import { Link } from "react-router-dom";

const LandingPage = ({ children }) => {
  return (
    <div className={styles.landing}>
      <div className={styles.container}>
        <div className={styles.quiz}>
          <div className={styles.options}>
            <span className={styles.option}>
              <Link to="/create-room">Create A Room</Link>
            </span>
            <span className={styles.option}>
              <Link to="/join-room">Join A Room</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
