import React from 'react';

export type Quiz = {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: string[]
    question: string
    type: string
}

export type QuestionFormat = {
    question: string
    answer: string
    option: string[]    
}


export type QuestionCardProps = {
    question: string
    options: string[]
    submitQuestionCallback: (e:React.FormEvent<EventTarget>, answer:string)=>void,
    isLastQuestion: boolean
}

export type QuizHeaderProps = {
    isQuizStarted: boolean
    isQuizCompleted: boolean
    score: number
    totalQuestions: number
    quizDifficulty: string
}