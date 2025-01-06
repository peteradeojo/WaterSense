import React from 'react';
import styles from './background.module.css';
import backgroundImage from './../../assets/images/background.svg';


const Background = ({children}) => {
    return <div className={styles.background}
        style={{
        '--bg-image': `url(${backgroundImage})`,
    }}>
        <div>{children}</div>
    </div>
}

export default Background;
