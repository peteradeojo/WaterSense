import React, {useState} from 'react';
import styles from './joinroom.module.css';



const Joinroom = ({children}) => {



    return <div className={styles.username}>
        
        <div className={styles.container}>
            
            <div className={styles.quiz}>
                <p className={styles.prompt}>INVITATION CODE TO JOIN </p>
                <div class="input-container">
                <input type="text" class={styles.styled_input}/>
                </div>
                <div className={styles.options}>
                        <span className={styles.option}>Play</span> 
                </div>

            </div>
           
        </div>
    </div>
}

export default Joinroom;
