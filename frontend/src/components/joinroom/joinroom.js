import React, { useState, useContext } from "react";
import styles from "./joinroom.module.css";
import MaxPlayer from "../maxplayer/maxplayer";
import { joinRoom } from "./../api";
import { useNavigate } from "react-router-dom";
import { GlobalStateContext } from "./../globalstatecontext";

const Joinroom = ({ children }) => {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [next, setNext] = useState(false);
  const [limitExceeded, setLimitExceeded] = useState(false);
  const { globalState, updatePermissions, updateCode, updateUser } =
    useContext(GlobalStateContext);
  const navigate = useNavigate();

  const updateUsername = (event) => {
    setUsername(event.target.value);
    updateUser(event.target.value);
  };

  const submitUsername = () => {
    setNext(true);
  };

  const submitCode = (event) => {
    setCode(event.target.value);
    updateCode(event.target.value);
  };

  const playGame = async () => {
    try {
      const payload = { username: username, code: code };
      const response = await joinRoom(payload);
      updatePermissions(true);
      navigate("/game");
    } catch (error) {
      console.error("Error sending data", error);
      if (error.response.status == 428) {
        setLimitExceeded(true);
      } else {
        alert(`${error.response.data.message}`);
      }
    }
  };

  return (
    <div className={styles.username}>
      <div className={styles.container}>
        {!next ? (
          <div className={styles.quiz}>
            <p className={styles.prompt}>ENTER YOUR USERNAME</p>
            <div class="input-container">
              <input
                value={username}
                onChange={updateUsername}
                type="text"
                class={styles.styled_input}
              />
            </div>
            <div className={styles.options}>
              <span className={styles.option} onClick={submitUsername}>
                Done
              </span>
            </div>
          </div>
        ) : limitExceeded ? (
          <MaxPlayer />
        ) : (
          <div className={styles.quiz}>
            <p className={styles.prompt}>INVITATION CODE TO JOIN </p>
            <div class="input-container">
              <input
                value={code}
                onChange={submitCode}
                type="text"
                class={styles.styled_input}
              />
            </div>
            <div className={styles.options}>
              <span className={styles.option} onClick={playGame}>
                Play
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Joinroom;
