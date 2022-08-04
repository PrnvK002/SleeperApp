import Question from "../models/question.js";
import Quiz from "../models/quiz.js";

//@desc router for getting questions
//@access public
//@route get question

export const getQuestion = async (req,res)=>{

    try{
        const questions = await Question.find({});
        res.status(200).json({questions});
    }catch(err){
        console.log(err);
        res.status(500);
        throw new Error('unable get questions');
    }

}


//@desc router for posting questions
//@access public
//@route get question

export const postQuestion = async (req,res) => {
    try{
        console.log(req.body);
        const question = await Question.create({
            questionName : req.body.question,
            answerType : req.body.type,
            options : req.body.options
        });
        if(question){
            res.status(200).json({
                question
            });
        }
        else{
            res.status(500);
            throw new Error('Cannot insert Question to the database');
        }
    }catch(err){
        console.log(err);
        res.status(500);
        throw new Error('Cannot insert Question to the database');
    }
}

//@desc router for submitting the quiz
//@access public
//@route post quiz

export const postQuiz = async (req,res) => {

    console.log(req.body);
    const temp = req.body;
    const answers = temp.map((e) => {
        return { questionId : e.question._id , answer : e.answer }
    });
    console.log("answers",answers);
    try{
        const quiz = await Quiz.create({
            answers : answers
        });
        if(quiz){
            res.status(200).json({ quiz });
        }else{
            res.status(500);
            throw new Error('Cannot add answers');
        }
    }catch(err){
        console.log(err);
        res.status(500);
        throw new Error('Cannot add answers');
    }
}