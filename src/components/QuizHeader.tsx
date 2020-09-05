import React from 'react';
import { QuizHeaderProps } from '../types/Types';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    headerSection: {
        height: 50
    },
    scoreSection: {
        position: 'absolute',
        margin: '5px 0 0 5px'
    },
    scoreCount: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 800,
        width: 50
    },
    restartSection:{
        position: 'absolute',
        top: 28,
        right: 65
    },
    restartButton:{        
        border: 'none',
        fontSize: 20,
        padding: '3px 20px 7px 20px',
        fontWeight: 600,
        backgroundColor: '#ffffff'
    }
}))

const QuizHeader: React.FC<QuizHeaderProps> = ({ isQuizStarted, isQuizCompleted, score, totalQuestions, quizDifficulty }) => {

    let classes = useStyles();
    
    //quizDifficulty[0] = quizDifficulty[0].toUpperCase()
    return (
        <div className={classes.headerSection}>
            {
                isQuizStarted || isQuizCompleted
                    ? <div className={classes.restartSection}>
                        <span className={classes.restartButton}>{quizDifficulty.replace(quizDifficulty[0], quizDifficulty[0].toUpperCase())}</span>                        
                      </div>
                    : <></>
            }
            {
                isQuizStarted || isQuizCompleted
                    ? <div className={classes.scoreSection}>
                        <span className={classes.scoreCount}>Score: {score}</span>
                       </div>
                    : <></>
            }
        </div>
    )
}

export default QuizHeader;