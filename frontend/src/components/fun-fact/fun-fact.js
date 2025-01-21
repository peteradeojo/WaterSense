import React, { useState } from "react";
import styles from "./fun-fact.module.css";
import water_lawn from "./../../assets/images/fun-facts/water-lawn.svg";
import agriculture from "./../../assets/images/fun-facts/agriculture.svg";
import earth_surface from "./../../assets/images/fun-facts/earth-surface.svg";
import avg_person from "./../../assets/images/fun-facts/avg-person.svg";
import coin from "./../../assets/images/coin.svg";
import diamond from "./../../assets/images/diamond.svg";
import star from "./../../assets/images/star.svg";

const FunFact = ({ children }) => {
  const [funfacts, setFunFacts] = useState([
    {
      text: "The average person uses about 80-100 gallons (300-380 liters) of water per day in the United States for personal needs like drinking, bathing, cooking, and cleaning",
      image: avg_person,
    },
    {
      text: "Agriculture is responsible for approximately 70% of global water usage, with the majority used for irrigation, especially in water-scarce regions",
      image: agriculture,
    },
    {
      text: "Nearly 70% of the Earth's surface is covered by water, but only about 3% of it is fresh water, and only 1% of that fresh water is easily accessible for human use (the rest is trapped in glaciers and ice caps).",
      image: earth_surface,
    },
    {
      text: "Watering your lawn in the early morning or late evening can reduce evaporation by up to 50%, ensuring that more water reaches the plant roots and less is wasted",
      image: water_lawn,
    },
  ]);

  return (
    <div className={styles.funfact}>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <img src={coin} />
          <span>22</span>
        </div>
        <div className={styles.stat}>
          <img src={diamond} />
          <span>3</span>
        </div>
        <div className={styles.stat}>
          <img src={star} />
          <span>5</span>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.card}>
          <p className={styles.prompt}>DO YOU KNOW?</p>
          <p className={styles.fact}>{funfacts[0].text}</p>
          <img src={funfacts[0].image} />
        </div>
      </div>
    </div>
  );
};

export default FunFact;
