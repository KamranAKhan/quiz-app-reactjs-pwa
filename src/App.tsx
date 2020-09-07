import React, { useState } from 'react';
import './App.css';
import CardComponent from './components/QuestionCard';
import QuizHeader from './components/QuizHeader';

import { getQuizData } from './services/QuizService';
import { QuestionFormat } from './types/Types';

import Timer from 'react-compound-timer'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  appLoading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
    height: '100%'
  },
  appLoadingImage: {
    height: 80,
    width: 80
  },
  appLoadingText: {
    fontSize: 13,
    color: '#ffffff'
  },
  quizBody: {
    position: 'relative'
  },
  quizContent: {    
    margin: '10% 20px 0',
    padding: '20px 20px 80px 20px',
    position: 'relative',
    boxSizing: 'border-box'
  },
  quizContentLoading: {    
    margin: '10% 20px 0',
    position: 'relative',
    height: 400
  },
  quizContentCenter: {
    margin: '5% auto 0 auto',
    width: '100%',
  },
  attemptsLeft: {
    [theme.breakpoints.down('sm')]: {            
      fontSize: 14,
      paddingBottom: 15,
      float: 'left',
      width: '100%'
    }
  },
  quizTimer: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 800,
    fontSize: 64,
    [theme.breakpoints.down('sm')]: {            
      fontSize: 24
    }
  },
  categorySection: {
    marginBottom: 10,
    "&>label": {
      fontSize: 14,
    },
    "& .css-1qi1jpa": {
      left: 280,
      minWidth: 560
    },
    "& .css-134lx3q-input": {
      color: '#555555'
    },
    "& .css-15jr2v-container": {
      marginTop: 5
    },
    "& .css-1k8n018-menuItem": {
      backgroundColor: '#387dda',
      color: '#ffffff',
      padding: '15px 0',
      textAlign: 'center',
      margin: '0 10px 10px 0'
    },
    "& .css-1k8n018-menuItem:hover": {
      backgroundColor: '#f77d3c',
      color: '#ffffff',
    },
    "& .css-1szzzam-menuItem-menuItemActive": {
      backgroundColor: '#3e5fd0',
      color: '#ffffff',
      padding: '15px 0',
      textAlign: 'center',
      margin: '0 10px 10px 0'
    }
  },
  categorySelect: {
    marginBottom: 10,
    "&>label": {
      fontSize: 14,
    },
    "& select": {
      width: '100%',
      height: 29,
      borderRadius: 1,
      border: '1px solid #ccc',
      textIndent: 7,
      fontSize: 16,
      color: '#555555',
      fontWeight: 500,
      marginTop: 5
    },
    "& select option": {
      textIndent: 7,
    }
  },
  difficultySelect: {
    marginBottom: 10,
    "&>label": {
      fontSize: 14,
    },
    "& select": {
      width: '100%',
      height: 29,
      borderRadius: 1,
      border: '1px solid #ccc',
      textIndent: 7,
      fontSize: 16,
      color: '#555555',
      fontWeight: 500,
      marginTop: 5
    },
    "& select option": {
      textIndent: 7,
    }
  },
  questionsSelect: {
    "&>label": {
      fontSize: 14,
    },
    "& select": {
      width: '100%',
      height: 29,
      borderRadius: 1,
      border: '1px solid #ccc',
      textIndent: 7,
      fontSize: 16,
      color: '#555555',
      fontWeight: 500,
      marginTop: 5
    },
    "& select option": {
      textIndent: 7,
    }
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
  quizLogoSection: {
    textAlign: 'center',
  },
  quizLogoSectionImage: {
    width: 130
  },
  termsAndConditionSection: {
    marginTop: 30,
    "& label": {
      fontSize: 14
    },
    "& input": {
      marginLeft: 0
    },
    "& a": {
      color: '#387dda',
      fontWeight: 600
    }
  },
  termsAndConditionText: {
    fontWeight: 500,
    textDecoration: 'underline'
  },
  quizLoadingImage: {

  },
  quizCompletedContent: {
    textAlign: 'center',
    marginBottom: 40
  },
  newQuizActionButtons: {
    textAlign: 'center',
    "& button": {
      [theme.breakpoints.down('xs')]: {            
        width: '100%',
        marginBottom: 20
      }, 
      backgroundColor: '#387dda',
      border: 'none',
      padding: '15px 40px',
      marginRight: 20,
      color: '#ffffff',
      cursor: 'pointer',
      "&:hover": {
        backgroundColor: '#f78637',
        border: 'none'
      }
    }
  },
  validationMsgBox: {
    position: 'absolute',
    bottom: 5,
    color: '#ffffff',
    width: '94%',
    textAlign: 'center'
  },
  validationMsg: {
    backgroundColor: '#ab2e3a',
    padding: '5px 10px',
  },
  laodingImageSection: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))


