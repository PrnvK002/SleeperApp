import { configureStore } from '@reduxjs/toolkit';
import quesitonReducer from './reducers/quizReducer'

const store = configureStore({
    reducer : {
        quesitonReducer : quesitonReducer
    }
})

export default store;