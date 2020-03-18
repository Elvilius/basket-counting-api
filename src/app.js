import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import countingController from './counting/controller';
import { errorHandler } from './middleware';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(countingController);

app.use(errorHandler);
app.listen(process.env.PORT);