function App() {

  let classes = useStyles();

  let [quiz, setQuiz] = useState<QuestionFormat[]>([]);
  let [currentQuestion, setCurrentQuestion] = useState<number>(0);
  let [score, setScore] = useState<number>(0);
  let [isQuizStart, setIsQuizStart] = useState<boolean>(false);
  let [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  let [isLoading, setIsLoading] = useState<boolean>(true);
  let [isQuizLoading, setIsQuizLoading] = useState<boolean>(false);

  let [quizCategory, setQuizCategory] = useState<string>("");
  let [quizDifficulty, setQuizDifficulty] = useState<string>("");
  let [quizTotalQuestion, setQuizTotalQuestion] = useState<string>("");
  let [isQuizAttempt, setIsQuizAttempt] = useState<boolean>(false);
  let [quizAttempt, setQuizAttempt] = useState<number>(1);
  let [termsAndCondition, setTermsAndCondition] = useState<boolean>(false);
  let [currentQuizAttempt, setCurrentQuizAttempt] = useState<number>(0);
  let [isValidationError, setIsValidationError] = useState<boolean>(false);
  let [validationErrorMsg, setValidationErrorMsg] = useState<string>("");

  let quizCategoryList = [
    { value: "9", label: "General knowledge" },
    { value: "17", label: "Science & Nature" },
    { value: "21", label: "Sports" },
    { value: "22", label: "Geography" },
    { value: "18", label: "Computer Science" },
    { value: "23", label: "History" },
    { value: "27", label: "Animals" },
    { value: "10", label: "Books" }
  ];

  setTimeout(() => setIsLoading(false), 1000)

  async function fetchData() {
    const questions: QuestionFormat[] = await getQuizData(quizTotalQuestion, quizCategory, quizDifficulty);
    console.log(questions)
    setTimeout(() => {
      setQuiz(questions);
      setIsQuizLoading(false)
      setIsQuizStart(true);
    }, 700);
  }

  const showValidation = (msg: string) => {
    setValidationErrorMsg(msg);
    setIsValidationError(true);
    setTimeout(() => setIsValidationError(false), 1000);
  }

  const handleQuizStart = () => {
    if (quizCategory !== "" && quizCategory !== undefined) {
      if (quizDifficulty !== "" && quizDifficulty !== undefined) {
        if (quizTotalQuestion !== "" && quizTotalQuestion !== undefined) {
          if (termsAndCondition) {
            setIsValidationError(false);
            setIsQuizLoading(true);
            setCurrentQuizAttempt(1);
            fetchData();
          }
          else {
            showValidation("Please accept terms and condition to continue.");
          }
        }
        else
          showValidation("Please select total questions for quiz.");
      }
      else {
        showValidation("Please select quiz difficulty.");
      }
    }
    else
      showValidation("Please select quiz category.");
  }

  const handleSubmitQuestion = (e: React.FormEvent<EventTarget>, selectedAnswer: string) => {
    //e.preventDefault();
    console.log(selectedAnswer);

    if (selectedAnswer === quiz[currentQuestion].answer) {
      setScore(++score);
    }


    if (currentQuestion !== quiz.length - 1) {
      setCurrentQuestion(++currentQuestion);
    }
    else {
      setIsQuizCompleted(true);
      //setIsQuizStart(false);
    }
  }

  const handleRestartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setIsQuizCompleted(false);
    setIsQuizStart(true);
    setCurrentQuizAttempt(++currentQuizAttempt);
  }

  const handleSetQuizCategory = (e: any) => {
    setQuizCategory(e.target.value);
    console.log(e.target.value);
  };

  const handleSetQuizDifficulty = (e: any) => {
    setQuizDifficulty(e.target.value);
    console.log(e.target.value);
  };

  const handleSetQuizTotalQuestion = (e: any) => {
    setQuizTotalQuestion(e.target.value);
    console.log(e.target.value);
  };

  const handleTermsAndCondition = () => {
    setTermsAndCondition(!termsAndCondition);
  }

  const handleMainGotoMainScreen = () => {
    setScore(0);
    setCurrentQuestion(0);
    setIsQuizCompleted(false);
    setIsQuizStart(false);
    setIsQuizLoading(false);
    setQuizCategory("");
    setQuizDifficulty("");
    setQuizTotalQuestion("");
    setIsQuizAttempt(false);
    setTermsAndCondition(false);
  }

  const handleAttempts = () => {
    if (quizAttempt === 1) {
      setQuizAttempt(3);
      setIsQuizAttempt(true)
    }
    else {
      setQuizAttempt(1);
      setIsQuizAttempt(false)
    }
  }

  const timeUpCancelQuiz = () => {
    setIsQuizCompleted(true);
  }

  //if (!quiz.length)  
  if (isLoading)
    return <div className={classes.appLoading}>
      <img className={classes.appLoadingImage} src={process.env.PUBLIC_URL + '/app_loading.gif'} alt={'app loading'} />      
    </div>

  return (
    <div className={classes.quizBody}>

      <QuizHeader
        isQuizStarted={isQuizStart}
        isQuizCompleted={isQuizCompleted}
        score={score}
        totalQuestions={quiz.length}
        quizDifficulty={quizDifficulty}
      />
      <Grid container>
        <Grid item xs={12} sm={12} md={3}></Grid>
        <Grid item xs={12} sm={12} md={6}>
          {
            (!isQuizStart && !isQuizCompleted && !isQuizLoading)
              ? <div className={classes.quizContentCenter}>
                <Paper elevation={3} className={classes.quizContent}>
                  <div className={classes.quizLogoSection}>
                    <img className={classes.quizLogoSectionImage} src={process.env.PUBLIC_URL + '/quiz_logo.png'} alt="quiz main logo" />
                  </div>
                  <div className={classes.categorySelect}>
                    <label>Select Category</label>                
                     <select value={quizCategory} onChange={(e: any) => handleSetQuizCategory(e)}>
                      <option value="">Please select ...</option>
                      {
                        quizCategoryList.map((category, ind) => {
                        return <option value={category.value} key={ind}>{category.label}</option>
                        })
                      }
                    </select>
                  </div>
                  <div className={classes.difficultySelect}>
                    <label>Select Difficulty</label>
                    <select value={quizDifficulty} onChange={(e: any) => handleSetQuizDifficulty(e)}>
                      <option value="">Please select ...</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <div className={classes.questionsSelect}>
                    <label>Number of Questions</label>
                    <select value={quizTotalQuestion} onChange={(e: any) => handleSetQuizTotalQuestion(e)}>
                      <option value="">Please select ...</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                    </select>
                  </div>
                  <div className={classes.termsAndConditionSection}>
                    <input type="checkbox" checked={isQuizAttempt} onChange={handleAttempts} /><label> Check this if you want to re-attempt Quiz. Only 3 attempts are allowed.</label><br />
                    <input type="checkbox" checked={termsAndCondition} onChange={handleTermsAndCondition} /><label> I agree to the <span className={classes.termsAndConditionText}>terms and conditions</span>.</label>
                  </div>

                  <button className={classes.startQuizButton} onClick={() => handleQuizStart()}>Start Quiz</button>

                  {
                    isValidationError
                      ? <div className={classes.validationMsgBox}>
                        <span className={classes.validationMsg}> {validationErrorMsg}</span>
                      </div>
                      : <></>
                  }

                </Paper>
              </div>
              : <></>
          }
          {
            isQuizStart && !isQuizCompleted && !isQuizLoading
              ? <div className={classes.quizContentCenter}>
                <div className={classes.quizTimer}>
                  <Timer
                    initialTime={(5 * 60 * 1000) - 1000}
                    direction="backward"
                    checkpoints={[
                      {
                        time: 0,
                        callback: timeUpCancelQuiz,
                      },
                      // {
                      //   time: 60000 * 60 * 48 - 5000,
                      //   callback: () => console.log('Checkpoint B'),
                      // }
                    ]}
                  >
                    <Timer.Minutes />:
                <Timer.Seconds />
                  </Timer>
                </div>
                <CardComponent
                  question={quiz[currentQuestion].question}
                  options={quiz[currentQuestion].option}
                  submitQuestionCallback={handleSubmitQuestion}
                  isLastQuestion={currentQuestion === quiz.length - 1}
                />
              </div>
              : <></>
          }
          {
            isQuizLoading
              ? <div className={classes.quizContentCenter}>
                <Paper elevation={3} className={classes.quizContentLoading}>
                  <div className={classes.laodingImageSection}>
                    <img src={process.env.PUBLIC_URL + '/quiz_loading.gif'} alt="loading quiz gif" className={classes.quizLoadingImage} />
                  </div>
                </Paper>
              </div>
              : <></>
          }
          {
            isQuizCompleted
              ? <div className={classes.quizContentCenter}>
                <Paper elevation={3} className={classes.quizContent}>
                  {
                    quizAttempt > 1
                      ? <span className={classes.attemptsLeft}>Attempt Left: <b>{quizAttempt - currentQuizAttempt}</b></span>
                      : <></>
                  }
                  <div className={classes.quizLogoSection}>
                    <img className={classes.quizLogoSectionImage} src={process.env.PUBLIC_URL + '/quiz_logo.png'} alt="main quiz logo" />
                  </div>
                  <div className={classes.quizCompletedContent}>
                    <h2>Quiz Completed!!!</h2>
                    <p>Your score is {score} out of {quiz.length}</p>
                  </div>
                  <div className={classes.newQuizActionButtons}>
                    <button onClick={handleMainGotoMainScreen}>Try New</button>
                    {
                      isQuizCompleted && currentQuizAttempt < quizAttempt
                        ? <button onClick={handleRestartQuiz}>Re-Attempt</button>
                        : <></>
                    }
                  </div>
                </Paper>
              </div>
              : <></>
          }
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
