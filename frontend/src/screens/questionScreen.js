import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAnswer, getQuestions, submitQuiz } from '../state/reducers/quizReducer';
import { Container } from 'react-bootstrap';
import TimePicker from 'react-time-picker';
import SuccessModal from '../components/successModal';

const QuestionScreen = () => {

    const dispatch = useDispatch();
    const questions = useSelector((state) => state.quesitonReducer.questions);
    const answers = useSelector((state) => state.quesitonReducer.answer);
    const [count, setCount] = useState(0);
    const [question, setQuestion] = useState({});
    const [answer, setAnswer] = useState('10:00');
    const [show , setShow] = useState(false);

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    const successProps = { show , handleClose }

    useEffect(() => {
        if (questions.length) {
            setQuestion(questions[count]);
        }
    }, [questions, count]);

    useEffect(() => {
        dispatch(getQuestions());
    }, [dispatch]);

    const handleSubmit = () => {
        console.log(questions.length , answers.length);
        const obj = {
            question,
            answer
        };
        setCount(count + 1);
        setAnswer('10:00');
        dispatch(addAnswer(obj));
        if (questions.length-1 === answers.length) {
            handleShow();
            dispatch(submitQuiz());
        }
    }

    return (
        <>
            <Container>
                <SuccessModal { ...successProps } />
                <div className='questionSection' >
                    <div className='questionCard' >
                        <h3> {question ? question.questionName : '' } </h3>
                    </div>
                </div>
                <div className="answerSection">
                    {
                        question ?
                        question.answerType === 'string' ?
                            question.options.length ?
                                question.options.map((data) => {
                                    return (
                                        <label>
                                            <input
                                                type="radio"
                                                value={data}
                                                key={data}
                                                onChange={(e) => { setAnswer(data) }}
                                            />
                                            {data}
                                        </label>
                                    )
                                }) :
                                <input type="text" onChange={ (e) => setAnswer(e.target.value) } />
                            :
                            <TimePicker
                                onChange={ (e) => { setAnswer(e) } }
                                value={answer}
                            />
                            : ''
                    }

                </div>
                <div className='text-center mt-5' >
                    {
                        questions.length === count ?
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
