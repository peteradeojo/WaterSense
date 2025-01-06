import React, {useState} from 'react';
import styles from './username.module.css';



const Username = ({children}) => {



    return <div className={styles.username}>
        
        <div className={styles.container}>
            
            <div className={styles.quiz}>
                <p className={styles.prompt}>ENTER YOUR USERNAME</p>
                <div class="input-container">
                <input type="text" class={styles.styled_input}/>
                </div>
                <div className={styles.options}>
                        <span className={styles.option}>Done</span> 
                </div>

            </div>
           
        </div>
    </div>
}

export default Username;
