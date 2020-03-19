import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import countingController from './counting/controller';
import { errorHandler } from './middleware';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(countingController);

app.use(errorHandler);
app.listen(process.env.PORT);
