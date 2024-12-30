import React from 'react';
import LeaderboardItem from './leaderboard-item';
import styles from './leaderboard.module.css';

const players = [
    { rank: 1, name: 'Fabzy', score: 500, avatar: 'avatar1.png', isTop: true },
    { rank: 2, name: 'Fabzy', score: 414, avatar: 'avatar2.png' },
    { rank: 3, name: 'Fabzy', score: 408, avatar: 'avatar3.png' },
    { rank: 4, name: 'Fabzy', score: 400, avatar: 'avatar4.png' },
    { rank: 5, name: 'Fabzy', score: 300, avatar: 'avatar5.png' },
];

function Leaderboard() {
    return (
        <div className={styles.container}>
        <div className={styles.card}>
        <div className={styles.leaderboard}>
            <h1 className={styles.leaderboard_title}>LEADERBOARD</h1>
            <div className={styles.leaderboard_list}>
                {players.map((player) => (
                    <LeaderboardItem key={player.rank} {...player} />
                ))}
            </div>
            </div>
            </div>
        </div>
    );
}

export default Leaderboard;
