import express from "express";
import 'express-async-errors';
import {json} from 'body-parser';
import mongoose from "mongoose";

import {currentUserRouter} from "./routes/current-user";
import {signinRouter} from "./routes/signin";
import {signoutRouter} from "./routes/signout";
import {signupRouter} from "./routes/signup";
import {errorHandler} from "./middlewares/error-handler";
import {NotFoundError} from "./errors/not-found-error";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(signinRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

// dd
app.use(errorHandler)

const start = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
        console.log("Connected to MongoDB")
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log("Listening on port 3000!!!")
    });
}

start();