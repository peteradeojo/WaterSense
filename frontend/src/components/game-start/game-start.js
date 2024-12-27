import React, {useState} from 'react';
import styles from './game-start.module.css';
import tap from './../../assets/images/tap.svg';


const GameStart = ({children}) => {



    return <div className={styles.username}>
        
        <div className={styles.container}>
            
            <div className={styles.quiz}>
                <p className={styles.prompt}>CLICK OR TAP ANYWHERE
TO PLAY THE GAME</p>
                <img src={tap}/>

            </div>
           
        </div>
    </div>
}

export default GameStart;
