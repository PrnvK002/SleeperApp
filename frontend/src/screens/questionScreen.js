import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAnswer, getQuestions, submitQuiz } from '../state/reducers/quizReducer';
import TimeInput from "react-time-picker-input";
import { Container } from 'react-bootstrap';


const QuestionScreen = () => {

    const dispatch = useDispatch();
    const questions = useSelector((state) => state.quesitonReducer.questions);
    const [count, setCount] = useState(0);
    const [question, setQuestion] = useState({});
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        if (questions.length) {
            setQuestion(questions[count]);
        }
    }, [questions, count]);

    useEffect(() => {
        dispatch(getQuestions());
    }, [dispatch]);

    const handleSubmit = () => {
        if (questions.length > count) {
            const obj = {
                question,
                answer
            };
            setCount(count + 1);
            dispatch(addAnswer(obj));
        } else {
            dispatch(submitQuiz());
        }
    }

    return (
        <>
            <Container>
                <div className='questionSection' >
                    <div className='questionCard' >
                        <h3> {question.questionName} </h3>
                    </div>
                </div>
                {
                    questions.length - 1 === count ? 
                        <p style={{ color:'green' }} > Completed the quiz </p>
                    : 
                    ''
                }
                <div className="answerSection">
                    {
                        question.answerType === 'string' ?
                            question.options.length ?
                                question.options.map((data) => {
                                    return (
                                        <label>
                                            <input
                                                type="radio"
                                                value={data}
                                                onChange={(e) => { setAnswer(data) }}
                                            />
                                            {data}
                                        </label>
                                    )
                                }) :
                                <input type="text" onChange={ (e) => setAnswer(e.target.value) } />
                            :
                            <TimeInput
                                onChange={ (e) => { setAnswer(e) } }
                                
                            />
                    }

                </div>
                <div className='text-center mt-5' >
                    {
                        questions.length - 1 === count ?
                            <button className='mx-auto btn btn-success' onClick={handleSubmit} disabled> Submit </button>
                            :
                            <button className='mx-auto btn btn-success' onClick={handleSubmit} > Submit </button>
                    }
                </div>
            </Container>
        </>
    )
}

export default QuestionScreen;
