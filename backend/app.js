import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import connectDB from './config/connection.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';

import sleepRouter from './routes/sleepRouter.js';

//====== Connecting database ==========
connectDB();

const app = express();

//============ morgan setup ==========

app.use(morgan('dev'));//logger for request and res 

//========== body parser setup ============
app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json());

//============ Routes =============

app.use('/api/v1/',sleepRouter);

//=========== Error handling middlewares ===========

app.use(notFound);
app.use(errorHandler);



app.listen(5000,console.log('Server started at port 5000'))