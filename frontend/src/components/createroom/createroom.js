import React, { useState, useContext, useEffect } from "react";
import styles from "./createroom.module.css";
import { createRoom, startGame } from "./../api";
import copy from "./../../assets/images/copy.svg";
import { useNavigate } from "react-router-dom";
import { GlobalStateContext } from "./../globalstatecontext";
import { io } from "socket.io-client";

const socket = io("https://watersense.up.railway.app", {
  autoConnect: false,
}); // Server URL

const CreateRoom = () => {
  const [selectedPlayers, setSelectedPlayers] = useState(2);
  const [code, setCode] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [players, setPlayers] = useState([]);
  const [joinedPlayers, setJoinedPlayers] = useState(0);
  const { globalState, updatePermissions, updateCode } =
    useContext(GlobalStateContext);
  const navigate = useNavigate();

  useEffect(() => {
    // When connected, console log the socket connection
    socket.connect();
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("new-player", (res) => {
      setJoinedPlayers(() => res.total);
      setPlayers((players) => [...players, res.username]);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleImageClick = () => {
    // Convert the state to a string format
    const stateString = code;

    // Copy the state string to the clipboard
    navigator.clipboard
      .writeText(stateString)
      .then(() => {
        setCopySuccess("Copied to clipboard!"); // Update the feedback message
        setTimeout(() => setCopySuccess(""), 2000); // Clear the message after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleChange = (event) => {
    setSelectedPlayers(event.target.value);
  };

  const handleStart = async () => {
    updateCode(code);
    updatePermissions(true);
    const res = await startGame({
      code: code,
    });
    alert("Game started succesfully!");
    navigate("/leaderboard");
  };

  const handleSubmit = async () => {
    try {
      const response = await createRoom(selectedPlayers);
      setCode(response);
      socket.emit("join-room", {
        room_code: response,
        username: globalState.username,
      });
      console.log("Data sent successfully:", response);
    } catch (error) {
      console.error("Error sending data", error);
    }
  };

  return (
    <div className={styles.username}>
      <div className={styles.container}>
        {code ? (
          <div className={styles.quiz}>
            <p className={styles.prompt}>INVITATION CODE TO JOIN </p>
            <div className={styles.input_container}>
              <div class={styles.styled_input}>
                <span>{code}</span>
                <img src={copy} onClick={handleImageClick} />
              </div>
              {copySuccess && (
                <p style={{ color: "green", margin: "10px" }}>{copySuccess}</p>
              )}
            </div>
            <div style={{ color: "#ffffff", margin: "10px" }}>
              <p style={{ margin: "10px" }}>
                <span>Joined players: </span>
                <span>{joinedPlayers}</span>
              </p>
              {Boolean(joinedPlayers) && (
                <p>
                  <span>Players: </span>
                  <span>{players.join(", ")}</span>
                </p>
              )}
            </div>
            <div className={styles.options}>
              <span className={styles.option} onClick={handleStart}>
                Start Game
              </span>
            </div>
          </div>
        ) : (
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
              <span className={styles.option} onClick={handleSubmit}>
                DONE
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateRoom;
