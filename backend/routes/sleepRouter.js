import { Router } from "express";

const router = Router();

import { getQuestion , postQuestion , postQuiz } from '../controllers/sleepController.js'

//@desc router for getting questions
//@access public
//@route get question

router.get('/question',getQuestion);

//@desc router for submitting questions
//@access public
//@route post question

router.post('/question',postQuestion);

//@desc router for submitting the quiz
//@access public
//@route post quiz

router.post('/quiz',postQuiz);

export default router;
