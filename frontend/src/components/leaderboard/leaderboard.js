import React, { useEffect, useState } from "react";
import LeaderboardItem from "./leaderboard-item";
import styles from "./leaderboard.module.css";
import { getLeaderboard } from "./../api";
import { GlobalStateContext } from "./../globalstatecontext";
import { useContext } from "react";
import { io } from "socket.io-client";
import { Navigate } from "react-router-dom";

const socket = io("https://watersense.up.railway.app", {
  autoConnect: false,
}); // Server URL

const Leaderboard = () => {
  const { globalState } = useContext(GlobalStateContext);

  const [players, setPlayers] = useState([
    { rank: 1, name: "Fabzy", score: 500, avatar: "avatar1.png", isTop: true },
    { rank: 2, name: "Fabzy", score: 414, avatar: "avatar2.png" },
    { rank: 3, name: "Fabzy", score: 408, avatar: "avatar3.png" },
    { rank: 4, name: "Fabzy", score: 400, avatar: "avatar4.png" },
    { rank: 5, name: "Fabzy", score: 300, avatar: "avatar5.png" },
  ]);

  // Handling socket connection
  useEffect(() => {
    // When connected, console log the socket connection
    socket.connect();
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.emit("join-room", {
      room_code: globalState.code,
      username: globalState.username,
    });

    socket.on("leaderboard-update", (players) => {
      players = players.map((player, idx) => ({
        rank: idx + 1,
        name: player.username,
        isTop: idx == 0,
        score: player.score,
        avatar: `https://api.dicebear.com/9.x/pixel-art/svg?seed=${player.username}`,
      }));
      setPlayers(players);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchLeaderboard = async () => {
    let players = await getLeaderboard(globalState.code);
    players = players.map((player, idx) => ({
      rank: idx + 1,
      name: player.username,
      isTop: idx == 0,
      score: player.score,
      avatar: `https://api.dicebear.com/9.x/pixel-art/svg?seed=${player.username}`,
    }));
    return players;
  };

  useEffect(() => {
    if (!globalState.allowed) {
      return;
    }
    fetchLeaderboard().then((players) => {
      setPlayers(players);
    });
  }, []);

  return (
    <div className={styles.container}>
      {globalState.allowed ? (
        <>
          <div className={styles.card}>
            <div className={styles.leaderboard}>
              <h1 className={styles.leaderboard_title}>LEADERBOARD</h1>
              <div className={styles.leaderboard_list}>
                {players?.map((player, idx) => (
                  <LeaderboardItem key={idx + 1} {...player} />
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default Leaderboard;
