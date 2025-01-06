import React, {useState} from 'react';
import styles from './createroom.module.css';



const Createroom = ({children}) => {



    return <div className={styles.username}>
        
        <div className={styles.container}>
            
            <div className={styles.quiz}>
                <p className={styles.prompt}>ENTER A CODE TO JOIN THE ROOM </p>
                <div class="input-container">
                <input type="text" class={styles.styled_input}/>
                </div>
                <div className={styles.options}>
                        <span className={styles.option}>Join</span> 
                </div>

            </div>
           
        </div>
    </div>
}

export default Createroom;
