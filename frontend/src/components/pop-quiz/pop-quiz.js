import React, {useState} from 'react';
import styles from './pop-quiz.module.css';
import coin from './../../assets/images/coin.svg';
import diamond from './../../assets/images/diamond.svg';
import star from './../../assets/images/star.svg';
import backgroundImage from './../../assets/images/game-bg.svg';


const PopQuiz = ({children}) => {

    const [questions, setQuestions] = useState([
        "Water conservation helps to reduce the demand on natural water sources.",
        "Leaving the tap running while brushing your teeth is a good way to conserve water",
        "Taking long showers is an effective way to conserve water",
        "Rainwater harvesting can help reduce the use of municipal water",
        "Using a dishwasher or washing machine with a full load helps save water"
    ]); 


    return <div className={styles.funfact}>
        <div className={styles.stats}>
            <div className={styles.stat}>
                <img src={coin}/>
                <span>22</span>
            </div>
            <div className={styles.stat}>
                <img src={diamond}/>
                <span>3</span>
            </div>
            <div className={styles.stat}>
                <img src={star}/>
                <span>5</span>
            </div>
        </div>
        <div className={styles.container}>
            <div className={styles.card}>
            <div className={styles.background}
             style={{
                '--bg-image': `url(${backgroundImage})`,
            }}>
            <div className={styles.quiz}>
                <p className={styles.prompt}>{questions[0]}</p>
                <div className={styles.options}>
                        <span className={styles.option}>True</span>
                        <span className={styles.option}>False</span>  
                </div>
                </div>
            </div>

            </div>
           
        </div>
    </div>
}

export default PopQuiz;
