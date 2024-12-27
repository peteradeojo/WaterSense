import React, {useState} from 'react';
import styles from './landing-page.module.css';
import coin from './../../assets/images/coin.svg';
import diamond from './../../assets/images/diamond.svg';
import star from './../../assets/images/star.svg';



const LandingPage = ({children}) => {



    return <div className={styles.landing}>
        
        <div className={styles.container}>
            
            <div className={styles.quiz}>
                <p className={styles.prompt}>IT'S TIME TO TEST YOUR WATER SENSE</p>
                <div className={styles.options}>
                        <span className={styles.option}>Play</span>
                        <span className={styles.option}>Leaderboard</span>  
                </div>

            </div>
           
        </div>
    </div>
}

export default LandingPage;
