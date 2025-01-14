import React, { useState } from 'react';
import styles from './createroom.module.css';
import { createRoom } from "./../api";
import copy from './../../assets/images/copy.svg';

const CreateRoom = () => {
  const [selectedPlayers, setSelectedPlayers] = useState(2);
  const [code, setCode] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

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

  const handleSubmit = async () => {
    try {
      const payload = { players: selectedPlayers };
      const response = await createRoom(payload);
      setCode(response);
      console.log("Data sent successfully:", response);
    } catch (error) {
      console.error("Error sending data", error);
    }
  };
  

  return (
    <div className={styles.username}>
      <div className={styles.container}>

        {
          code ? <div className={styles.quiz}>
          <p className={styles.prompt}>INVITATION CODE TO JOIN </p>
          <div className={styles.input_container} >
            <div class={styles.styled_input}><span>{code}</span>
            <img src={copy} onClick={handleImageClick}/>
            </div>
            {copySuccess && <p style={{ color: "green", margin: "10px" }}>{copySuccess}</p>}
          </div>
        </div>

        :

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
            <span className={styles.option} onClick={handleSubmit}>DONE</span>
          </div>
        </div>
        }
        
      </div>


      

    </div>
  );
};

export default CreateRoom;
