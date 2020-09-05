import {Quiz, QuestionFormat} from '../types/Types'


const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5)

export const getQuizData = async (totalQuestions:string, category:string, difficulty:string): Promise<QuestionFormat[]> => {
    console.log("from api", `https://opentdb.com/api.php?amount=${totalQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`);
    const res = await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`)
    let { results } = await res.json();

    const quiz:QuestionFormat[] = results.map((obj:Quiz)=>{
        return{
            question: obj.question,
            answer: obj.correct_answer,
            option: shuffleArray(obj.incorrect_answers.concat(obj.correct_answer))
        }
    })

    return quiz;
}

