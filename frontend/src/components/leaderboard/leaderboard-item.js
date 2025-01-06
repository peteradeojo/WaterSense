import React, {useState} from 'react';
import styles from './leaderboard.module.css';
import medal from './../../assets/images/medal.svg';


const LeaderboardItem = ({rank, name, score, avatar, isTop}) => {


    return <div>
       
            <div className={`${styles.leaderboard_item} ${isTop ? `${styles.top_player}` : ''}`}>
            <div className={styles.rank_section}>
                <img className={styles.avatar} src={avatar} alt={`${name}'s avatar`} />
                <span className={styles.rank}>{rank}</span>
                {isTop && <img className={styles.medal} src={medal} alt="Medal" />}
            </div>
            <div className={styles.name_section}>{name}</div>
            <div className={styles.score_section}>
                <span className={styles.score}>{score}</span>
            </div>
        </div>
    </div>
}

export default LeaderboardItem;
