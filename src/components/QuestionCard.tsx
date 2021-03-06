import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { QuestionCardProps } from '../types/Types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    quizContent: {
        padding: '20px 20px 80px 20px',
        position: 'relative',
        boxSizing: 'border-box',
        margin: '0 20px'
    },
    startQuizButton: {
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
    questionOptionWrapper: {
        width: '100%',
        float: 'left',
        "&:nth-child(even)": {
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
        cursor: 'pointer',
        "&>input": {
            visibility: 'hidden'
        }
    },
    selectedAnswer: {
        backgroundColor: '#f77d3b',
    },
    questionHeading: {
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            marginTop: 0
        }
    },
    question: {
        margin: '20px 0 30px 0'
    },
    validationMsgBox: {
        position: 'absolute',
        bottom: 25,
        color: '#ffffff',
        left: 20        
      },
      validationMsg: {        
        color: 'red',        
        fontSize: 16,
        fontWeight: 600
      },
}))

const QuestionCard: React.FC<QuestionCardProps> = ({ question, options, submitQuestionCallback, isLastQuestion }) => {

    let classes = useStyles();

    let [selectedOption, setSelectedOption] = useState("");
    let [isValidationError, setIsValidationError] = useState<boolean>(false);
    let [validationErrorMsg, setValidationErrorMsg] = useState<string>("");

    const handleOptionSelection = (e: any) => {
        setSelectedOption(e.target.value)
    }

    const handleQuestionSubmit = (e: React.FormEvent<EventTarget>) => {
        //submitQuestionCallback()
        e.preventDefault();
        if (selectedOption === "")
            showValidation("Select an option");
        else{
            setIsValidationError(false);
            submitQuestionCallback(e, selectedOption);
        }            
        setSelectedOption("");
    }

    const showValidation = (msg: string) => {
        setValidationErrorMsg(msg);
        setIsValidationError(true);        
    }

    return (
        <div>
            <Paper elevation={3} className={classes.quizContent}>
                <h2 className={classes.questionHeading}>Question</h2>
                <p className={classes.question}>{question}</p>
                <form onSubmit={(e: React.FormEvent<EventTarget>) => handleQuestionSubmit(e)}>
                    <Grid container spacing={3}>
                        {
                            options.map((quest: string, ind: number) => {
                                return (
                                    <Grid item xs={12} sm={6} md={6} key={ind}>
                                        <div className={classes.questionOptionWrapper}>
                                            <label className={`${classes.questionOptions} ${quest === selectedOption ? classes.selectedAnswer : ""}`}>
                                                <input
                                                    type="radio"
                                                    name="opt"
                                                    value={quest}
                                                    checked={quest === selectedOption}
                                                    onChange={handleOptionSelection}
                                                />
                                                {quest}
                                            </label>
                                        </div>
                                    </Grid>
                                )
                            })
                        }
                        {
                            isValidationError
                                ? <div className={classes.validationMsgBox}>
                                    <span className={classes.validationMsg}> {validationErrorMsg}</span>
                                </div>
                                : <></>
                        }
                        <button
                            type="submit"
                            className={classes.startQuizButton}>
                            {isLastQuestion ? 'Submit Quiz' : 'Next'}
                        </button>
                    </Grid>
                </form>
            </Paper>
        </div>

    )
}

export default QuestionCard;