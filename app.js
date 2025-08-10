import express from 'express';
import cors from 'cors';
import createError from "http-errors";
import AllStatusCodes from './utils/allStatusCodes.js';
import { errorResponseHandler } from './utils/response.js';
import dev from './config/config.js';
import RootRouter from './src/routes/index.route.js';

const app = express();

app.use(express.urlencoded({ extended: true })); // for web clients ...
app.use(express.json()); // for mobile clients as well as web clients ...
app.use(cors());


app.get('/', (_, res) => {
    res.status(200).send("<h2 align='center'>Welcome To My Job REST APIs ...</h2>");
});


app.use(dev.app.apiUrl, RootRouter);

/** ... Handle Route Not Found Error ... **/
app.use((req, res, next) => {
    next(createError(AllStatusCodes.NotFound, `This route does not exist!!!`));
});

/** ... Handle Error handling middleware ... **/
app.use((error, req, res, next) => {
    if (res.headersSent) {
        next(error); // Delegate to express default error handling middleware ...
    } else {
        errorResponseHandler(res, {
            status: error?.status,
            message: error?.message,
        })
    }
});

export default app;

