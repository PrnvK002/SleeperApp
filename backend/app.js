import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/connection.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import path from 'path';

import sleepRouter from './routes/sleepRouter.js';

//====== Connecting database ==========
connectDB();

const app = express();

//============= cors setup =============

app.use(cors());

//============ morgan setup ==========

app.use(morgan('dev'));//logger for request and res 

//========== body parser setup ============
app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json());

//============ Routes =============

app.use('/api/v1/', sleepRouter);


const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, '../frontend/build')))

app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
)


//=========== Error handling middlewares ===========

app.use(notFound);
app.use(errorHandler);



app.listen(5000, console.log('Server started at port 5000'))