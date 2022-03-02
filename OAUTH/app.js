import express, { json, urlencoded } from 'express';
import { join, dirname } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { swig } from 'consolidate';
import { fileURLToPath } from 'url';
// view engine setup

import indexRouter from './routes/index.js';
const __filename = fileURLToPath(import.meta.url);


const __dirname = dirname(__filename);
const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));
app.engine('html', swig)
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'html');
app.use('/', indexRouter);


export default app;
