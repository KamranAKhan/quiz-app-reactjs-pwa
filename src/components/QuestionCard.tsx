import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { QuestionCardProps } from '../types/Types';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  quizContent: {    
    padding: '15px 100px 0',
    height: 400,
    position: 'relative'    
  },
  startQuizButton:{
    right: 20,
    bottom: 20,
    position: 'absolute',
    backgroundColor: '#387dda',
    border: 'none',
    padding: '10px 30px',
    color: '#ffffff',
    cursor: 'pointer',
    "&:hover": {
      backgroundColor: '#464ac8',
      border: 'none'
    }
  },
  questionOptionWrapper:{
    margin: '0 40px 20px 0',
    width: '47%',
    float: 'left',      
    "&:nth-child(even)":{
        marginRight: 0
    },
  },
  questionOptions: {
      backgroundColor: '#5d90df',
      padding: '10px 20px',      
      width: '100%',
      float: 'left',      
      boxSizing: 'border-box',
      color: '#ffffff',
      cursor: 'pointer'      ,
      "&>input":{
          visibility: 'hidden'
      }
  },
  selectedAnswer:{
    backgroundColor: '#f77d3b',
  },  
  questionHeading:{
      textAlign: 'center'
  },
  question:{
      margin: '40px 0'
  }
}))

const QuestionCard: React.FC<QuestionCardProps> = ({ question, options, submitQuestionCallback, isLastQuestion }) => {

    let classes = useStyles();

    let [selectedOption, setSelectedOption] = useState("");

    let optionsInAlphabet = ['A', 'B', 'C', 'D'];

    const handleOptionSelection = (e: any) => {
        setSelectedOption(e.target.value)
    }
   

    return (
        <div>
            <Paper elevation={3} className={classes.quizContent}>
                <h2 className={classes.questionHeading}>Question</h2>
                <p className={classes.question}>{question}</p>
                <div>
                    <form onSubmit={(e: React.FormEvent<EventTarget>) => submitQuestionCallback(e, selectedOption)}>
                        {
                            options.map((quest: string, ind: number) => {
                                return (
                                    <div key={ind} className={classes.questionOptionWrapper}>                                                                                
                                        <label className={`${classes.questionOptions} ${quest === selectedOption ? classes.selectedAnswer : ""}`}>                                            
                                            <input
                                                type="radio"
                                                name="opt"
                                                value={quest}
                                                checked={quest === selectedOption}
                                                onChange={handleOptionSelection}
                                                required />
                                            {quest}
                                        </label>
                                    </div>
                                )
                            })
                        }
                        <button 
                            type="submit" 
                            className={classes.startQuizButton}>
                            {isLastQuestion ? 'Submit Quiz' : 'Next'}
                        </button>
                    </form>
                </div>
            </Paper>
        </div>

    )
}

export default QuestionCard;