import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import Axios from '../../axios';


//============ getting questions =====================
export const getQuestions = createAsyncThunk('question/get',async(_,{rejectWithValue})=>{
    try{
        console.log('getting executed');
        const response = await Axios.get('/question');
        return response.data.questions;

    }catch(err){
        console.log(err);
        return rejectWithValue(err.response.data);
    }
});

//==================== submitting quiz ==============

export const submitQuiz = createAsyncThunk('question/submit',async (_,{rejectWithValue,getState}) => {
    console.log('lksfjlskjdf');
    const state = getState();
    const answer = state.quesitonReducer.answer;
    console.log(answer);
    try{
        const response = await Axios.post('/quiz',answer);
        return response.data;
    }catch(err){
        console.log(err);
        return rejectWithValue(err.response.data);
    }
});

const questionReducer = createSlice({
    name : 'question',
    initialState : {
        questions : [],
        answer : [],
        loading : false,
        error : ''
    },
    reducers : {
        addAnswer : (state,action) =>{
            state.answer.push(action.payload);
        }
    },
    extraReducers : {
        [getQuestions.fulfilled] : (state,action) => {
            state.questions = action.payload;
            state.loading = false;
        },
        [getQuestions.pending] : (state,action) => {
            state.loading = true;
        },
        [getQuestions.rejected] : (state,action) => {
            state.loading = false;
            state.error = 'CAnnot get questions'
        },
        [submitQuiz.fulfilled] : (state,action) => {
            state.loading= false;
        },
        [submitQuiz.pending] : (state,action) => {
            state.loading = true;
        },
        [submitQuiz.rejected] : (state,action) => {
            state.loading = false;
            state.error = 'Cannot submit';
        }
    }
})


export const { addAnswer } = questionReducer.actions;

export default questionReducer.reducer;